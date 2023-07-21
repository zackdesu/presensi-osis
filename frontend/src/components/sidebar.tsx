import { FaList } from "react-icons/fa";
import { IconType } from "react-icons";
import { IoHome } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { BsInfoCircleFill } from "react-icons/bs";
import { TfiGallery } from "react-icons/tfi";
import { BiSolidHelpCircle } from "react-icons/bi";

import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from "../api/axios";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const SetIcon = ({ name, icon: Icon }: { name: string; icon: IconType }) => {
    const linkTo =
      name.toLowerCase() === "home" ? "/" : "/" + name.toLowerCase();
    return (
      <Link to={linkTo}>
        <div
          className={
            "flex my-3 p-2 justify-between cursor-pointer " +
            (path === linkTo ? "bg-white rounded-xl text-black" : "text-white")
          }
        >
          <Icon size={"1.4rem"} />
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
      .catch((err) => console.log(err.response.data.message));
  };

  return (
    <div className="fixed z-50 left-0 top-0 bottom-0 w-20 xl:hover:w-2/12 h-full p-5 bg-zinc-900 flex flex-col items-center transition-all group">
      <img src="/osis.svg" alt="osissmkn1dumai" className="max-w-[50px]" />

      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center xl:group-hover:items-start mt-10 ">
          <SetIcon name="Home" icon={IoHome} />
          <SetIcon name="Presensi" icon={FaList} />
          <SetIcon name="Galeri" icon={TfiGallery} />
          <SetIcon name="Tentang" icon={BsInfoCircleFill} />
          <SetIcon name="Bantuan" icon={BiSolidHelpCircle} />
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
