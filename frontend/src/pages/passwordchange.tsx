import { FormEvent } from "react";
import Header from "../components/header";
import api from "../api/axios";
import toast from "react-hot-toast";

const PasswordChange = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      oldPassword: (e.currentTarget.oldPassword as { value: string }).value,
      newPassword: (e.currentTarget.newPassword as { value: string }).value,
    };

    api
      .put("/editpassword", { data })
      .then((res: { data: { message: string } }) =>
        toast.success(res.data.message)
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full p-5 gap-8 ml-20">
      <Header />
      <div className="flex flex-col items-center col-span-full row-span-5 overflow-auto">
        <h3 className="mb-3">Ubah Passwordmu</h3>
        <form onSubmit={handleSubmit} className="flex flex-col my-5">
          <label htmlFor="oldPassword">Password Lama</label>
          <input
            type="text"
            className="outline-none bg-transparent border-b p-3 text-lg mb-5 w-[99%] mx-auto focus:border-orange-300"
            name="oldPassword"
            id="oldPassword"
            autoComplete="off"
          />
          <label htmlFor="newPassword">Password Baru</label>
          <input
            type="text"
            className="outline-none bg-transparent border-b p-3 text-lg mb-5 w-[99%] mx-auto focus:border-orange-300"
            name="newPassword"
            id="newPassword"
            autoComplete="off"
          />

          <button
            type="submit"
            className="px-8 py-2 font-semibold bg-orange-500 rounded-lg my-8"
          >
            Simpan perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
