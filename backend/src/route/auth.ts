import { NextFunction, Request, Response, Router } from "express";
import prisma from "../../libs/prisma";
import bcrypt from "bcryptjs";

export const router: Router = Router();

declare module "express-session" {
  interface SessionData {
    user: {
      id: string;
      img: string | null;
      kehadiran: number;
      name: string;
      password: string;
      role: "Administrator" | "Moderator" | "Member" | string;
      status: "Online" | "Offline" | string | null;
      statusHadir: "Hadir" | "Belum Melakukan Presensi" | string | null;
    };
  }
}

function isUserAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user)
    return res
      .status(403)
      .json({ message: "Sesi kadaluwarsa, silahkan login kembali" });
  return next();
}
function isUserNotAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session.user)
    return res
      .status(403)
      .json({ message: "Kamu tidak bisa mengakses halaman ini." });
  return next();
}

type UserData = { name: string; password: string };

router.post(
  "/register",
  isUserNotAuthenticated,
  async (req: Request, res: Response) => {
    const { name, password }: UserData = req.body;

    if (!name || !password)
      return res.status(403).json({ message: "Masukkan data yang lengkap!" });

    const isDuplicate = await prisma.user.findFirst({
      where: {
        name,
      },
    });

    if (isDuplicate)
      return res.status(401).json({ message: "Nama tidak boleh sama!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const accCreate = await prisma.user.create({
      data: {
        name,
        img: "/unknown.jpg",
        password: hashedPassword,
        role: "Member",
        kehadiran: 0,
        status: "Online",
        statusHadir: "Belum Melakukan Presensi",
      },
    });

    res.send(accCreate);
  }
);

router.post(
  "/login",
  isUserNotAuthenticated,
  async (req: Request, res: Response) => {
    const { name, password }: UserData = req.body;

    if (!name || !password)
      return res.status(403).json({ message: "Masukkan data yang lengkap!" });

    const user = await prisma.user.findFirst({
      where: {
        name,
      },
    });

    if (!user)
      return res.status(404).json({ message: "Akun tidak ditemukan!" });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res.status(404).json({ message: "Password salah!" });

    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ message: err });

      req.session.user = user;

      req.session.save((err) => {
        if (err) return res.status(500).json({ message: err });

        return res.status(200).json({
          message: `Berhasil login! Selamat datang ${user.name}`,
        });
      });
    });
  }
);

router.get("/login", isUserAuthenticated, (req: Request, res: Response) => {
  res.send(req.session.user);
});

router.post(
  "/logout",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: err });

      return res
        .status(200)
        .json({ message: "Berhasil logout, silahkan login kembali." });
    });
  }
);

router.put(
  "/edit",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    const user = req.session.user;

    const {
      name,
      oldPassword,
      newPassword,
    }: { name: string; oldPassword?: string; newPassword?: string } = req.body;

    if (!user)
      return res.status(403).json({ message: "Kamu belum login ke akunmu..." });

    const compareOldPass = await bcrypt.compare(
      oldPassword as string,
      user.password
    );

    const compareWithPassSession = await bcrypt.compare(
      newPassword as string,
      user.password
    );

    let updateName: UserData;
    let updatePassword: UserData;

    if (name !== user.name) {
      updateName = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name,
        },
      });
    }
    if (newPassword && !compareWithPassSession) {
      if (!compareOldPass)
        return res
          .status(403)
          .json({ message: "Password tidak sama dengan password yang lama." });

      const hashedPassword = await bcrypt.hash(newPassword as string, 10);

      updatePassword = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      });
    }

    req.session.regenerate((err) => {
      if (err) res.status(500).json({ message: err });

      if (updateName) req.session.user = { ...user, name: updateName.name };
      if (updatePassword)
        req.session.user = { ...user, name: updatePassword.password };

      req.session.save((err) => {
        if (err) res.status(500).json({ message: err });

        return res
          .status(200)
          .json({ message: "Kamu berhasil mengupdate data dirimu!" });
      });
    });
  }
);

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
