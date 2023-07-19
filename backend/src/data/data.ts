import { Request, Response, Router } from "express";
import prisma from "../../libs/prisma";

const router: Router = Router();

router.get("/datauser", async (req: Request, res: Response) => {
  const data: object[] = await prisma.user.findMany();
  res.status(200).json(data);
});

router.get("/datapertemuan", async (req: Request, res: Response) => {
  const data: object[] = await prisma.pertemuan.findMany();

  res.status(200).json(data);
});

router.get("/dataagenda", async (req: Request, res: Response) => {
  const data: object[] = await prisma.agenda.findMany();

  res.status(200).json(data);
});

export default router;
