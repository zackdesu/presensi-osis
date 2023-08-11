import prisma from "../../../libs/prisma";
import {
  isUserNotAuthenticated,
  isUserAuthenticated,
} from "../../middleware/authenticated";
import { Router } from "express";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserData } from "../../type/userdata";
import { upload } from "../../config/multerConfig";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";

export const router: Router = Router();

router.post(
  "/register",
  isUserNotAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const { name, password, kelas, jurusan, lokal }: UserData = req.body;

      if (!name || !password || !kelas || !jurusan)
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
          kelas: `${kelas} ${jurusan} ${lokal}`,
        },
      });

      res.send(accCreate);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);

router.post(
  "/login",
  isUserNotAuthenticated,
  async (req: Request, res: Response) => {
    try {
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
        return res.status(403).json({ message: "Password salah!" });

      const attendanceFind = await prisma.attendance.findFirst({
        where: {
          userId: user.id,
        },
      });

      req.session.regenerate((err) => {
        if (err) throw err;

        req.session.user = user;

        if (attendanceFind) req.session.user.hadir = true;

        req.session.save((err) => {
          if (err) throw err;

          return res.status(200).json({
            message: `Berhasil login! Selamat datang ${user.name}`,
          });
        });
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);

router.post(
  "/logout",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    try {
      req.session.destroy((err) => {
        if (err) throw err;

        return res
          .status(200)
          .json({ message: "Berhasil logout, silahkan login kembali." });
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);

router.post(
  "/presensi",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const { password } = req.body;

      if (!req.session.user) return;

      const findMeeting = await prisma.pertemuan.findMany({
        orderBy: {
          startTime: "asc",
        },
        where: {
          endTime: {
            gte: new Date(),
          },
        },
      });

      if (findMeeting.length === 0)
        return res.status(404).json({
          message: "Pertemuan belum dibuat!",
        });

      const nextMeetingStarts = findMeeting[0].startTime.getTime();

      if (Date.now() <= nextMeetingStarts)
        return res.status(403).json({
          message: `Pertemuan belum dimulai!`,
        });

      if (req.session.user.hadir)
        return res.status(403).json({
          message: "Melebihi batas presensi!",
        });

      if (!password)
        return res.status(403).json({
          message: "Masukkan password meeting!",
        });

      if (password !== findMeeting[0].password)
        return res.status(403).json({
          message: "Password meeting salah!",
        });

      const attendanceCreate = await prisma.attendance.create({
        data: {
          userId: req.session.user.id,
          timestamp: new Date(),
        },
      });

      if (!attendanceCreate) throw new Error("Failed to create attendance!");

      req.session.user.kehadiran += 1;

      const updateKehadiran = await prisma.user.update({
        where: {
          id: attendanceCreate.userId as string,
        },
        data: {
          kehadiran: req.session.user.kehadiran,
          pertemuanDihadiri: {
            connect: {
              id: findMeeting[0].id as string,
            },
          },
        },
      });

      req.session.user.hadir = true;

      return res.status(200).json({ message: "Berhasil melakukan presensi!" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);

router.post(
  "/useravatar",
  isUserAuthenticated,
  upload,
  async (req: Request, res: Response) => {
    try {
      if (!req.session.user) return;
      if (!req.file)
        return res.status(404).json({ message: "Gambar tidak ditemukan" });
      const file = req.file;

      if (!file.mimetype.includes("image"))
        res.status(422).json({ message: "File bukan sebuah gambar" });

      const pict = await sharp(file.buffer).resize(300, 300).toBuffer();

      const user = await prisma.user.findFirst({
        where: {
          id: req.session.user.id,
        },
      });

      if (!user || !user.imgid)
        throw new Error("User tidak ditemukan saat mengganti avatar");

      cloudinary.uploader.destroy(user.imgid);

      cloudinary.uploader
        .upload_stream(
          { format: "jpg", folder: "dev" },
          async (err, result) => {
            if (err) return res.status(500).json({ err });

            const updateUser = await prisma.user.update({
              where: {
                id: user?.id,
              },
              data: {
                img: result?.secure_url,
                imgid: result?.public_id,
              },
            });

            req.session.regenerate((err) => {
              if (err) throw err;

              if (!updateUser.img || !updateUser.imgid) return;

              req.session.user = updateUser;

              req.session.save((err) => {
                if (err) throw err;
                return res
                  .status(200)
                  .json({ message: "Berhasil mengganti avatar!" });
              });
            });
          }
        )
        .end(pict);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);
