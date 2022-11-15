import request from "supertest";
import app from "../src/app";
import { CONTEXT_MESSAGE } from "../src/constants/contextMessageMapping";

describe("POST /v1/message", () => {
  jest.setTimeout(30000);
  it("Returns normal response", async () => {
    const res = await request(app).post("/v1/message/").send({
      conversation_id: "abc001",
      message: "zxcv hello goodbye",
    });
    expect(res.status).toBe(200);
    expect(res.body.response_id).toBe("abc001");
  });

  it("Detects GREETING context", async () => {
    const res = await request(app).post("/v1/message/").send({
      conversation_id: "aaa001",
      message: "zxcv hello xxx",
    });
    expect(res.status).toBe(200);
    expect(res.body.response_id).toBe("aaa001");
    expect(res.body.response).toBe(CONTEXT_MESSAGE.GREETING);
  });

  it("Detects END context", async () => {
    const res = await request(app).post("/v1/message/").send({
      conversation_id: "bbb001",
      message: "zxcv xxxx goodbye",
    });
    expect(res.status).toBe(200);
    expect(res.body.response_id).toBe("bbb001");
    expect(res.body.response).toBe(CONTEXT_MESSAGE.END);
  });

  it("Detects NO context", async () => {
    const res = await request(app).post("/v1/message/").send({
      conversation_id: "ccc001",
      message: "asdf qwer zxcv",
    });
    expect(res.status).toBe(200);
    expect(res.body.response_id).toBe("ccc001");
    expect(res.body.response).toBe(CONTEXT_MESSAGE.NO_CONTEXT);
  });

  it("Detects First Context", async () => {
    const res = await request(app).post("/v1/message/").send({
      conversation_id: "aaa002",
      message: "asdf bye hi",
    });
    expect(res.status).toBe(200);
    expect(res.body.response_id).toBe("aaa002");
    expect(res.body.response).toBe(CONTEXT_MESSAGE.END);
  });

  it("Detects upper case Context", async () => {
    const res = await request(app).post("/v1/message/").send({
      conversation_id: "aaa002",
      message: "asdf HI BYE",
    });
    expect(res.status).toBe(200);
    expect(res.body.response_id).toBe("aaa002");
    expect(res.body.response).toBe(CONTEXT_MESSAGE.GREETING);
  });

  it("Handles error properly", async () => {
    const res = await request(app).post("/v1/message/").send();
    expect(res.status).toBe(400);
  });
  //
  it("Caches previous data", async () => {
    const startTime = performance.now();
    await request(app).post("/v1/message/").send({
      conversation_id: "1`asdf",
      message: "zxcv hello goodbye",
    });
    await request(app).post("/v1/message/").send({
      conversation_id: "1`asdf",
      message: "zxcv hello goodbye",
    });
    const res = await request(app).post("/v1/message/").send({
      conversation_id: "1`asdf",
      message: "zxcv hello goodbye",
    });
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(4000);
  });
});
