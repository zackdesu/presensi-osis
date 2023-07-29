require("dotenv").config();

import express, { Express, Request, Response } from "express";
import {
  getRouter,
  postRouter,
  putRouter,
  deleteRouter,
  dataRouter,
  meetingRouter,
} from "./route";

export const app: Express = express();

app.use(dataRouter);
app.use(getRouter);
app.use(postRouter);
app.use(putRouter);
app.use(deleteRouter);
app.use(meetingRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is online...");
});

app.use("/", (req: Request, res: Response) => {
  res.status(404).send("404");
});
