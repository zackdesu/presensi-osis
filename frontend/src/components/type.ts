export type DataUser = {
  id: string;
  img: string | null | undefined;
  kehadiran: number;
  name: string;
  password: string;
  role: "Administrator" | "Moderator" | "Member" | string;
  status: "Online" | "Offline" | string | null;
  hadir: boolean;
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
