import Agenda from "../components/agenda";
import ProfileCard from "../components/profilecard";
import Calendar from "../components/calendar";
import { dataAgenda, dataQuote } from "../components/data";
import Header from "../components/header";

const Home = () => {
  const Random = Math.floor(Math.random() * dataQuote.length);

  return (
    <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full p-5 gap-8">
      <Header />
      <section className="col-span-4 sm:col-span-2 md:col-span-6 lg:col-span-5 row-span-2 md:row-span-3 rounded-xl bg-zinc-950 flex flex-col items-center p-5">
        <h4 className="mb-4">Agenda</h4>
        <div className="overflow-y-auto w-full">
          {dataAgenda.map((a, i) => (
            <Agenda name={a.name} time={a.date} key={i} />
          ))}
        </div>
      </section>

      <aside className="hidden sm:flex sm:col-span-2 md:col-span-6 lg:col-span-4 row-span-3 md:col-end-13 md:row-span-3 bg-zinc-950 rounded-xl px-5 py-1 flex-col items-center">
        <Calendar />
      </aside>
      <section className="bg-zinc-950 col-span-3 row-span-2 sm:col-span-2 md:col-span-5 md:row-span-2 lg:col-span-3 lg:row-span-5 rounded-xl flex flex-col items-center p-5">
        <ProfileCard />
      </section>
      <section className="bg-zinc-950 row-span-2 sm:col-span-2 sm:row-span-3 md:col-span-7 md:row-span-1 lg:row-span-2 lg:col-span-9 rounded-xl">
        <img
          src="/jansen.jpg"
          className="object-cover rounded-xl object-center w-full h-full"
        />
      </section>
      <section className="bg-zinc-950 col-span-4 sm:col-span-2 sm:row-span-2 md:col-span-7 md:row-span-1 lg:hidden rounded-xl flex flex-col items-center p-2">
        <h6 className="mb-2 md:mb-0">#QoTD</h6>
        <p className="text-center">"{dataQuote[Random]}"</p>
      </section>
    </div>
  );
};

export default Home;
