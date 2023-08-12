import prisma from "../../../libs/prisma";
import { isUserAuthenticated } from "../../middleware/authenticated";
import { Request, Response, Router } from "express";

export const router: Router = Router();

router.get(
  "/login",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    try {
      if (!req.session.user) return;
      const user = await prisma.user.findFirst({
        where: {
          name: req.session.user.name,
        },
      });

      const data = {
        session: req.session.user,
        database: user,
      };

      req.session.reload((err) => {
        if (err) throw err;

        req.session.user = user;

        res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);

router.get(
  "/checkTime",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    try {
      if (!req.session.user) return;

      const attendance = await prisma.attendance.findFirst({
        where: {
          userId: req.session.user.id,
        },
      });

      if (!attendance) {
        req.session.user.hadir = false;
        return res
          .status(200)
          .json({ message: "Kamu bisa melakukan presensi" });
      }

      const user = await prisma.user.findFirst({
        where: {
          id: req.session.user.id,
        },
      });
      if (!user) throw new Error("User dengan id session ini tidak ditemukan!");

      req.session.user.hadir = true;
      req.session.user.kehadiran = user.kehadiran;

      console.log(req.session.user);

      return res.status(200).json({ message: "Berhasil update" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);
