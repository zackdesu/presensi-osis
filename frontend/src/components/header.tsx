import { useContext } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { dateNow } from "./date";
import { HeaderContext } from "../api/headerContext";

const Header = () => {
  const data = useContext(HeaderContext);

  return (
    <header className="col-span-4 md:col-span-12 self-center px-3 lg:px-5 grid grid-cols-3 md:grid-cols-12 grid-rows-2 grid-flow-col">
      <div className="row-span-2 md:col-span-3 flex items-center">
        <img
          src={data.img}
          className="rounded-full max-w-[35px] max-h-[35px] self-center row-span-2"
        />
        <div className="hidden sm:block">
          <p className="ml-3 truncate">{data.name}</p>
          <p className="ml-3 opacity-70">{data.role}</p>
        </div>
      </div>

      <h6 className="my-1 col-start-2 md:col-start-4 row-span-2 max-sm:col-span-2 col-span-1 md:col-span-2 md:col-end-11 self-center justify-self-end sm:place-self-center flex items-center justify-center rounded-xl bg-zinc-700 text-white p-2">
        <MdOutlineDateRange className="inline mr-3" /> {dateNow}
      </h6>

      <h6 className="my-1 col-end-13 col-span-2 row-span-2 rounded-xl bg-zinc-700 text-white place-self-center p-2 hidden sm:flex items-center">
        {data && <img src={data.icon} width={18} className="mr-2" />}
        {data ? data.temp.toString() + "°C" : "Bad Network"}
      </h6>
    </header>
  );
};

export default Header;
