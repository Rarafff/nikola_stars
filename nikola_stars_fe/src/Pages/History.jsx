import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const StarsLog = ({ studentId = null }) => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

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
      setError("Error connecting to the server.", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [studentId]);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <div className="text-center mb-4">
        <h2 className="mb-3">Stars History</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      {logs.length > 0 ? (
        <div style={{ maxWidth: "800px", width: "100%" }}>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th></th>
                <th>Student</th>
                <th>Change</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={log.id}>
                  <td>{index + 1}</td>
                  <td>{log.student.name}</td>
                  <td>
                    {log.stars_change > 0
                      ? `+${log.stars_change}`
                      : log.stars_change}
                  </td>
                  <td>{log.description}</td>
                  <td>{new Date(log.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p className="text-center">No history available.</p>
      )}
    </div>
  );
};

export default StarsLog;
