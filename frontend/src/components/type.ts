export type Attendance = {
  id?: string;
  userId?: string | null;
  timestamp?: Date | null;
};

export type DataUser = {
  id: string;
  img: string | null;
  kehadiran: number;
  name: string;
  password: string;
  role: "Administrator" | "Moderator" | "Member" | string;
  status: "Online" | "Offline" | string | null;
  statusHadir?: Attendance[];
  hadir?: boolean;
  pertemuanDihadiri?: [{ id: string }];
};

export type DataAgenda = {
  name: string;
  date: Date;
};

export type DataPertemuan = {
  name: string;
  startTime: Date;
  endTime: Date;
  location: string;
};
