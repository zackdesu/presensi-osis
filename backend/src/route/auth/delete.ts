import prisma from "../../../libs/prisma";
import { isUserAuthenticated } from "../../middleware/authenticated";
import { Request, Response, Router } from "express";

export const router: Router = Router();

router.delete(
  "/delete",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    const user = req.session.user;

    if (!user)
      return res.status(403).json({ message: "Kamu belum login ke akunmu..." });

    const deleteUser = await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    if (!deleteUser)
      return res.status(500).json({ message: "Kesalahan Server" });

    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: err });

      return res.status(200).json({
        message:
          "Berhasil menghapus akun, terimakasih sudah menggunakan kami!.",
      });
    });
  }
);

router.delete(
  "/presensi",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    if (!req.session.user) return;

    if (!req.session.user.statusHadir) return;

    console.log(req.session.user.statusHadir[0].id);

    // const deleteAttendance = await prisma.attendance.delete({
    //   where: {
    //     id: req.session.user.statusHadir![0].id!,
    //   },
    // });

    // req.session.user.statusHadir = [];

    // console.log(deleteAttendance);
  }
);
