import Header from "../components/header";
import { dataPertemuan, dataUser } from "../components/data";
import { useEffect, useState } from "react";

const Presensi = () => {
  const [hadir, setHadir] = useState(false);
  const [kehadiranUser, setKehadiranUser] = useState(dataUser[0].kehadiran);

  useEffect(() => {
    if (!hadir) return;
    dataUser[0].statusHadir = "Hadir";
    console.log(dataUser[0].statusHadir);
    setKehadiranUser(kehadiranUser + 1);
    dataUser[0].kehadiran += kehadiranUser;
    console.log(dataUser[0].kehadiran);
  }, [hadir, setHadir]);

  return (
    <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full p-5 gap-8">
      <Header />
      <section className="bg-zinc-950 rounded-xl col-span-full md:col-span-5 md:row-span-2 flex flex-col items-center justify-center p-1">
        <h6>Tingkat kehadiranmu adalah</h6>
        <h2>{Math.round((kehadiranUser / dataPertemuan.length) * 100)}%</h2>
        <p>
          {kehadiranUser} dari {dataPertemuan.length} pertemuan
        </p>
      </section>
      <section className="bg-zinc-950 rounded-xl col-span-full flex items-center justify-center md:col-span-7">
        <img
          src={dataUser[0].img}
          alt={dataUser[0].name}
          className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] rounded-full mr-3"
        />
        <h6 className="mr-2 md:mr-5">{dataUser[0].name}</h6> |{" "}
        <p className="ml-2 md:ml-5">{dataUser[0].role}</p>
      </section>
      <section className="bg-zinc-950 rounded-xl flex col-span-full md:col-span-7 items-center justify-center">
        <h6>Status Presensi:&nbsp;</h6>{" "}
        <p>{hadir ? "Hadir" : "Belum Melakukan Presensi"}</p>
      </section>
      <section className="bg-zinc-950 rounded-xl flex flex-col md:flex-row col-span-full row-span-2 items-center justify-center">
        <div className="md:w-3/4 flex flex-col items-center justify-center">
          <h4 className="mb-2">Pertemuan ke - {dataPertemuan.length}</h4>
          <p>Pembahasan: {dataPertemuan[dataPertemuan.length - 1].name}</p>
          <p>Hari: {dataPertemuan[dataPertemuan.length - 1].date}</p>
          <p>Jadwal: 14:00 - 16:00</p>
        </div>
        <div className="md:w-1/4 flex items-center justify-center">
          <button
            className="py-2 px-5 m-4 bg-green-500 rounded-xl"
            onClick={() => {
              setHadir(true);
            }}
          >
            <p>Presensi Disini</p>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Presensi;
