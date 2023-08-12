import prisma from "../../../libs/prisma";
import { isUserAuthenticated } from "../../middleware/authenticated";
import { UserData } from "../../type/userdata";
import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";

export const router: Router = Router();

router.put(
  "/editpassword",
  isUserAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const user = req.session.user;

      const {
        oldPassword,
        newPassword,
      }: { oldPassword: string; newPassword: string } = req.body;

      if (!user)
        return res
          .status(403)
          .json({ message: "Kamu belum login ke akunmu..." });

      const compareOldPass = await bcrypt.compare(
        oldPassword as string,
        user.password
      );

      const compareWithPassSession = await bcrypt.compare(
        newPassword as string,
        user.password
      );

      if (newPassword && !compareWithPassSession) {
        if (!compareOldPass)
          return res.status(403).json({
            message: "Password tidak sama dengan password yang lama.",
          });

        const hashedPassword = await bcrypt.hash(newPassword as string, 10);

        const updatePassword = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            password: hashedPassword,
          },
        });

        req.session.regenerate((err) => {
          if (err) throw err;

          req.session.user = updatePassword;

          req.session.save((err) => {
            if (err) throw err;

            return res
              .status(200)
              .json({ message: "Kamu berhasil mengupdate passwordmu!" });
          });
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);
