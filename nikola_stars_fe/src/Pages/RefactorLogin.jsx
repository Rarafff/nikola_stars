import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import yellowList from "../assets/yellow-list.svg";

const RefactorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://192.168.5.200:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/admin");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  const yellowLines = Array(8).fill(null);

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Nikola Stars | Login</title>
      </Helmet>
      <div style={styles.content}>
        <div style={styles.welcomeText}>
          <h1 style={styles.title}>WELCOME BACK!!</h1>
          <p style={styles.subtitle}>Sign in to manage your star tracker.</p>
        </div>
        <div style={styles.loginCard}>
          <div style={styles.yellowListContainer}>
            {yellowLines.map((_, index) => (
              <img
                key={index}
                src={yellowList}
                alt=""
                style={styles.yellowList}
              />
            ))}
          </div>
          <div style={styles.cardHeader}></div>
          <div style={styles.formContainer}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="....."
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="....."
                />
              </div>

              <div style={styles.buttonContainer}>
                <button type="submit" style={styles.loginButton}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "250px",
    alignItems: "center",
    gap: "20px",
    maxWidth: "500px",
    width: "100%",
  },
  welcomeText: {
    textAlign: "center",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    color: "#FFFFFF",
    fontSize: "2.5rem",
    textAlign: "center",
    fontFamily: '"Press Start 2P", cursive',
    marginBottom: "0",
    marginTop: "4vh",
    whiteSpace: "nowrap",
    textShadow: `
      2px 2px 0 #FDBA00,
      -2px -2px 0 #FDBA00,
      2px -2px 0 #FDBA00,
      -2px 2px 0 #FDBA00,
      0 2px 0 #FDBA00,
      2px 0 0 #FDBA00,
      0 -2px 0 #FDBA00,
      -2px 0 0 #FDBA00,
      4px 4px 0 #FDBA00,
      -4px -4px 0 #FDBA00,
      4px -4px 0 #FDBA00,
      -4px 4px 0 #FDBA00,
      0 4px 0 #FDBA00,
      4px 0 0 #FDBA00,
      0 -4px 0 #FDBA00,
      -4px 0 0 #FDBA00,
      0 0 10px rgba(255, 217, 61, 1),
      0 0 20px rgba(255, 217, 61, 0.5),
      0 0 30px rgba(255, 217, 61, 0.3)
    `,
    WebkitTextStroke: "2px #FDBA00",
  },
  subtitle: {
    color: "#FFFFFF",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "1rem",
    textShadow: `
      2px 2px 0 #FDBA00,
      -2px -2px 0 #FDBA00,
      2px -2px 0 #FDBA00,
      -2px 2px 0 #FDBA00,
      0 2px 0 #FDBA00,
      2px 0 0 #FDBA00,
      0 -2px 0 #FDBA00,
      -2px 0 0 #FDBA00,
      0 0 10px rgba(255, 217, 61, 0.8),
      0 0 15px rgba(255, 217, 61, 0.5)
    `,
    WebkitTextStroke: "1px #FDBA00",
  },
  loginCard: {
    backgroundColor: "#FFF7DC",
    borderRadius: "20px",
    padding: "0",
    border: "4px solid #FF8551",
    width: "100%",
    maxWidth: "900px",
    position: "relative",
    overflow: "visible",
  },
  yellowListContainer: {
    display: "flex",
    justifyContent: "space-around",
    position: "absolute",
    top: "-20px",
    left: "-10px",
    right: "-10px",
    zIndex: 2,
  },
  yellowList: {
    width: "30px",
    height: "40px",
    objectFit: "contain",
    filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.2))",
    transform: "translateY(-5px)",
  },
  cardHeader: {
    backgroundColor: "#FF8551",
    padding: "30px",
    borderRadius: "15px 15px 0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    padding: "20px 30px",
  },
  loginIcon: {
    width: "50px",
    height: "50px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    color: "#FFFFFF",
    textShadow: `
      2px 2px 0 #FDBA00,
      -2px -2px 0 #FDBA00,
      2px -2px 0 #FDBA00,
      -2px 2px 0 #FDBA00,
      0 2px 0 #FDBA00,
      2px 0 0 #FDBA00,
      0 -2px 0 #FDBA00,
      -2px 0 0 #FDBA00,
      4px 4px 0 #FDBA00,
      -4px -4px 0 #FDBA00,
      4px -4px 0 #FDBA00,
      -4px 4px 0 #FDBA00,
      0 4px 0 #FDBA00,
      4px 0 0 #FDBA00,
      0 -4px 0 #FDBA00,
      -4px 0 0 #FDBA00,
      0 0 10px rgba(255, 217, 61, 1),
      0 0 20px rgba(255, 217, 61, 0.5),
      0 0 30px rgba(255, 217, 61, 0.3)
    `,
    fontSize: "0.8rem",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "50px",
    border: "3px solid #FF8551",
    backgroundColor: "white",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "0.8rem",
    color: "#FF8551",
    "&::placeholder": {
      color: "#FFB69E",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#FF8551",
    color: "white",
    border: "none",
    borderRadius: "50px",
    padding: "12px 50px",
    cursor: "pointer",
    fontSize: "0.8rem",
    transition: "transform 0.2s",
    minWidth: "150px",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
};

export default RefactorLogin;
