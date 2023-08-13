import Header from "../components/header";
import { FormEvent, useEffect, useState } from "react";
import { DataPertemuan, DataUser } from "../components/type";
import api from "../api/axios";
import toast from "react-hot-toast";
import { AxiosResponse } from "axios";

const Presensi = () => {
  const [semuaDataPertemuan, setSemuaDataPertemuan] = useState<DataPertemuan[]>(
    []
  );
  const [dataPertemuan, setDataPertemuan] = useState<DataPertemuan>();
  const [user, setUser] = useState<DataUser>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .get<{ session: DataUser }>("/login")
      .then((res: AxiosResponse<{ session: DataUser }>) =>
        setUser(res.data.session)
      )
      .catch((err) => console.log(err));
  }, [user]);

  useEffect(() => {
    api
      .get("/dataPertemuan")
      .then((res: AxiosResponse<DataPertemuan>) => {
        setDataPertemuan(res.data);
      })
      .catch((err: { response: { data: { message: string } } }) =>
        console.log(err.response.data.message)
      );

    return;
  }, [dataPertemuan]);

  useEffect(() => {
    api
      .get("/semuadatapertemuan")
      .then((res: AxiosResponse<DataPertemuan[]>) => {
        setSemuaDataPertemuan(res.data);
      })
      .catch((err) => console.log(err));

    setIsLoading(false);

    return;
  }, []);

  useEffect(() => {
    api
      .get("/checkTime")
      .then((res: AxiosResponse<{ message: string }>) =>
        console.log(res.data.message)
      )
      .catch((err: { response: { data: { message: string } } }) =>
        console.error(err.response.data.message)
      );
  }, []);

  const handlePresensi = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      password: (e.currentTarget.password as { value: string }).value,
    };

    api
      .post("/presensi", data)
      .then((res: AxiosResponse<{ message: string }>) =>
        toast.success(res.data.message)
      )
      .catch((err: { response: { data: { message: string } } }) => {
        console.error(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full p-5 gap-8 ml-14 sm:ml-20">
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
            : `${user ? user.kehadiran : ""} dari ${
                semuaDataPertemuan.length
              } pertemuan`}
        </p>
      </section>
      <section className="bg-zinc-950 rounded-xl col-span-full flex items-center justify-center md:col-span-7">
        <img
          src={user && (user.img as string)}
          alt={user && user.name}
          className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] rounded-full mr-3"
        />
        <h6 className="mr-2 md:mr-5">{user && user.name}</h6> |{" "}
        <p className="ml-2 md:ml-5">{user && user.role}</p>
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
        <form
          onSubmit={handlePresensi}
          className="md:w-1/4 flex max-md:justify-evenly max-md:mt-3 md:flex-col items-center justify-center"
        >
          <input
            type="text"
            className="bg-transparent py-2 px-5 outline-none border border-zinc-700 w-1/2 md:w-3/4"
            name="password"
            id="password"
          />
          <button
            className="py-2 px-5 bg-green-500 rounded-xl md:mt-4"
            type="submit"
          >
            <p>Presensi Disini</p>
          </button>
        </form>
      </section>
    </div>
  );
};

export default Presensi;
