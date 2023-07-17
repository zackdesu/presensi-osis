import { MdOutlineDateRange } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { dateNow } from "../components/date";
import Agenda from "../components/agenda";
import ProfileCard from "../components/profilecard";
import Calendar from "../components/calendar";

type Weather = {
  main: {
    temp: number;
  };
  weather: [
    {
      icon: string;
    }
  ];
};

const Home = () => {
  const [weather, setWeather] = useState<Weather>();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_WEATHER_API)
      .then((res) => setWeather(res.data))
      .catch((res) => console.log(res.data.message));
  }, []);

  const weatherIcons =
    import.meta.env.VITE_ICONS_WEATHER_API + weather?.weather[0].icon + ".png";

  return (
    <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full p-5 gap-8">
      <header className="col-span-4 md:col-span-12 self-center px-3 lg:px-5 grid grid-cols-3 md:grid-cols-12 grid-rows-2 grid-flow-col">
        <div className="row-span-2 md:col-span-2 flex items-center">
          <img
            src="/unnamed.png"
            className="rounded-full max-w-[35px] max-h-[35px] self-center row-span-2"
          />
          <div className="hidden sm:block">
            <p className="ml-3">zackdesu</p>
            <p className="ml-3 opacity-70">Administrator</p>
          </div>
        </div>

        <h6 className="my-1 col-start-3 md:col-start-4 lg:col-start-3 row-span-2 max-sm:col-span-2 col-span-1 md:col-span-2 md:col-end-11 self-center justify-self-end sm:place-self-center flex items-center justify-center rounded-xl bg-zinc-700 text-white p-2">
          <MdOutlineDateRange className="inline mr-3" /> {dateNow}
        </h6>

        <h6 className="my-1 md:col-end-13 col-span-2 row-span-2 rounded-xl bg-zinc-700 text-white place-self-center p-2 hidden sm:flex items-center">
          <img src={weatherIcons} width={18} className="mr-2" />
          {weather?.main.temp + "°C" || "Bad Network"}
        </h6>
      </header>

      <section className="col-span-4 sm:col-span-2 md:col-span-6 lg:col-span-5 row-span-2 md:row-span-3 rounded-xl bg-zinc-950 flex flex-col items-center p-5">
        <h4 className="mb-4">Agenda</h4>
        <div className="overflow-y-auto w-full">
          <Agenda name="Hari Kemerdekaan Indonesia" time="17 Aug 2023" />
          <Agenda name="Hari Natal" time="15 Des 2023" />
          <Agenda name="Tahun Baru" time="1 Jan 2024" />
          <Agenda name="Tahun Baru China" time="15 Februari 2024" />
        </div>
      </section>

      <aside className="hidden sm:flex sm:col-span-2 md:col-span-6 lg:col-span-4 row-span-3 md:col-end-13 md:row-span-3 bg-zinc-950 rounded-xl px-5 py-1 flex-col items-center">
        <Calendar />
      </aside>
      <section className="bg-zinc-950 col-span-2 row-span-2 md:col-span-5 md:row-span-2 lg:col-span-3 lg:row-span-4 rounded-xl flex flex-col items-center p-5">
        <ProfileCard />
      </section>
      <section className="bg-zinc-950 col-span-2 row-span-2 sm:row-span-3 md:col-span-7 md:row-span-1 lg:row-span-2 lg:col-span-9 rounded-xl">
        Kosong 2
      </section>
      <section className="bg-zinc-950 col-span-4 sm:col-span-2 row-span-2 md:col-span-7 md:row-span-1 lg:col-span-3 rounded-xl flex flex-col items-center p-3">
        <h5>Quote</h5>
        <p>"Selamat Pagi, Dunia."</p>
      </section>
    </div>
  );
};

export default Home;
