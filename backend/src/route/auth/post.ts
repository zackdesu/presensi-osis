import prisma from "../../../libs/prisma";
import {
  isUserNotAuthenticated,
  isUserAuthenticated,
} from "../../middleware/authenticated";
import { Router } from "express";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserData } from "../../type/userdata";

export const router: Router = Router();

router.post(
  "/register",
  isUserNotAuthenticated,
  async (req: Request, res: Response) => {
    try {
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

      console.log(findMeeting);

      if (findMeeting.length === 0)
        return res.status(404).json({
          message: "Pertemuan berikutnya belum ditentukan, coba lagi nanti.",
        });

      const nextMeetingStarts = findMeeting[0].startTime.getTime();

      const diff = nextMeetingStarts - Date.now();

      if (Date.now() <= nextMeetingStarts)
        return res.status(403).json({
          message: `Pertemuan belum dimulai, tunggu ${Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )} jam ${Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))} menit`,
        });

      if (req.session.user.hadir)
        return res.status(403).json({
          message:
            "Kamu sudah melakukan dipertemuan ini, coba lagi setelah meeting dibuat.",
        });

      const attendanceCreate = await prisma.attendance.create({
        data: {
          userId: req.session.user.id,
          timestamp: new Date(),
        },
      });

      if (!attendanceCreate) throw new Error("Failed to create attendance!");

      req.session.user.hadir = true;
      req.session.user.kehadiran += 1;

      await prisma.user.update({
        where: {
          id: attendanceCreate.userId as string,
        },
        data: {
          kehadiran: req.session.user.kehadiran,
        },
      });

      return res.status(200).json({ message: "Berhasil melakukan presensi!" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);
