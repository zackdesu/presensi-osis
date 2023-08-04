import { FormEvent } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

type Value = {
  value: string;
};

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const kelas = (e.currentTarget.kelas as Value).value;
    const jurusan = (e.currentTarget.jurusan as Value).value;
    const lokal = (e.currentTarget.lokal as Value).value;

    const data: {
      name: string;
      password: string;
      kelas: string;
      jurusan: string;
      lokal: string;
    } = {
      name: (e.currentTarget.username as Value).value,
      password: (e.currentTarget.password as Value).value,
      kelas,
      jurusan,
      lokal,
    };

    api
      .post("/register", data)
      .then((res: AxiosResponse) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err: { response: { data: { message: string } } }) =>
        console.error(err.response.data.message)
      );

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

        <label htmlFor="kelas" className="font-medium text-zinc-400">
          <p>Kelas</p>
        </label>
        <select
          id="kelas"
          name="kelas"
          className="bg-black px-3 py-2 mb-5"
          required
        >
          <option value={""}>-- Pilih Kelas --</option>
          <option value={"X"}>X (10)</option>
          <option value={"XI"}>XI (11)</option>
        </select>

        <label htmlFor="jurusan" className="font-medium text-zinc-400">
          <p>Jurusan</p>
        </label>

        <select
          id="jurusan"
          name="jurusan"
          className="bg-black px-3 py-2 mb-5"
          required
        >
          <option value={""}>-- Pilih Jurusan --</option>
          <option value={"AKL"}>Akuntansi dan Keuangan Lembaga</option>
          <option value={"Busana"}>Busana</option>
          <option value={"Kuliner"}>Kuliner</option>
          <option value={"MPLB"}>
            Manajemen Perkantoran dan Layanan Bisnis
          </option>
          <option value={"Pemasaran"}>Pemasaran</option>
          <option value={"ULP"}>Usaha Layanan Pariwisata</option>
          <option value={"TJKT"}>
            Teknik Jaringan Komputer dan Telekomunikasi
          </option>
        </select>

        <label className="font-medium text-zinc-400">
          <p className="after:content-['_(kosongkan_jika_tidak_ada)'] after:text-[.6rem] after:absolute after:-top-1/4 after:left-8 md:after:left-11 relative">
            Lokal
          </p>
        </label>

        <select id="lokal" name="lokal" className="bg-black px-3 py-2 mb-5">
          <option value={""}>-- Pilih Lokal --</option>
          <option value={"1"}>1</option>
          <option value={"2"}>2</option>
          <option value={"3"}>3</option>
        </select>

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
