import { Attendance } from "./attendance";

declare module "express-session" {
  interface Session {
    user: {
      id: string;
      img: string | null;
      imgid?: string | null;
      kehadiran: number;
      name: string;
      password: string;
      role: "Administrator" | "Moderator" | "Member" | string;
      status: "Online" | "Offline" | string | null;
      statusHadir?: Attendance[];
      hadir?: boolean;
      pertemuanDihadiri?: [{ id: string }];
    };
  }
}
