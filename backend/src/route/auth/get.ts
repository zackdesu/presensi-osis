import prisma from "../../../libs/prisma";
import { isUserAuthenticated } from "../../middleware/authenticated";
import { Request, Response, Router } from "express";

export const router: Router = Router();

router.get(
  "/login",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
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

    res.send(data);
  }
);

router.get(
  "/checkTime",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    if (!req.session.user) return;

    const attendance = await prisma.attendance.findFirst({
      where: {
        userId: req.session.user.id,
      },
    });

    const time = attendance?.timestamp.getTime();
    if (!time) return res.send("Kamu bisa melakukan presensi sekarang");

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
      return res.send("Kamu bisa melakukan presensi sekarang 2");
    }

    req.session.user.hadir = true;

    return res.send(req.session.user);
  }
);

router.get("/abc", (req: Request, res: Response) => {
  res.send("def");
});
