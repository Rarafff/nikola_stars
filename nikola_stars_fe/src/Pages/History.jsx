import { useState, useEffect } from "react";
import { Table, Container, Spinner } from "react-bootstrap";

const StarsLog = ({ studentId = null }) => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const endpoint = studentId
        ? `http://192.168.5.200:8000/api/stars-log/${studentId}/`
        : `http://192.168.5.200:8000/api/stars-log/`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      } else {
        setError("Failed to fetch stars history.");
      }
    } catch (error) {
      setError("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [studentId]);

  if (loading) {
    return (
      <Container className="loading-container">
        <Spinner animation="grow" variant="warning" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="error-container">
        <h3>😢 Oops!</h3>
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container fluid className="history-container">
      <div className="history-header">
        <h2>✨ Stars History</h2>
        <p className="history-subtitle">Track all star changes</p>
      </div>

      {logs.length > 0 ? (
        <div className="table-container">
          <Table responsive hover className="history-table">
            <thead>
              <tr>
                <th className="number-column">#</th>
                <th className="student-column">Student</th>
                <th className="change-column">Change</th>
                <th className="description-column">Description</th>
                <th className="date-column">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={log.id}>
                  <td className="number-column">{index + 1}</td>
                  <td className="student-column">{log.student.name}</td>
                  <td className={`change-column ${log.stars_change > 0 ? 'positive-change' : 'negative-change'}`}>
                    {log.stars_change > 0 ? (
                      <span>+{log.stars_change} ⭐</span>
                    ) : (
                      <span>{log.stars_change} ⭐</span>
                    )}
                  </td>
                  <td className="description-column">{log.description}</td>
                  <td className="date-column">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="empty-state">
          <h3>📝 No History Available</h3>
          <p>Star changes will appear here</p>
        </div>
      )}
    </Container>
  );
};

export default StarsLog;