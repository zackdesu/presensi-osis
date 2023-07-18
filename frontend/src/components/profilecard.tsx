import { BsThreeDotsVertical } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { dataUser } from "./data";

const Cards = ({
  img,
  name,
  status,
}: {
  img: string;
  name: string;
  status: string;
}) => (
  <div className="mb-4 grid grid-cols-[.8fr_minmax(0px,_1.8fr)_.7fr] grid-rows-2 grid-flow-col">
    <div className="sm:w-[30px] sm:h-[30px] w-[25px] h-[25px] row-span-2 self-center bg-cover">
      <img
        src={img}
        className="rounded-full block object-cover w-full h-full"
      />
    </div>
    <p className="col-span-1 truncate ...">{name}</p>
    <p className="opacity-70 col-span-1 flex items-center truncate ...">
      <GoDotFill
        className={`mr-2 ${
          status.toLowerCase() === "online" && "text-green-400"
        }`}
      />{" "}
      {status}
    </p>
    <BsThreeDotsVertical className="row-span-2 self-center justify-self-end cursor-pointer active:text-zinc-400" />
  </div>
);

const ProfileCard = () => (
  <>
    <h4 className="mb-3">Pengurus</h4>
    <div className="overflow-y-auto w-full">
      {dataUser
        .sort((a, b) => {
          if (a.status === "Online" && b.status === "Offline") {
            return -1;
          } else if (a.status === "Offline" && b.status === "Online") {
            return 1;
          } else {
            return 0;
          }
        })
        .map((e, i) => (
          <Cards name={e.name} img={e.img} status={e.status} key={i} />
        ))}
    </div>
  </>
);

export default ProfileCard;