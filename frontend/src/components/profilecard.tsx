import { BsThreeDotsVertical } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

const Cards = ({
  img,
  name,
  role,
}: {
  img: string;
  name: string;
  role: string;
}) => (
  <div className="mb-4 grid grid-cols-[.8fr_minmax(100px,_1.8fr)_.7fr] grid-rows-2 grid-flow-col">
    <img
      src={img}
      className="row-span-2 self-center rounded-full"
      width={30}
      height={30}
    />
    <p className="col-span-1 truncate ...">{name}</p>
    <p className="opacity-70 col-span-1 flex items-center truncate ...">
      <GoDotFill
        className={`mr-2 ${
          role.toLowerCase() === "online" && "text-green-400"
        }`}
      />{" "}
      {role}
    </p>
    <BsThreeDotsVertical className="row-span-2 self-center justify-self-end" />
  </div>
);

const ProfileCard = () => (
  <>
    <h4 className="mb-3">Pengurus</h4>
    <div className="overflow-y-auto w-full">
      <Cards img="/unnamed.png" name="zackdesu" role="Online" />
      <Cards img="/unnamed.png" name="zackdesu" role="Online" />
      <Cards img="/unnamed.png" name="zackdesu" role="Online" />
      <Cards img="/unnamed.png" name="zackdesu" role="Offline" />
      <Cards img="/unnamed.png" name="zackdesu" role="Offline" />
      <Cards img="/unnamed.png" name="zackdesu" role="Offline" />
    </div>
  </>
);

export default ProfileCard;
