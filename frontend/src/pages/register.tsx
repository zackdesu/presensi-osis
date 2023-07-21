import { FormEvent } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

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

    return;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-5">
      <img src="/osis.svg" alt="osissmkn1dumai" width={100} />
      <h2 className="my-10">Registrasi akunmu</h2>

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
          Register
        </button>

        <p className="text-center">
          Sudah memiliki akun? Klik{" "}
          <Link to={"/login"} className="text-orange-300">
            disini
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
