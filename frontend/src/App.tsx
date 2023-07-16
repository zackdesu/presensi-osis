import SideBar from "./components/sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";

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
        <Route element={<SideBar />} path="/presensi" />
        <Route element={<SideBar />} path="/cari" />
        <Route element={<SideBar />} path="/tentang" />
      </Routes>
    </Router>
  );
};

export default App;
