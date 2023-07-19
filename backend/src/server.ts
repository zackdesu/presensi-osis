import express, { Express, NextFunction, Request, Response } from "express";
import router from "./data/data";

const app: Express = express();
const port: number = 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = ["http://localhost:5173"];
  const origin = req.headers.origin;

  if (origin) {
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
  }
  // res.setHeader(
  //   "Access-Control-Allow-Origin",
  //   "http://localhost:5173, https://voting-web-mu.vercel.app"
  // );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return next();
});

app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is online...");
});

app.use("/", (req: Request, res: Response) => {
  res.status(404).send("404");
});

app.listen(port, () => console.log("localhost:" + port));
