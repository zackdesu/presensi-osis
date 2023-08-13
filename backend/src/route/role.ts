import { Request, Response, Router } from "express";
import prisma from "../../libs/prisma";
import { isUserAuthenticated } from "../middleware/authenticated";

export const router: Router = Router();

enum role {
  adm = "Admin",
  mod = "Moderator",
  mem = "Member",
}

router.put(
  "/role/:id/mod",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    if (!req.session.user) return;
    if (req.session.user.role !== role.adm)
      return res.status(403).json({ message: "Kamu bukan Admin!" });

    const id: string = req.params.id;

    const addRole = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: role.mod,
      },
    });

    return res
      .status(200)
      .json({ message: "Berhasil menambahkan role Moderator" });
  }
);

router.put(
  "/role/:id/member",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    if (!req.session.user) return;
    if (req.session.user.role !== role.adm)
      return res.status(403).json({ message: "Kamu bukan Admin!" });

    const id: string = req.params.id;

    const addRole = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: role.mem,
      },
    });

    return res
      .status(200)
      .json({ message: "Berhasil menambahkan role Member" });
  }
);
