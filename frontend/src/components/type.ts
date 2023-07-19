export type DataUser = {
  name: string;
  role: "Administrator" | "Moderator" | "Member";
  img: string;
  status: "Online" | "Offline";
  kehadiran: number;
  statusHadir: "Hadir" | "Belum Melakukan Presensi";
};

export type DataAgendaPertemuan = {
  name: string;
  date: Date;
};
