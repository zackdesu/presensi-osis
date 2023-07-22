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
        include: {
          statusHadir: {
            select: {
              id: true,
              user: true,
            },
          },
        },
      });
      const data = {
        session: req.session.user,
        database: user,
      };

      res.status(200).json(data);
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

      const time = attendance?.timestamp.getTime();
      if (!time)
        return res
          .status(200)
          .json({ message: "Kamu bisa melakukan presensi sekarang" });

      const attendanceTime = Date.now() - time;

      console.log(attendanceTime / 1000 / 60);

      if (attendanceTime >= 1000 * 20) {
        req.session.user.hadir = false;

        const existingAttendance = await prisma.attendance.findFirst({
          where: {
            userId: req.session.user.id,
          },
        });

        if (!existingAttendance) return;

        const deleteAttendance = await prisma.attendance.delete({
          where: {
            id: existingAttendance.id,
          },
        });

        console.log(deleteAttendance);
        return res
          .status(200)
          .json({ message: "Kamu bisa melakukan presensi sekarang" });
      }

      req.session.user.hadir = true;

      return res.status(200).json({ message: "Berhasil melakukan absensi" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);
