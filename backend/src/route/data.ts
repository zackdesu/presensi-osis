import { Request, Response, Router } from "express";
import prisma from "../../libs/prisma";

export const router: Router = Router();

router.get("/datauser", async (req: Request, res: Response) => {
  const data: object[] = await prisma.user.findMany();
  res.status(200).json(data);
});

router.get("/dataagenda", async (req: Request, res: Response) => {
  const data: object[] = await prisma.agenda.findMany();

  res.status(200).json(data);
});
