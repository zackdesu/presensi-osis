import { ChangeEvent, FormEvent, useContext } from "react";
import Header from "../components/header";
import { HeaderContext } from "../api/headerContext";
import { Link } from "react-router-dom";
import { AiFillCamera } from "react-icons/ai";
import api from "../api/axios";
import toast from "react-hot-toast";

const Pengaturan = () => {
  const data = useContext(HeaderContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: (e.currentTarget.username as { value: string }).value,
    };

    console.log(data);
  };

  const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    const avatar = e.currentTarget.files[0];
    if (!avatar.type.includes("image")) return console.error("Not an Image!");

    const formData: FormData = new FormData();
    formData.append("file", avatar);

    api
      .post("/useravatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res: { data: { message: string } }) => {
        toast.success(res.data.message);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full p-5 gap-8 ml-14 sm:ml-20">
      <Header />
      <div className="flex flex-col items-center col-span-full row-span-5 overflow-auto">
        <h3 className="mb-3">Pengaturan</h3>
        <div className="flex justify-around w-full my-5 flex-wrap">
          <div>
            <div className="relative h-fit">
              <img
                src={data.img}
                alt={data.name}
                className="rounded-full"
                width={150}
                height={150}
              />
              <label
                htmlFor="file"
                className="absolute right-0 bottom-0 rounded-full bg-white text-black border border-black cursor-pointer p-1"
              >
                <AiFillCamera size={20} />
              </label>
              <input
                type="file"
                name="file"
                id="file"
                hidden
                accept="image/*"
                onChange={handleAvatar}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col max-sm:mt-8">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              className="outline-none bg-transparent border-b p-3 text-lg mb-5 w-[99%] mx-auto focus:border-orange-300"
              defaultValue={data.name}
              name="username"
              id="username"
              autoComplete="off"
              disabled
            />

            <Link to="/pengaturan/password">
              <p className="underline">Ubah password</p>
            </Link>

            <button
              type="submit"
              className="px-8 py-2 font-semibold bg-orange-500 rounded-lg my-8"
            >
              <p>Simpan perubahan</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pengaturan;
