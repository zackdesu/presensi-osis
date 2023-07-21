import SideBar from "./components/sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Presensi from "./pages/presensi";
import Tentang from "./pages/tentang";
import Gallery from "./pages/gallery";
import Bantuan from "./pages/bantuan";
import Login from "./pages/login";
import Register from "./pages/register";
import HeaderProvider from "./api/headerContext";

const App = () => {
  return (
    <Router>
      <HeaderProvider>
        <Routes>
          <Route
            element={
              <>
                <SideBar />
                <Home />
              </>
            }
            path="/"
          />
          <Route
            element={
              <>
                <SideBar /> <Presensi />{" "}
              </>
            }
            path="/presensi"
          />
          <Route
            element={
              <>
                <SideBar /> <Gallery />{" "}
              </>
            }
            path="/galeri"
          />
          <Route
            element={
              <>
                <SideBar /> <Tentang />
              </>
            }
            path="/tentang"
          />
          <Route
            element={
              <>
                <SideBar /> <Bantuan />
              </>
            }
            path="/bantuan"
          />
          <Route
            element={
              <>
                <Login />
              </>
            }
            path="/login"
          />
          <Route
            element={
              <>
                <Register />
              </>
            }
            path="/Register"
          />
        </Routes>
      </HeaderProvider>
    </Router>
  );
};

export default App;
