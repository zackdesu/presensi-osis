import { useState, useEffect } from "react";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DataAgendaPertemuan } from "./type";
import api from "../api/axios";
const Agenda = () => {
  const [dataAgenda, setDataAgenda] = useState<DataAgendaPertemuan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .get("/dataagenda")
      .then((res) => {
        setDataAgenda(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    return;
  });

  const Cards = ({ name, time }: { name: string; time: string }) => (
    <div className="mb-4 grid grid-cols-[.8fr_minmax(100px,_1.8fr)_.7fr] grid-rows-2 grid-flow-col">
      <AiOutlineCalendar className="row-span-2 self-center" size="2rem" />
      <p className="col-span-1 truncate ...">{name}</p>
      <p className="opacity-70 col-span-1 flex items-center truncate ...">
        <AiOutlineClockCircle className="mr-2 lg:mr-4" /> {time}
      </p>
      <BsThreeDotsVertical className="row-span-2 self-center justify-self-end cursor-pointer active:text-zinc-400" />
    </div>
  );

  return (
    <>
      <h4 className="mb-4">Agenda</h4>
      <div className="overflow-y-auto w-full">
        {isLoading
          ? "Loading..."
          : dataAgenda.map((a, i) => (
              <Cards
                name={a.name}
                time={new Date(a.date).toUTCString().slice(5, 16)}
                key={i}
              />
            ))}
      </div>
    </>
  );
};

export default Agenda;
