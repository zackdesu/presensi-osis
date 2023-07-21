// headerContext.tsx
import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import api from "./axios";
import { DataUser } from "../components/type";
import { useNavigate } from "react-router-dom";

export type TypeHeaderContext = {
  name: string;
  role: string;
  img: string;
  temp: number;
  icon: string;
};

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

export const HeaderContext = createContext<TypeHeaderContext>({
  name: "",
  role: "",
  img: "",
  temp: 0,
  icon: "",
});

const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<Weather>();
  const [acc, setAcc] = useState<DataUser>();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_WEATHER_API)
      .then((res) => setWeather(res.data))
      .catch((res) => console.log(res.data.message));
  }, []);

  useEffect(() => {
    api
      .get("/login")
      .then((res) => setAcc(res.data))
      .catch((err) => {
        console.log(err.response.data.message);
        return navigate("/login");
      });
  }, [navigate]);

  const icon =
    import.meta.env.VITE_ICONS_WEATHER_API + weather?.weather[0].icon + ".png";

  const requiredData = {
    name: acc?.name as string,
    role: acc?.role as string,
    img: acc?.img as string,
    temp: weather?.main.temp as number,
    icon,
  };

  return (
    <HeaderContext.Provider value={requiredData}>
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
