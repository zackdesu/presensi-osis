import { Router, Request, Response } from "express";
import prisma from "../../../libs/prisma";

export const router: Router = Router();

router.get("/datapertemuan", async (req: Request, res: Response) => {
  try {
    const data: object[] = await prisma.pertemuan.findMany();
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/datapertemuan/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const data = await prisma.pertemuan.findFirst({
      where: {
        id,
      },
    });

    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

    const parseData = {
      name: data?.name,
      date: data?.startTime.toUTCString().slice(0, 16),
      startTime: data?.startTime.toLocaleTimeString(),
      endTime: data?.endTime.toLocaleTimeString(),
      location: data?.location ? data.location : "Sekolah",
    };

    res.status(200).json(parseData);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.post("/datapertemuan", async (req: Request, res: Response) => {
  try {
    const { name, startTime, endTime, location } = req.body;

    if (!name || !startTime || !endTime)
      return res.status(403).json({ message: "Masukkan data yang lengkap" });

    const createPertemuan = await prisma.pertemuan.create({
      data: {
        name,
        startTime,
        endTime,
        location,
      },
    });

    res.status(200).json(createPertemuan);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.delete("/datapertemuan/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const deletePertemuan = await prisma.pertemuan.delete({
      where: {
        id,
      },
    });
    if (!deletePertemuan)
      throw res.status(404).json({ message: "Data tidak ditemukan" });

    res.status(200).json(deletePertemuan);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});
