import "dotenv/config";

import express, { Express, NextFunction, Request, Response } from "express";
import {
  getRouter,
  postRouter,
  putRouter,
  deleteRouter,
  dataRouter,
  meetingRouter,
} from "./route";
import session from "express-session";
import { SameSite } from "./type/samesite";
import { sessConfig } from "./config/sessConfig";

export const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sessConfig.cookie.secure = true;
  sessConfig.cookie.sameSite = "none" as SameSite;
}
app.use(session(sessConfig));

// CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins: string[] = [
    "http://localhost:5173",
    "https://presensi-osis.vercel.app/",
  ];
  const origin = req.headers.origin as string;

  if (origin) {
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return next();
});

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
