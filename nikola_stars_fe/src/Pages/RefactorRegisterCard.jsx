import { useState, useEffect } from "react";
import yellowList from "../assets/yellow-list.svg";
import registerIcon from "../assets/register-icon.svg";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const RefactorRegisterCard = () => {
  const [rfid, setRfid] = useState("Waiting for RFID Card...");
  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const [photoUrl, setPhotoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [rfidExists, setRfidExists] = useState(false);

  const navigate = useNavigate();

  const checkIfRFIDExists = async (uid) => {
    if (!uid) return;

    try {
      const response = await fetch(
        `http://server.nikolaacademy.com:8000/api/student/${uid}/`
      );
      if (response.status === 200) {
        setRfidExists(true);
        setMessage("This RFID UID is already registered.");
      } else if (response.status === 404) {
        setRfidExists(false);
        setMessage("This RFID UID is available for registration.");
      } else {
        setRfidExists(false);
        setMessage("Error checking RFID status.");
      }
    } catch (error) {
      console.error("Error checking RFID UID:", error);
      setMessage("Error checking RFID UID.");
    }
  };

  const fetchLatestRFID = async () => {
    try {
      const response = await fetch(
        "http://server.nikolaacademy.com:8000/api/latest-rfid/"
      );
      if (response.status === 200) {
        const data = await response.json();
        if (data.uid) {
          setRfid(data.uid);
          checkIfRFIDExists(data.uid);
        }
      } else if (response.status === 204) {
        setRfid("Waiting for RFID Card...");
        setMessage("No RFID card detected.");
      }
    } catch (error) {
      console.error("Error fetching RFID:", error);
    }
  };

  const clearRFID = async () => {
    try {
      await fetch("http://server.nikolaacademy.com:8000/api/clear-rfid/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (error) {
      console.error("Error clearing RFID:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchLatestRFID, 2000);

    return () => {
      clearInterval(interval);
      clearRFID();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rfid || !name) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (rfidExists) {
      setMessage("This RFID UID is already registered.");
      return;
    }

    try {
      const response = await fetch(
        "http://server.nikolaacademy.com:8000/api/register-card/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            rfid_id: rfid,
            name: name,
            stars: stars,
            photo_url: photoUrl,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        Swal.fire("Card registered successfully!");
        setRfid("");
        setName("");
        setStars(0);
        setPhotoUrl("");
        clearRFID();
        navigate("/");
      } else {
        setMessage(data.error || "An error occurred");
      }
    } catch (error) {
      setMessage("Network error occurred");
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Nikola Stars | Register</title>
      </Helmet>
      <div style={styles.content}>
        <h2 style={styles.title}>
          REGISTER NEW CARD{" "}
          <img src={registerIcon} alt="" style={styles.registerIcon} />
        </h2>
        <div style={styles.registerCard}>
          <div style={styles.yellowListContainer}>
            {[...Array(8)].map((_, index) => (
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
                <label style={styles.label}>RFID UID</label>
                <input
                  type="text"
                  value={rfid}
                  disabled
                  style={styles.input}
                  readOnly
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  value={name}
                  placeholder="Your name here..."
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>STARS</label>
                <input
                  type="number"
                  value={stars}
                  onChange={(e) => setStars(Number(e.target.value))}
                  style={styles.input}
                  min="0"
                />
              </div>
              <div className="alert-button-container">
                {message && (
                  <div
                    className={`alert-custom ${
                      rfidExists ? "alert-danger" : "alert-info"
                    }`}
                  >
                    {message}
                  </div>
                )}
                <button
                  type="submit"
                  style={{
                    ...styles.registerButton,
                    ...(rfidExists ? styles.disabledButton : {}),
                  }}
                  disabled={rfidExists}
                >
                  Register Card
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
    fontSize: "0.7rem",
    marginLeft: "auto",
    minWidth: "200px",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  disabledButton: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
    "&:hover": {
      transform: "none",
    },
  },
};

export default RefactorRegisterCard;
