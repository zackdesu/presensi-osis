import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

const Agenda = ({ name, time }: { name: string; time: string }) => (
  <div className="mb-4 grid grid-cols-[.8fr_minmax(100px,_1.8fr)_.7fr] grid-rows-2 grid-flow-col">
    <AiOutlineCalendar className="row-span-2 self-center" size="2rem" />
    <p className="col-span-1 truncate ...">{name}</p>
    <p className="opacity-70 col-span-1 flex items-center truncate ...">
      <AiOutlineClockCircle className="mr-2 lg:mr-4" /> {time}
    </p>
    <BsThreeDotsVertical className="row-span-2 self-center justify-self-end cursor-pointer active:text-zinc-400" />
  </div>
);

export default Agenda;
