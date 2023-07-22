import { NextFunction, Request, Response } from "express";

export function isUserAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.user)
    return res
      .status(403)
      .json({ message: "Sesi kadaluwarsa, silahkan login kembali" });
  return next();
}

export function isUserNotAuthenticated(
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
