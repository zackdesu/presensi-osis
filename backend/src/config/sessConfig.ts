import MongoStore from "connect-mongo";
import { app } from "../app";
import { SameSite } from "../type/samesite";

export const sessConfig = {
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
