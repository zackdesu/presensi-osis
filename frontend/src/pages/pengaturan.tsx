import { FormEvent, useContext } from "react";
import Header from "../components/header";
import { HeaderContext } from "../api/headerContext";
import { Link } from "react-router-dom";

const Pengaturan = () => {
  const data = useContext(HeaderContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: (e.currentTarget.username as { value: string }).value,
    };

    console.log(data);
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full p-5 gap-8 ml-20">
      <Header />
      <div className="flex flex-col items-center col-span-full row-span-5 overflow-auto">
        <h3 className="mb-3">Pengaturan</h3>
        <div className="flex justify-around w-full my-5">
          <div>
            <img
              src={data.img}
              className="rounded-full"
              width={150}
              height={150}
            />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              className="outline-none bg-transparent border-b p-3 text-lg mb-5 w-[99%] mx-auto focus:border-orange-300"
              defaultValue={data.name}
              name="username"
              id="username"
              autoComplete="off"
            />

            <Link to="/pengaturan/password">
              <p className="underline">Ubah password</p>
            </Link>

            <button
              type="submit"
              className="px-8 py-2 font-semibold bg-orange-500 rounded-lg my-8"
            >
              Simpan perubahan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pengaturan;
