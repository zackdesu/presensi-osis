import Header from "../components/header";
import { dataUser } from "../components/data";
import { useEffect, useState } from "react";
import { DataAgendaPertemuan, DataUser } from "../components/type";
import api from "../api/axios";

const Presensi = () => {
  const [dataPertemuan, setDataPertemuan] = useState<DataAgendaPertemuan[]>([]);
  const [hadir, setHadir] = useState<boolean>(false);
  const [user, setUser] = useState<DataUser>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .get("/datapertemuan")
      .then((res) => {
        setDataPertemuan(res.data);
      })
      .catch((err) => console.log(err));

    api
      .get("/login")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));

    setIsLoading(false);

    return;
  }, []);

  useEffect(() => {
    if (!hadir) return;
    dataUser[0].statusHadir = "Hadir";
    console.log(dataUser[0].statusHadir);
    console.log(dataUser[0].kehadiran);
  }, [hadir, setHadir]);

  return (
    <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full p-5 gap-8 ml-20">
      <Header />
      <section className="bg-zinc-950 rounded-xl col-span-full md:col-span-5 md:row-span-2 flex flex-col items-center justify-center p-1">
        <h6>Tingkat kehadiranmu adalah</h6>
        <h2>
          {isLoading
            ? 0
            : Math.round(
                (user ? user.kehadiran / dataPertemuan.length : 0) * 100
              )}
          %
        </h2>
        <p>
          {isLoading
            ? "Loading..."
            : `${user && user.kehadiran} dari ${
                dataPertemuan.length
              } pertemuan`}
        </p>
      </section>
      <section className="bg-zinc-950 rounded-xl col-span-full flex items-center justify-center md:col-span-7">
        <img
          src={user && (user.img as string)}
          alt={user && (user.name as string)}
          className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] rounded-full mr-3"
        />
        <h6 className="mr-2 md:mr-5">{user && (user.name as string)}</h6> |{" "}
        <p className="ml-2 md:ml-5">{user && (user.role as string)}</p>
      </section>
      <section className="bg-zinc-950 rounded-xl flex col-span-full md:col-span-7 items-center justify-center">
        <h6>Status Presensi:&nbsp;</h6> <p>{user && user.hadir}</p>
      </section>
      <section className="bg-zinc-950 rounded-xl flex flex-col md:flex-row col-span-full row-span-3 items-center justify-center">
        <div className="md:w-3/4 flex flex-col items-center justify-center">
          <h4 className="mb-2">Pertemuan ke - {dataPertemuan.length}</h4>
          <p>
            Pembahasan:{" "}
            {isLoading
              ? "Loading..."
              : dataPertemuan[dataPertemuan.length - 1]?.name}
          </p>
          <p>
            Hari:{" "}
            {isLoading
              ? "Loading..."
              : new Date(dataPertemuan[dataPertemuan.length - 1]?.date)
                  .toUTCString()
                  .slice(5, 16)}
          </p>
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
