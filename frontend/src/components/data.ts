type DataUser = {
  name: string;
  role: "Administrator" | "Moderator" | "Member";
  img: string;
  status: "Online" | "Offline";
  kehadiran: number;
  statusHadir: "Hadir" | "Belum Melakukan Presensi" | string;
};

type dataAgenda = {
  name: string;
  date: string;
};

export const dataAgenda: dataAgenda[] = [
  {
    name: "Hari Kemerdekaan Indonesia",
    date: new Date(2023, 7, 17).toUTCString().slice(5, 16),
  },
  {
    name: "Perayaan Hari Natal",
    date: new Date(2023, 12, 15).toUTCString().slice(5, 16),
  },
  {
    name: "Perayaan Tahun Baru",
    date: new Date(2024, 1, 8).toUTCString().slice(5, 16),
  },
  {
    name: "Perayaan Hari Imlek",
    date: new Date(2024, 2, 15).toUTCString().slice(5, 16),
  },
];

export const dataUser: Array<DataUser> = [
  {
    name: "zackdesu",
    role: "Administrator",
    img: "/unnamed.png",
    status: "Online",
    kehadiran: 1,
    statusHadir: "Belum Melakukan Presensi",
  },
  {
    name: "Ilham Fajar",
    role: "Member",
    img: "/ilham.png",
    status: "Offline",
    kehadiran: 0,
    statusHadir: "Belum Melakukan Presensi",
  },
  {
    name: "Jansen Rival Lo",
    role: "Administrator",
    img: "/jansen.jpg",
    status: "Online",
    kehadiran: 0,
    statusHadir: "Belum Melakukan Presensi",
  },
  {
    name: "Bayu irawan",
    role: "Member",
    img: "/bayu.jpg",
    status: "Offline",
    kehadiran: 0,
    statusHadir: "Belum Melakukan Presensi",
  },
  {
    name: "Naufal Iqbal Al Qari",
    role: "Administrator",
    img: "/Naufal.jpg",
    status: "Offline",
    kehadiran: 0,
    statusHadir: "Belum Melakukan Presensi",
  },

  {
    name: "Richard Yeung",
    role: "Member",
    img: "/Richard.jpg",
    status: "Offline",
    kehadiran: 0,
    statusHadir: "Belum Melakukan Presensi",
  },
  {
    name: "Agustia Randa Saputra",
    role: "Member",
    img: "/Agus.jpg",
    status: "Offline",
    kehadiran: 0,
    statusHadir: "Belum Melakukan Presensi",
  },
  {
    name: "Jacksen",
    role: "Administrator",
    img: "/Jacksen.img",
    status: "Online",
    kehadiran: 0,
    statusHadir: "Belum Melakukan Presensi",
  },
  {
    name: "luthfi Azhari Pratama",
    role: "Member",
    img: "/Luthfi.jpg",
    status: "Offline",
    kehadiran: 0,
    statusHadir: "Belum Melakukan Presensi",
  },
  {
    name: "Tuah Siddiq Ramadhan",
    role: "Member",
    img: "/Tuah.jpg",
    status: "Offline",
    kehadiran: 0,
    statusHadir: "Belum Melakukan Presensi",
  },
  {
    name: "Nailul Candra Wimba",
    role: "Administrator",
    img: "/Nailul.jpg",
    status: "Offline",
    kehadiran: 0,
    statusHadir: "Belum Melakukan Presensi",
  },
  {
    name: "Zul Amrin",
    role: "Member",
    img: "/Zul.jpg",
    status: "Online",
    kehadiran: 0,
    statusHadir: "Belum Melakukan Presensi",
  },
  {
    name: "Jofan Cristoferry Tan",
    role: "Member",
    img: "/Apao.jpg",
    status: "Online",
    kehadiran: 0,
    statusHadir: "Belum Melakukan Presensi",
  },
  {
    name: "lidya Wisata Kasih Simamora",
    role: "Administrator",
    img: "/Lidya.jpg",
    status: "Offline",
    kehadiran: 0,
    statusHadir: "Belum Melakukan Presensi",
  },
  {
    name: "Fifi Delfia",
    role: "Administrator",
    img: "/Fifi.jpg",
    status: "Offline",
    kehadiran: 0,
    statusHadir: "Belum Melakukan Presensi",
  },
];

export const dataQuote: string[] = [
  "Hidup manusia hanyalah sekali seumur hidup, manfaatkan hidupmu sebaik-baiknya.",
  "Manusia hanyalah debu jika tak memiliki apa-apa.",
  "Semakin tinggi padi, semakin merunduk pula padi tersebut.",
];

export const dataPertemuan = [
  {
    name: "Classmeeting",
    date: new Date(2023, 18, 7).toUTCString().slice(5, 16),
  },
  {
    name: "Classmeeting",
    date: new Date(2023, 18, 7).toUTCString().slice(5, 16),
  },
  {
    name: "Rapat dengan Smartfren",
    date: new Date(2023, 18, 7).toUTCString().slice(5, 16),
  },
];
