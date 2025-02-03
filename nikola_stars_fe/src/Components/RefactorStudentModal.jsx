import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import yellowList from "../assets/yellow-list.svg";
import star from "../assets/star.svg";

const RefactorStudentModal = ({ rfid, show, onClose }) => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [maxTime, setMaxTime] = useState(15);

  useEffect(() => {
    if (show && rfid) {
      fetchStudentData(rfid);
    }
  }, [show, rfid]);

  useEffect(() => {
    if (show) {
      let duration = student ? 15 : 5;
      setCountdown(duration);
      setMaxTime(duration); 

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [show, student]);

  const fetchStudentData = async (uid) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://server.nikolaacademy.com:8000/api/rfid/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid }),
      });

      const data = await response.json();

      if (response.ok && data.student) {
        setStudent(data.student);
        setCountdown(15);
        setMaxTime(15);
      } else {
        setStudent(null);
        setError("This card is not registered 😅");
        setCountdown(5);
        setMaxTime(5);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      setError("Failed to connect to the server.");
      setCountdown(5);
      setMaxTime(5);
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Nikola Stars | Student Info</title>
      </Helmet>
      <div style={styles.content}>
        <div style={styles.loginCard}>
          <div style={styles.yellowListContainer}>
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <img key={index} src={yellowList} alt="" style={styles.yellowList} />
              ))}
          </div>
          <div style={styles.cardHeader}>
            {isLoading ? "Loading..." : student ? `HELLO, ${student.name}` : "OOPS!"}
          </div>
          <div style={styles.formContainer}>
            <div style={styles.form}>
              {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
              {student && (
                <div className="modal-text-container">
                  <p style={styles.stars}>You have...</p>
                  <div style={styles.stars}>
                    <span style={styles.starCount}>{student?.stars || 0}</span>
                    <img src={star} alt="star" style={styles.starIcon} />
                  </div>
                </div>
              )}
              <div className="progress" style={{ height: "10px", marginBottom: "15px" }}>
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{
                    width: `${(countdown / maxTime) * 100}%`,
                    backgroundColor: "#FF8551",
                  }}
                ></div>
              </div>

              <div style={styles.buttonContainer}>
                <button type="button" style={styles.loginButton} onClick={onClose}>
                  Ok
                </button>
              </div>
            </div>
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
    marginLeft: "250px",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "700px",
    width: "100%",
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
    color: "#FF8548",
    textShadow: `
      2px 2px 0 #FFF,
      -2px -2px 0 #FFF,
      2px -2px 0 #FFF,
      -2px 2px 0 #FFF,
      0 2px 0 #FFF,
      2px 0 0 #FFF,
      0 -2px 0 #FFF,
      -2px 0 0 #FFF,
      0 0 8px rgba(255, 255, 255, 0.8)
    `,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  formContainer: {
    padding: "20px 30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  stars: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: "bold",
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
  },
  starCount: {
    marginRight: "10px",
  },
  starIcon: {
    width: "40px",
    height: "40px",
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

export default RefactorStudentModal;
