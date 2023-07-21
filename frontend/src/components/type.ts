export type DataUser = {
  id: string;
  img: string | null | undefined;
  kehadiran: number;
  name: string;
  password: string;
  role: "Administrator" | "Moderator" | "Member" | string;
  status: "Online" | "Offline" | string | null;
  statusHadir: "Hadir" | "Belum Melakukan Presensi" | string | null;
};

export type DataAgendaPertemuan = {
  name: string;
  date: Date;
};
