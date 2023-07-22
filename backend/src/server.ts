require("dotenv").config();

import express, { Express, NextFunction, Request, Response } from "express";
import { router as dataRouter } from "./route/data";
import { router as authRouter } from "./route/auth";
import session from "express-session";
import MongoStore from "connect-mongo";

export const app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

type SameSite = boolean | "lax" | "none" | "strict";

const sessConfig = {
  secret: process.env.SECRET_KEY!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false,
    sameSite: false as SameSite,
  },
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL,
    ttl: 60 * 60 * 24 * 3,
    stringify: false,
  }),
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

app.use(authRouter);
app.use(dataRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is online...");
});

app.use("/", (req: Request, res: Response) => {
  res.status(404).send("404");
});

app.listen(port, () => console.log("localhost:" + port));
