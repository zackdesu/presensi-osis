import { FormEvent } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: (e.currentTarget.username as { value: string }).value,
      password: (e.currentTarget.password as { value: string }).value,
    };

    api
      .post("/login", data)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err: { response: { data: { message: string } } }) =>
        toast.error(err.response.data.message)
      );

    return;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-5">
      <img src="/osis.svg" alt="osissmkn1dumai" width={100} />
      <h2 className="my-10">Masuk ke akunmu</h2>

      <div className="flex flex-col">
        <label htmlFor="username" className="font-medium text-zinc-400">
          <p>Nama</p>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="outline-none bg-transparent border-b p-3 text-lg mb-5 w-[99%] mx-auto focus:border-orange-300"
          required
          autoComplete="off"
        />
        <label htmlFor="password" className="font-medium text-zinc-400">
          <p>Password</p>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="outline-none bg-transparent border-b p-3 text-lg mb-5 w-[99%] mx-auto font-bold tracking-widest focus:border-orange-300 invalid:text-red-600 invalid:focus:border-red-500"
          required
          autoComplete="off"
          minLength={6}
        />

        <button className="px-8 py-2 font-semibold bg-orange-500 rounded-lg my-8">
          Login
        </button>

        <p className="text-center">
          Belum memiliki akun? Klik{" "}
          <Link to={"/register"} className="text-orange-300">
            disini
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
