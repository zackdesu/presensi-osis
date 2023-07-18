type DataUser = {
  name: string;
  role: "Administrator" | "Moderator" | "Member";
  img: string;
  status: "Online" | "Offline";
};

export const dataAgenda = [
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
  },
  {
    name: "Ilham Fajar",
    role: "Member",
    img: "/ilham.png",
    status: "Offline",
  },
  {
    name: "Jansen Rival Lo",
    role: "Administrator",
    img: "/jansen.jpg",
    status: "Online",
  },
  {
    name: "Bayu irawan",
    role: "Member",
    img: "/bayu.jpg",
    status: "Offline",
  },
  {
    name: "Naufal Iqbal Al Qari",
    role: "Administrator",
    img: "/Naufal.jpg",
    status: "Offline",
  },

  {
    name: "Richard Yeung",
    role: "Member",
    img: "/Richard.jpg",
    status: "Offline",
  },
  {
    name: "Agustia Randa Saputra",
    role: "Member",
    img: "/Agus.jpg",
    status: "Offline",
  },
  {
    name: "Jacksen",
    role: "Administrator",
    img: "/Jacksen.img",
    status: "Online",
  },
  {
    name: "luthfi Azhari Pratama",
    role: "Member",
    img: "/Luthfi.jpg",
    status: "Offline",
  },
  {
    name: "Tuah Siddiq Ramadhan",
    role: "Member",
    img: "/Tuah.jpg",
    status: "Offline",
  },
  {
    name: "Nailul Candra Wimba",
    role: "Administrator",
    img: "/Nailul.jpg",
    status: "Offline",
  },
  {
    name: "Zul Amrin",
    role: "Member",
    img: "/Zul.jpg",
    status: "Online",
  },
  {
    name: "Jofan Cristoferry Tan",
    role: "Member",
    img: "/Apao.jpg",
    status: "Online",
  },
  {
    name: "lidya Wisata Kasih Simamora",
    role: "Administrator",
    img: "/Lidya.jpg",
    status: "Offline",
  },
  {
    name: "Fifi Delfia",
    role: "Administrator",
    img: "/Fifi.jpg",
    status: "Offline",
  },
];

export const dataQuote = [
  "Hidup manusia hanyalah sekali seumur hidup, manfaatkan hidupmu sebaik-baiknya.",
  "Manusia hanyalah debu jika tak memiliki apa-apa.",
  "Semakin tinggi padi, semakin merunduk pula padi tersebut.",
];
