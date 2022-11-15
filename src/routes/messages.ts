import express, { Application, Express, Request, Response } from "express";
import { getMessageReply } from "../controllers/messages";
import { getContextByValue } from "../services/database/context";
import { validateMessage } from "../request/message";
import Cache from "../services/cache";

const messageRouter = express.Router();
const cache = Cache();

//changes: change method from get to post and added validation.
messageRouter.post("/", [validateMessage], async (req: Request, res: Response) => {

  const input = req.body;
  const reply = await getMessageReply(
    {
      database: {
        //changes: use getContextByValue as the type
        getContextByValue: getContextByValue,
      },
      cache,
    },
    input
  );
  res.status(200).json(reply);
});

export const useMessageRouter = (app: Application) => {
  app.use("/v1/message", messageRouter);
};
