import { FaList } from "react-icons/fa";
import { IconType } from "react-icons";
import { IoHome } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { BsInfoCircleFill } from "react-icons/bs";
import { TfiGallery } from "react-icons/tfi";
import { AiFillSetting } from "react-icons/ai";
import { MdMeetingRoom } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import { useContext } from "react";
import { HeaderContext } from "../api/headerContext";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = useContext(HeaderContext);
  const path = location.pathname;

  const SetIcon = ({ name, icon: Icon }: { name: string; icon: IconType }) => {
    const linkTo =
      name.toLowerCase() === "home" ? "/" : "/" + name.toLowerCase();
    return (
      <Link to={linkTo}>
        <div
          className={
            "flex my-3 p-2 justify-between cursor-pointer " +
            (path.includes(name.toLowerCase())
              ? "bg-white rounded-xl text-black"
              : path === linkTo
              ? "bg-white rounded-xl text-black"
              : "text-white")
          }
        >
          <Icon
            size={"1.4rem"}
            className="max-sm:w-[1.2rem] max-sm:h-[1.2rem]"
          />
          <h6 className="ml-2 hidden xl:group-hover:block">{name}</h6>
        </div>
      </Link>
    );
  };

  const handleLogout = () => {
    api
      .post("/logout")
      .then((res) => {
        console.log(res.data);
        return navigate("/login");
      })
      .catch((err: { response: { data: { message: string } } }) =>
        console.log(err.response.data.message)
      );

    return;
  };

  return (
    <div className="fixed z-50 left-0 top-0 bottom-0 sm:w-20 xl:hover:w-2/12 h-full max-sm:px-2 py-5 bg-zinc-900 flex flex-col items-center transition-all group">
      <img
        src="/osis.svg"
        alt="osissmkn1dumai"
        className="max-w-[50px] max-sm:max-w-[45px]"
      />

      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center xl:group-hover:items-start mt-10 ">
          <SetIcon name="Home" icon={IoHome as IconType} />
          <SetIcon name="Presensi" icon={FaList as IconType} />
          <SetIcon name="Galeri" icon={TfiGallery as IconType} />
          <SetIcon name="Tentang" icon={BsInfoCircleFill as IconType} />
          <SetIcon name="Pengaturan" icon={AiFillSetting as IconType} />
          {data.role === "Admin" ? (
            <SetIcon name="Meeting" icon={MdMeetingRoom as IconType} />
          ) : (
            ""
          )}
        </div>
        <div>
          <TbLogout2
            size="1.6rem"
            className="cursor-pointer text-white"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
