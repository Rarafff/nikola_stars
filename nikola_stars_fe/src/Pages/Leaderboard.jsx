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

  if (loading) {
    return (
      <Container>
        <div className="d-flex justify-content-center">
          <h1>Loading...</h1>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="d-flex justify-content-center">
          <h1>{error}</h1>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <h1>Welcome to Nikola Academy Star Tracker</h1>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <h2>Leaderboard</h2>
      </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.stars || 0}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Leaderboard;
