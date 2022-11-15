import express, { Application, Express, Request, Response } from "express";
import { useMessageRouter } from "./routes/messages";

const app: Application = express();

app.use(express.json());
// changes: import message routes
useMessageRouter(app);

export default app;
