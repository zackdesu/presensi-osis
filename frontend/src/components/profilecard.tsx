import { BsThreeDotsVertical } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { DataUser } from "./type";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import api from "../api/axios";
import { HeaderContext } from "../api/headerContext";

const ProfileCard = () => {
  const [dataUser, setDataUser] = useState<DataUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    api
      .get<SetStateAction<DataUser[]>>("/datauserforhome")
      .then((res) => {
        setDataUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    return;
  }, [trigger]);

  const Cards = ({
    id,
    role,
    img,
    name,
    status,
  }: {
    id: string;
    role: string;
    img: string;
    name: string;
    status: string;
  }) => {
    const [display, setDisplay] = useState<boolean>(false);
    const smallbox = useRef<HTMLDivElement>(null);
    const dots = useRef<HTMLSpanElement>(null);
    const data = useContext(HeaderContext);

    const handleModRoles = () => {
      if (data.role !== "Admin") return console.error("Kamu bukan Admin!");

      api
        .put(`/role/${id}/mod`)
        .then((res) => {
          console.log(res.data.message);
          setTrigger(!trigger);
        })
        .catch((err: { response: { data: { message: string } } }) =>
          console.error(err)
        );
    };
    const handleMemberRoles = () => {
      if (data.role !== "Admin") return console.error("Kamu bukan Admin!");

      api
        .put(`/role/${id}/member`)
        .then((res) => {
          console.log(res.data.message);
          setTrigger(!trigger);
        })
        .catch((err: { response: { data: { message: string } } }) =>
          console.error(err)
        );
    };

    window.addEventListener("click", (e) => {
      if (e.target !== dots.current?.childNodes[0]) {
        setDisplay(false);
      }
    });

    const Smallbox = ({ className }: { className?: string }) => {
      return (
        <div className={"bg-zinc-900 rounded p-1 " + className} ref={smallbox}>
          {data.role === "Admin" ? (
            <>
              {role === "Member" ? (
                <p className="cursor-pointer" onClick={handleModRoles}>
                  Jadikan Moderator
                </p>
              ) : (
                <p className="cursor-pointer" onClick={handleMemberRoles}>
                  Jadikan Member
                </p>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      );
    };

    return (
      <div className="mb-4 flex items-center relative">
        <div className="w-[25px] h-[25px] bg-cover">
          <img
            src={img}
            className="rounded-full block object-cover w-full h-full"
          />
        </div>
        <div className="ml-2">
          <p className="truncate ...">{name}</p>
          <p className="opacity-70 flex items-center truncate ...">
            <GoDotFill
              className={`mr-2 ${
                status.toLowerCase() === "online" ? "text-green-400" : ""
              }`}
            />{" "}
            {status}
          </p>
        </div>
        <span className="ml-auto" ref={dots}>
          <BsThreeDotsVertical
            className=" cursor-pointer active:text-zinc-400"
            onClick={() => {
              setDisplay(!display);
            }}
          />
        </span>
        <Smallbox
          className={`absolute right-0 -bottom-5 ${display ? "" : "hidden"}`}
        />
      </div>
    );
  };

  const sortedUser = dataUser.slice().sort((a, b) => {
    if (a.status === "Online" && b.status === "Offline") return -1;
    if (a.status === "Offline" && b.status === "Online") return 1;

    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    else return 0;
  });
  return (
    <>
      <h4 className="mb-3">Pengurus</h4>
      <div className="w-full h-full overflow-y-auto">
        {isLoading
          ? "Loading..."
          : sortedUser.map((e, i) => (
              <Cards
                id={e.id}
                role={e.role}
                name={e.name}
                img={e.img as string}
                status={e.status as string}
                key={i}
              />
            ))}
      </div>
    </>
  );
};

export default ProfileCard;
