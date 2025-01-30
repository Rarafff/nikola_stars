import React, { useState } from "react";
import yellowList from "../assets/yellow-list.svg";
import registerIcon from "../assets/register-icon.svg";

const RefactorRegisterCard = () => {
  const [formData, setFormData] = useState({
    rfid_uid: "Waiting for RFID card...",
    name: "",
    stars: 0,
  });

  const yellowLines = Array(8).fill(null);

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
      const response = await fetch("http://192.168.5.200:8000/api/students/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Card registered successfully!");
        setFormData({
          rfid_uid: "Waiting for RFID card...",
          name: "",
          stars: 0,
        });
      }
    } catch (error) {
      console.error("Error registering card:", error);
      alert("Failed to register card");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>
          REGISTER NEW CARD{" "}
          <img src={registerIcon} alt="" style={styles.registerIcon} />
        </h2>
        <div style={styles.registerCard}>
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
          <div style={styles.cardHeader}>
          </div>
          <div style={styles.formContainer}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>RFID UID</label>
                <input
                  type="text"
                  name="rfid_uid"
                  value={formData.rfid_uid}
                  onChange={handleChange}
                  style={styles.input}
                  disabled
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="....."
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>STARS</label>
                <input
                  type="number"
                  name="stars"
                  value={formData.stars}
                  onChange={handleChange}
                  style={styles.input}
                  min="0"
                />
              </div>

              <button type="submit" style={styles.registerButton}>
                Register Card
              </button>
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
    padding: "40px",
    overflow: "hidden",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    height: "calc(100vh - 80px)",
    overflow: "hidden",
  },
  title: {
    color: "#FFFFFF",
    fontSize: "2.5rem",
    textAlign: "center",
    fontFamily: '"Press Start 2P", cursive',
    marginBottom: "40px",
    marginTop: "12vh",
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
  registerIcon: {
    width: "50px",
    height: "50px",
  },
  registerCard: {
    backgroundColor: "#FFF7DC",
    borderRadius: "20px",
    padding: "0",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    border: "4px solid #FF8551",
    width: "90%",
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
    padding: "20px",
    borderRadius: "15px 15px 0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    width: "30px",
    height: "30px",
    filter: "brightness(0) invert(1)",
  },
  formContainer: {
    padding: "20px 30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",
  },
  label: {
    color: "#FFB700",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "1rem",
    minWidth: "120px",
    textAlign: "left",
  },
  input: {
    flex: 1,
    padding: "12px 15px",
    borderRadius: "25px",
    border: "2px solid #FF8551",
    backgroundColor: "white",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "0.9rem",
    color: "#FF8551",
    outline: "none",
    "&::placeholder": {
      color: "#FFB69E",
    },
    "&:disabled": {
      backgroundColor: "#f5f5f5",
      cursor: "not-allowed",
    },
  },
  registerButton: {
    backgroundColor: "#FF8551",
    color: "white",
    border: "none",
    borderRadius: "25px",
    padding: "12px",
    cursor: "pointer",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "0.9rem",
    marginTop: "15px",
    marginLeft: "auto",
    minWidth: "200px",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
};

export default RefactorRegisterCard;
