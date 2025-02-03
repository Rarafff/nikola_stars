import { useEffect, useState } from "react";
import historyIcon from "../assets/history-icon.svg";
import yellowList from "../assets/yellow-list.svg";

const RefactorHistory = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(
          "http://server.nikolaacademy.com:8000/api/stars-log/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch star history");
        }

        const data = await response.json();
        setLogs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>
          STAR HISTORY{" "}
          <img src={historyIcon} alt="" style={styles.historyIcon} />
        </h2>
        <div style={styles.historyCard}>
          <div style={styles.yellowListContainer}>
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <img
                  key={index}
                  src={yellowList}
                  alt=""
                  style={styles.yellowList}
                />
              ))}
          </div>
          <div style={styles.starsList}>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <>
                {/* Table Header (outside the scrollable container) */}
                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead style={styles.tableHeader}>
                      <tr>
                        <th style={{ ...styles.th, width: "5%" }}>No</th>
                        <th style={{ ...styles.th, width: "10%" }}>Name</th>
                        <th style={{ ...styles.th, width: "10%" }}>Change</th>
                        <th style={{ ...styles.th, width: "30%" }}>
                          Description
                        </th>
                        <th style={{ ...styles.th, width: "20%" }}>Date</th>
                      </tr>
                    </thead>
                  </table>
                  {/* Scrollable Table Body */}
                  <div style={styles.tableBody}>
                    <table style={styles.table}>
                      <tbody>
                        {logs.map((log, index) => (
                          <tr key={log.id} style={styles.tr}>
                            <td style={{ ...styles.td, width: "5%" }}>
                              {index + 1}.
                            </td>
                            <td style={{ ...styles.td, width: "10%" }}>
                              {log.student.name}
                            </td>
                            <td
                              style={{
                                ...styles.td,
                                width: "10%",
                                color:
                                  log.stars_change > 0 ? "#4CAF50" : "#FF0000",
                              }}
                            >
                              {log.stars_change > 0
                                ? `+${log.stars_change}`
                                : log.stars_change}{" "}
                              ⭐
                            </td>
                            <td style={{ ...styles.td, width: "30%" }}>
                              <div style={styles.descriptionContainer}>
                                <span style={styles.scrollingText}>
                                  {log.description}
                                </span>
                              </div>
                            </td>
                            <td style={{ ...styles.td, width: "20%" }}>
                              {new Date(log.created_at).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
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
  historyIcon: {
    width: "50px",
    height: "50px",
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
  historyCard: {
    backgroundColor: "#FFF7DC",
    borderRadius: "20px",
    padding: "0",
    width: "100%",
    maxWidth: "1300px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    border: "4px solid #FF8551",
    maxHeight: "calc(70vh - 100px)",
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
  starsList: {
    height: "100%",
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: "0",
    tableLayout: "fixed",
  },
  tableHeader: {
    backgroundColor: "#FF8551",
    position: "sticky",
    top: 0,
    zIndex: 2,
  },
  th: {
    backgroundColor: "#FF8551",
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
    padding: "15px 10px",
    textAlign: "left",
    fontSize: "0.8rem",
    position: "relative",
    width: "auto",
  },
  tr: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  td: {
    padding: "15px 10px",
    fontSize: "0.6rem",
    borderBottom: "2px dashed #FF8551",
    whiteSpace: "nowrap", 
    overflow: "hidden",
    textOverflow: "ellipsis",
    position: "relative",
    maxWidth: "250px", 
  },
  descriptionContainer: {
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    position: "relative",
    maxWidth: "100%",
  },
  scrollingText: {
    display: "inline-block",
    whiteSpace: "nowrap",
    animation: "scrollText 10s linear infinite",
  },
  
  tableContainer: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    border: "2px solid #FF8551",
    borderRadius: "10px",
  },
  tableBody: {
    maxHeight: "300px",
    overflowY: "auto",
    display: "block",
    width: "100%",
    paddingBottom: "1px",
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
    scrollbarWidth: "thin",
    scrollbarColor: "#FF8551 #FFF7DC",
  },
};

export default RefactorHistory;
