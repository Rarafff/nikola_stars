import Sidebar from "../Components/Sidebar";
import yellowList from "../assets/yellow-list.svg";
import star from "../assets/star.svg";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const RefactorLeaderboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://server.nikolaacademy.com:8000/api/students/")
      .then((response) => response.json())
      .then((data) => {
        const sortedStudents = data.sort((a, b) => b.stars - a.stars);
        setStudents(sortedStudents);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data", err);
        setLoading(false);
      });
  }, []);

  const yellowLines = Array(8).fill(null);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-grow text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center py-5">
        <h2 style={{ color: "#FF6B6B" }}>😢 {error}</h2>
      </Container>
    );
  }

  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0) + "*".repeat(name.length - 1);
  };

  return (
    <div className="leaderboard-container" style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h1 style={styles.title}>
          WELCOME TO
          <br />
          NIKOLA ACADEMY
          <br />
          STAR TRACKER!
        </h1>

        <div style={styles.leaderboardCard}>
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
          <div style={styles.cardHeader}>Leaderboard</div>
          <div style={styles.starsList} className="stars-list">
            {students.map((student, index) => (
              <div key={student.id} style={styles.starItem}>
                <span style={styles.number}>{`${index + 1}.`}</span>
                <div style={styles.studentInfo}>
                  <div style={styles.name}>{formatName(student.name)}</div>
                  <div style={styles.stars}>
                    <img src={star} alt="star" style={styles.starIcon} />
                    <span style={styles.starCount}>{student.stars}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    marginLeft: "250px",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    height: "100vh",
  },
  starIcon: {
    width: "24px",
    height: "24px",
  },
  title: {
    color: "#FFFFFF",
    fontSize: "2.5rem",
    textAlign: "center",
    fontFamily: '"Press Start 2P", cursive',
    marginBottom: "40px",
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
    lineHeight: "1.5",
    WebkitTextStroke: "2px #FDBA00",
  },
  leaderboardCard: {
    backgroundColor: "#FFF7DC",
    borderRadius: "20px",
    padding: "0 0 20px 0",
    width: "80%",
    maxWidth: "900px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    border: "4px solid #FF8551",
    maxHeight: "50vh",
    overflow: "visible",
    position: "relative",
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
    color: "#FF8548",
    padding: "20px 10px",
    borderRadius: "15px 15px 0 0",
    textAlign: "center",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "1.2rem",
    marginBottom: "10px",
    position: "relative",
    zIndex: 1,
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
  },
  starsList: {
    maxHeight: "calc(50vh - 100px)",
    overflowY: "auto",
    paddingRight: "10px",
    position: "relative",
    zIndex: 1,
    "&::-webkit-scrollbar": {
      width: "12px",
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#FF8551",
      borderRadius: "20px",
      border: "4px solid #FFF7DC",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#FFF7DC",
      borderRadius: "20px",
    },
  },
  starItem: {
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "1.5rem",
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
    padding: "10px 30px",
    borderBottom: "2px dashed #FDBA00",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  number: {
    position: "absolute",
    left: "30px",
  },
  studentInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "0 20px",
  },
  name: {
    flex: 1,
    textAlign: "center",
    minWidth: "120px",
    fontSize: "1.2rem",
    color: "#FFFFFF",
    fontFamily: '"Press Start 2P", cursive',
  },
  stars: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: "80px",
    justifyContent: "flex-end",
  },
  starCount: {
    fontSize: "1.2rem",
    color: "#FFFFFF",
    fontFamily: '"Press Start 2P", cursive',
  },
};

export default RefactorLeaderboard;
