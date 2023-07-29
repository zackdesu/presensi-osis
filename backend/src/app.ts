require("dotenv").config();

import express, { Express, NextFunction, Request, Response } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

// Auth
import { router as getRouter } from "./route/auth/get";
import { router as postRouter } from "./route/auth/post";
import { router as putRouter } from "./route/auth/put";
import { router as deleteRouter } from "./route/auth/delete";
import { router as dataRouter } from "./route/data";

// Meeting
import { router as meetingRouter } from "./route/meeting/meeting";

export const app: Express = express();

import { Attendance } from "./type/attendance";

declare module "express-session" {
  interface SessionData {
    user: {
      id: string;
      img: string | null;
      kehadiran: number;
      name: string;
      password: string;
      role: "Administrator" | "Moderator" | "Member" | string;
      status: "Online" | "Offline" | string | null;
      statusHadir?: Attendance[];
      hadir?: boolean;
      pertemuanDihadiri?: [{ id: string }];
    };
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

type SameSite = boolean | "lax" | "none" | "strict";

const sessConfig = {
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL,
    ttl: 60 * 60 * 24 * 3,
    stringify: false,
  }),
  secret: process.env.SECRET_KEY!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false,
    sameSite: false as SameSite,
  },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sessConfig.cookie.secure = true;
  sessConfig.cookie.sameSite = "none" as SameSite;
}

app.use(session(sessConfig));

app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = ["http://localhost:5173"];
  const origin = req.headers.origin;

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
