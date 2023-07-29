import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import { app } from "../app";
import { sessConfig } from "./sessConfig";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessConfig));

// CORS
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
