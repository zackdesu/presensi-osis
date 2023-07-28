import { Router, Request, Response } from "express";
import prisma from "../../../libs/prisma";
import { isUserAuthenticated } from "../../middleware/authenticated";

export const router: Router = Router();

router.get(
  "/datapertemuan",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const datas: object[] = await prisma.pertemuan.findMany({
        orderBy: {
          startTime: "asc",
        },
        where: {
          endTime: {
            gte: new Date(),
          },
        },
      });

      if (datas.length === 0)
        return res.status(404).json({
          message: "Pertemuan berikutnya belum dibuat. Coba lagi nanti.",
        });

      const data = datas[0];

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);

router.get(
  "/semuadatapertemuan",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const datas: object[] = await prisma.pertemuan.findMany({
        orderBy: {
          startTime: "asc",
        },
      });

      if (datas.length === 0)
        return res.status(404).json({
          message: "Pertemuan belum dibuat. Coba lagi nanti.",
        });

      return res.status(200).json(datas);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);

router.get(
  "/datapertemuan/:id",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;

      const data = await prisma.pertemuan.findFirst({
        where: {
          id,
        },
      });

      if (!data)
        return res.status(404).json({ message: "Data tidak ditemukan" });

      const parseData = {
        name: data.name,
        date: data.startTime.toUTCString().slice(0, 16),
        startTime: data.startTime.toLocaleTimeString(),
        endTime: data.endTime.toLocaleTimeString(),
        location: data.location ? data.location : "Sekolah",
      };

      return res.status(200).json(parseData);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);

router.post(
  "/datapertemuan",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    try {
      if (!req.session.user) return;

      const { name, startTime, endTime, location, password } = req.body;

      if (!name || !startTime || !endTime || !password)
        return res.status(403).json({ message: "Masukkan data yang lengkap" });

      const createPertemuan = await prisma.pertemuan.create({
        data: {
          name,
          startTime,
          endTime,
          location,
          password,
        },
      });

      await prisma.attendance.deleteMany({});

      return res.status(200).json(createPertemuan);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);

router.delete(
  "/datapertemuan/:id",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const deletePertemuan = await prisma.pertemuan.delete({
        where: {
          id,
        },
      });

      if (!deletePertemuan)
        throw res.status(404).json({ message: "Data tidak ditemukan" });

      const attendCheck = await prisma.attendance.findMany();

      for (const attendUser of attendCheck) {
        console.log(attendUser);

        const id = attendUser.userId;

        if (!id) throw new Error("ID not found in attendUser");

        const findUsers = await prisma.user.findMany({
          where: {
            id,
            kehadiran: {
              gte: 1,
            },
          },
        });

        for (const moreThanOne of findUsers) {
          const dihadiri = moreThanOne.pertemuanDihadiriId.filter(
            (item) => item !== deletePertemuan.id
          );

          const decrement = await prisma.user.update({
            where: {
              id: moreThanOne.id,
            },
            data: {
              kehadiran: {
                decrement: 1,
              },
              pertemuanDihadiriId: dihadiri,
            },
          });

          console.log(decrement);
        }
      }

      return res.status(200).json(deletePertemuan);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);
