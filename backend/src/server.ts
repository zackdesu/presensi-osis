import express, {
  Express,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";

class App {
  protected readonly app: Express;
  protected port: Number;

  constructor(port: number = 3000) {
    this.app = express();
    this.port = port;
  }
}

export class Server extends App {
  private startCall?: boolean = true;
  public start() {
    if (!this.startCall)
      throw new Error(`start() function has been called more than once.`);
    this.app.listen(this.port, () =>
      console.log(`Server is listening to http://localhost:${this.port}`)
    );
    delete this.startCall;
  }

  public getApp() {
    return this.app;
  }
}

export class Method extends App {
  private corsCall: boolean = true;

  public use(content: RequestHandler) {
    this.app.use(content);
  }

  public cors(...allowedOrigins: string[]) {
    if (!this.corsCall)
      throw new Error("cors() function is called more than once.");

    this.app.use((req: Request, res: Response, next: NextFunction) => {
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
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      return next();
    });
  }
  public get(content: string | JSON) {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json(content);
    });
  }
}
