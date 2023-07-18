import SideBar from "./components/sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Presensi from "./pages/presensi";
import Tentang from "./pages/tentang";

const App = () => {
  return (
    <Router>
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
        <Route element={<SideBar />} path="/galeri" />
        <Route
          element={
            <>
              <SideBar /> <Tentang />
            </>
          }
          path="/tentang"
        />
      </Routes>
    </Router>
  );
};

export default App;
