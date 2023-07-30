import {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios, { AxiosResponse } from "axios";
import api from "./axios";
import { DataUser } from "../components/type";
import { useLocation, useNavigate } from "react-router-dom";

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

  const location = useLocation();
  const navigate = useNavigate();

  const path = useCallback(
    (pathName: string) => {
      return location.pathname === pathName;
    },
    [location.pathname]
  );

  useEffect(() => {
    axios
      .get<SetStateAction<Weather | undefined>>(
        import.meta.env.VITE_WEATHER_API as string
      )
      .then((res: AxiosResponse<SetStateAction<Weather | undefined>>): void =>
        setWeather(res.data)
      )
      .catch((err: { response: { data: { message: string } } }) =>
        console.log(err.response.data.message)
      );
  }, []);

  useEffect(() => {
    if (path("/login") || path("/register")) return;
    api
      .get<{ session: DataUser }>("/login")
      .then(
        (res: AxiosResponse<{ session: DataUser }>) =>
          res.data && setAcc(res.data.session)
      )
      .catch((err: { response: { data: { message: string } } }) => {
        console.log(err.response.data.message);
        return navigate("/login");
      });
  }, [navigate, path]);

  const icon =
    (import.meta.env.VITE_ICONS_WEATHER_API as string) +
    (weather?.weather[0].icon as string) +
    ".png";

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
