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
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-grow text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container py-4">
      <Helmet>
        <title>Nikola Stars | Admin</title>
      </Helmet>

      <div className="text-center mb-5">
        <h1 style={{
          background: 'linear-gradient(45deg, #FF6B6B, #FFB84C)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          Student List 📚
        </h1>
      </div>

      <div style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <StudentTable />
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-lg"
          onClick={() => navigate("/register-card")}
          style={{
            background: 'linear-gradient(45deg, #4CAF50, #81C784)',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '25px',
            boxShadow: '0 4px 15px rgba(76,175,80,0.3)',
            transition: 'all 0.3s ease',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(76,175,80,0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(76,175,80,0.3)';
          }}
        >
          ✨ Register New Card
        </button>
      </div>
    </div>
  );
};

export default Admin;
