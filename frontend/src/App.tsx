import SideBar from "./components/sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Presensi from "./pages/presensi";
import Tentang from "./pages/tentang";
import Gallery from "./pages/gallery";
import Pengaturan from "./pages/pengaturan";
import Login from "./pages/login";
import Register from "./pages/register";
import HeaderProvider from "./api/headerContext";
import { Toaster } from "react-hot-toast";
import PasswordChange from "./pages/passwordchange";

const App = () => {
  return (
    <Router>
      <HeaderProvider>
        <Routes>
          <Route
            element={
              <>
                <SideBar />
                <Home /> <Toaster />
              </>
            }
            path="/"
          />
          <Route
            element={
              <>
                <SideBar /> <Presensi /> <Toaster />{" "}
              </>
            }
            path="/presensi"
          />
          <Route
            element={
              <>
                <SideBar /> <Gallery /> <Toaster />{" "}
              </>
            }
            path="/galeri"
          />
          <Route
            element={
              <>
                <SideBar /> <Tentang /> <Toaster />
              </>
            }
            path="/tentang"
          />
          <Route
            element={
              <>
                <SideBar /> <Pengaturan /> <Toaster />
              </>
            }
            path="/pengaturan"
          />
          <Route
            element={
              <>
                <SideBar /> <PasswordChange /> <Toaster />
              </>
            }
            path="/pengaturan/password"
          />
          <Route
            element={
              <>
                <Login /> <Toaster />
              </>
            }
            path="/login"
          />
          <Route
            element={
              <>
                <Register /> <Toaster />
              </>
            }
            path="/register"
          />
        </Routes>
      </HeaderProvider>
    </Router>
  );
};

export default App;
