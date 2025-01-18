import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/main.css";
import MainNavbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";
import RegisterCard from "./Pages/RegisterCard";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import History from "./Pages/History";

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

  return (
    <div>
      <BrowserRouter>
        <Helmet>Nikola Stars</Helmet>
        <MainNavbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/history" element={<History />} />
          <Route path="/register-card" element={<RegisterCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
