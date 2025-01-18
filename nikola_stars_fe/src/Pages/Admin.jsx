import { useNavigate, Navigate } from "react-router-dom";
import StudentTable from "../Components/StudentTable";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");

      if (token) {
        try {
          if (token.length > 0) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Token validation error:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <Helmet>
        <title>Nikola Stars | Admin</title>
      </Helmet>
      <h1>Student List</h1>
      <StudentTable />
      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/register-card")}
      >
        Register Card
      </button>
    </div>
  );
};

export default Admin;
