import { Request, Response, Router } from "express";
import prisma from "../../libs/prisma";

export const router: Router = Router();

router.get("/datauser", async (req: Request, res: Response) => {
  try {
    const data: object[] = await prisma.user.findMany();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/dataagenda", async (req: Request, res: Response) => {
  try {
    const data: object[] = await prisma.agenda.findMany();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});
