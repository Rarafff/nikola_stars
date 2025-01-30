import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/main.css";
import "./style/style.css";
// import MainNavbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";
import RegisterCard from "./Pages/RegisterCard";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import History from "./Pages/History";
import RefactorNavbar from "./Components/RefactorNavbar";
import Sidebar from "./Components/Sidebar";
import RefactorAdmin from "./Pages/RefactorAdmin";
import RefactorLogin from "./Pages/RefactorLogin";
import RefactorHistory from "./Pages/RefactorHistory";
import RefactorRegisterCard from "./Pages/RefactorRegisterCard";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      const tokenExpiryTimer = setInterval(() => {
        console.log("Token expired, logging out...");
        localStorage.removeItem("access_token");
      }, 3600000);

      return () => clearInterval(tokenExpiryTimer);
    }
  }, []);

  const Navigation = () => {
    const location = useLocation();
    const path = location.pathname;

    if (path === "/" || path === "/login") {
      return <Sidebar />;
    }
    return <RefactorNavbar />;
  };

  return (
    <div>
      <BrowserRouter>
        <Helmet>Nikola Stars</Helmet>
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<RefactorLogin />} />
          <Route path="/admin" element={<RefactorAdmin />} />
          <Route path="/history" element={<RefactorHistory />} />
          <Route path="/register-card" element={<RefactorRegisterCard />} />
          <Route path="/test" element={<RefactorRegisterCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
