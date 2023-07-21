import { FormEvent } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: { name: string; password: string } = {
      name: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    api
      .post("/register", data)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => console.error(err.response.data.message));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center m-5">
      <img src="/osis.svg" alt="osissmkn1dumai" width={100} />
      <h2 className="my-10">OSIS SMK Negeri 1 Dumai</h2>

      <div className="flex flex-col">
        <label htmlFor="username" className="font-medium text-zinc-400">
          Nama
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="outline-none border-b bg-transparent p-2 text-lg mb-5"
        />
        <label htmlFor="password" className="font-medium text-zinc-400">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="outline-none border-b bg-transparent p-2 text-lg mb-5 font-bold tracking-widest"
        />

        <button className="px-8 py-2 font-semibold bg-orange-500 rounded-lg my-8">
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
