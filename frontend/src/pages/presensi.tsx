import Header from "../components/header";
import { useEffect, useState } from "react";
import { DataPertemuan, DataUser } from "../components/type";
import api from "../api/axios";
import toast from "react-hot-toast";

const Presensi = () => {
  const [semuaDataPertemuan, setSemuaDataPertemuan] = useState<DataPertemuan[]>(
    []
  );
  const [dataPertemuan, setDataPertemuan] = useState<DataPertemuan>();
  const [user, setUser] = useState<DataUser>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .get("/login")
      .then((res) => setUser(res.data.session))
      .catch((err) => console.log(err));
  }, [user]);

  useEffect(() => {
    api
      .get("/dataPertemuan")
      .then((res) => {
        setDataPertemuan(res.data);
      })
      .catch((err) => console.log(err.response.data.message));

    return;
  }, [dataPertemuan]);

  useEffect(() => {
    api
      .get("/semuadatapertemuan")
      .then((res) => {
        setSemuaDataPertemuan(res.data);
      })
      .catch((err) => console.log(err));

    setIsLoading(false);

    return;
  }, []);

  useEffect(() => {
    api
      .get("/checkTime")
      .then((res) => console.log(res.data.message))
      .catch((err) => console.error(err.response.data.message));
  }, []);

  const handlePresensi = () => {
    api
      .post("/presensi")
      .then((res) => toast.success(res.data.message))
      .catch((err) => {
        console.error(err.response.data.message);
        toast.error("Waktu presensi habis!");
      });
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full p-5 gap-8 ml-20">
      <Header />
      <section className="bg-zinc-950 rounded-xl col-span-full md:col-span-5 md:row-span-2 flex flex-col items-center justify-center p-1">
        <h6>Tingkat kehadiranmu adalah</h6>
        <h2>
          {isLoading
            ? 0
            : Math.round(
                (user ? user.kehadiran / semuaDataPertemuan.length : 0) * 100
              )}
          %
        </h2>
        <p>
          {isLoading
            ? "Loading..."
            : `${user && user.kehadiran} dari ${
                semuaDataPertemuan.length
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
        <h6>Status Presensi:&nbsp;</h6>{" "}
        <p>{user && user.hadir ? "Sudah Presensi" : "Belum Presensi"}</p>
      </section>
      <section className="bg-zinc-950 rounded-xl flex flex-col md:flex-row col-span-full row-span-3 items-center justify-center">
        <div className="md:w-3/4 flex flex-col items-center justify-center">
          <h4 className="mb-2">Pertemuan ke - {semuaDataPertemuan.length}</h4>
          <p>
            Pembahasan:{" "}
            {isLoading
              ? "Loading..."
              : dataPertemuan
              ? dataPertemuan.name
              : semuaDataPertemuan[semuaDataPertemuan.length - 1]?.name}
          </p>
          <p>
            Hari:{" "}
            {isLoading
              ? "Loading..."
              : dataPertemuan
              ? new Date(dataPertemuan.startTime).toUTCString().slice(5, 16)
              : new Date(
                  semuaDataPertemuan[semuaDataPertemuan.length - 1]?.startTime
                )
                  .toUTCString()
                  .slice(5, 16)}
          </p>
          <p>
            Jadwal:{" "}
            {dataPertemuan
              ? new Date(dataPertemuan.startTime).toTimeString().slice(0, 5)
              : new Date(
                  semuaDataPertemuan[semuaDataPertemuan.length - 1]?.startTime
                )
                  .toTimeString()
                  .slice(0, 5)}{" "}
            -{" "}
            {dataPertemuan
              ? new Date(dataPertemuan.endTime).toTimeString().slice(0, 5)
              : new Date(
                  semuaDataPertemuan[semuaDataPertemuan.length - 1]?.endTime
                )
                  .toTimeString()
                  .slice(0, 5)}
          </p>
        </div>
        <div className="md:w-1/4 flex items-center justify-center">
          <button
            className="py-2 px-5 m-4 bg-green-500 rounded-xl"
            onClick={handlePresensi}
          >
            <p>Presensi Disini</p>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Presensi;
