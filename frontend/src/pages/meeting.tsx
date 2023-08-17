import { AxiosError, AxiosResponse } from "axios";
import api from "../api/axios";
import Header from "../components/header";
import { FormEvent } from "react";

const Meeting = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: (e.currentTarget.meetingname as { value: string }).value,
      startTime: new Date(
        (e.currentTarget.startTime as { value: string }).value
      ),
      endTime: new Date((e.currentTarget.endTime as { value: string }).value),
      location: (e.currentTarget.location as { value: string }).value,
      password: (e.currentTarget.password as { value: string }).value,
    };

    // console.log(data);
    api
      .post("/datapertemuan", data)
      .then((res: AxiosResponse) => console.log(res.data))
      .catch((err: AxiosError) => console.error(err));
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full p-5 gap-8 ml-14 sm:ml-20">
      <Header />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-2 md:row-span-5 md:col-span-12"
      >
        <h2 className="mb-5">Buat Pertemuan</h2>

        <div className="flex flex-col">
          <label htmlFor="meetingname" className="font-medium text-zinc-400">
            <p>Nama Pertemuan</p>
          </label>
          <input
            type="text"
            id="meetingname"
            name="meetingname"
            className="outline-none bg-transparent border-b p-3 text-lg mb-5 w-[99%] mx-auto focus:border-orange-300"
            required
            autoComplete="off"
          />
          <label htmlFor="startTime" className="font-medium text-zinc-400">
            <p>Waktu Mulai</p>
          </label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            className="outline-none bg-transparent border-b p-3 text-lg mb-5 w-[99%] mx-auto focus:border-orange-300"
            required
            autoComplete="off"
          />
          <label htmlFor="endTime" className="font-medium text-zinc-400">
            <p>Waktu Akhir</p>
          </label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            className="outline-none bg-transparent border-b p-3 text-lg mb-5 w-[99%] mx-auto focus:border-orange-300"
            required
            autoComplete="off"
          />
          <label htmlFor="location" className="font-medium text-zinc-400">
            <p>Lokasi</p>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="outline-none bg-transparent border-b p-3 text-lg mb-5 w-[99%] mx-auto focus:border-orange-300"
            required
            autoComplete="off"
          />
          <label htmlFor="password" className="font-medium text-zinc-400">
            <p>Password</p>
          </label>
          <input
            type="text"
            id="password"
            name="password"
            className="outline-none bg-transparent border-b p-3 text-lg mb-5 w-[99%] mx-auto focus:border-orange-300 invalid:text-red-600 invalid:focus:border-red-500"
            required
            autoComplete="off"
            minLength={6}
          />

          <button className="px-8 py-2 font-semibold bg-orange-500 rounded-lg my-8">
            Buat Pertemuan
          </button>
        </div>
      </form>
    </div>
  );
};

export default Meeting;
