import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";

const Leaderboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://192.168.5.200:8000/api/students/")
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

  const styles = {
    container: {
      padding: "20px 15px",
    },
    headerContainer: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    mainTitle: {
      background: "linear-gradient(45deg, #FF6B6B, #FFB84C)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
      fontWeight: "bold",
      marginBottom: "15px",
      padding: "0 10px",
    },
    subTitle: {
      color: "#4CAF50",
      fontSize: "clamp(1.2rem, 4vw, 2rem)",
      fontWeight: "bold",
    },
    tableContainer: {
      background: "#fff",
      borderRadius: "20px",
      padding: "15px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      overflowX: "auto",
    },
    tableHeader: {
      background: "linear-gradient(45deg, #fff3e0, #FFE4E1)",
      position: "sticky",
      top: 0,
      zIndex: 1,
    },
    indexCell: {
      width: "80px",
      fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
      textAlign: "center",
      color: "#666",
    },
    starCell: {
      width: "calc(100% - 80px)",
      fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
      textAlign: "center",
    },
  };

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

  return (
    <Container fluid style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.mainTitle}>
          Welcome to Nikola Academy Star Tracker! 🌟
        </h1>
        <h2 style={styles.subTitle}>⭐ Star Collection Board ⭐</h2>
      </div>

      <div style={styles.tableContainer} className="custom-scrollbar">
        <Table responsive hover className="leaderboard-table mb-0">
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.indexCell}>No.</th>
              <th style={styles.starCell}>Stars Collected</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td style={styles.indexCell}>{index + 1}</td>
                <td style={styles.starCell}>
                  <span className="star-count">⭐ {student.stars || 0}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Leaderboard;