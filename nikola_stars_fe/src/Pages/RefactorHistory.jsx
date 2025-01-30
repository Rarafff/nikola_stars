import historyIcon from "../assets/history-icon.svg";
import yellowList from "../assets/yellow-list.svg";

const RefactorHistory = () => {
  const dummyHistories = [
    {
      id: 1,
      student_name: "Winly",
      star_change: -100,
      description: "Stars decreased by 100 (from 200 to 100)",
      created_at: "2023-12-20T12:50:55",
    },
    {
      id: 2,
      student_name: "Jesse",
      star_change: +2,
      description: "Stars increased by 1 (from 1 to 2)",
      created_at: "2023-12-20T12:50:55",
    },
    {
      id: 3,
      student_name: "Dian",
      star_change: 0,
      description: "Name changed from 'Dian Viola' to 'Dian'",
      created_at: "2023-12-20T12:50:55",
    },
    {
      id: 4,
      student_name: "Alvin",
      star_change: 0,
      description: "Name changed from 'Alvine' to 'Alvin'",
      created_at: "2023-12-20T12:50:55",
    },
    {
      id: 5,
      student_name: "Jason",
      star_change: -5,
      description: "Stars decreased by 5 (from 50 to 45)",
      created_at: "2023-12-20T12:50:55",
    },
    {
      id: 6,
      student_name: "Jason",
      star_change: -5,
      description: "Stars decreased by 5 (from 50 to 45)",
      created_at: "2023-12-20T12:50:55",
    },
    {
      id: 7,
      student_name: "Jason",
      star_change: -5,
      description: "Stars decreased by 5 (from 50 to 45)",
      created_at: "2023-12-20T12:50:55",
    },
    {
      id: 8,
      student_name: "Jason",
      star_change: -5,
      description: "Stars decreased by 5 (from 50 to 45)",
      created_at: "2023-12-20T12:50:55",
    },
  ];

  const yellowLines = Array(8).fill(null);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>
          STAR HISTORY{" "}
          <img src={historyIcon} alt="" style={styles.historyIcon} />
        </h2>
        <div style={styles.historyCard}>
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
          <div style={styles.starsList}>
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={{ ...styles.th, width: "5%" }}>No</th>
                  <th style={{ ...styles.th, width: "10%" }}>Name</th>
                  <th style={{ ...styles.th, width: "10%" }}>Change</th>
                  <th style={{ ...styles.th, width: "30%" }}>Description</th>
                  <th style={{ ...styles.th, width: "20%" }}>Date</th>
                </tr>
              </thead>
            </table>
            <div style={styles.tableBody} className="custom-scrollbar">
              <table style={styles.table}>
                <tbody>
                  {dummyHistories.map((history, index) => (
                    <tr key={index} style={styles.tr}>
                      <td style={{ ...styles.td, width: "5%" }}>
                        {index + 1}.
                      </td>
                      <td style={{ ...styles.td, width: "10%" }}>
                        {history.student_name}
                      </td>
                      <td style={{ ...styles.td, width: "10%" }}>
                        <span
                          style={{
                            color:
                              history.star_change > 0
                                ? "#4CAF50"
                                : history.star_change < 0
                                ? "#FF0000"
                                : "#000000",
                          }}
                        >
                          {history.star_change > 0
                            ? `+${history.star_change}`
                            : history.star_change}
                          ⭐
                        </span>
                      </td>
                      <td style={{ ...styles.td, width: "30%" }}>
                        {history.description}
                      </td>
                      <td style={{ ...styles.td, width: "20%" }}>
                        {new Date(history.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
    padding: "40px",
    overflow: "hidden",
    "@media (max-width: 768px)": {
      padding: "20px",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    height: "calc(100vh - 80px)",
    overflow: "hidden",
    "@media (max-width: 768px)": {
      height: "auto",
      padding: "10px",
    },
  },
  historyIcon: {
    width: "50px",
    height: "50px",
    "@media (max-width: 768px)": {
      width: "40px",
      height: "40px",
    },
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
    "@media (max-width: 768px)": {
      fontSize: "2rem",
      marginTop: "8vh",
      marginBottom: "20px",
    },
  },
  historyCard: {
    backgroundColor: "#FFF7DC",
    borderRadius: "20px",
    padding: "0",
    width: "90%",
    maxWidth: "1200px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    border: "4px solid #FF8551",
    maxHeight: "calc(70vh - 100px)",
    position: "relative",
    overflow: "visible",
    "@media (max-width: 768px)": {
      width: "100%",
      maxHeight: "none",
    },
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
  tableHeader: {
    backgroundColor: "#FF8551",
    width: "100%",
  },
  tableBody: {
    overflowY: "auto",
    flex: 1,
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
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 0px",
    fontFamily: '"Press Start 2P", cursive',
    tableLayout: "fixed",
    "@media (max-width: 768px)": {
      tableLayout: "auto",
    },
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
    "@media (max-width: 768px)": {
      fontSize: "0.6rem",
      padding: "10px 5px",
    },
  },
  tr: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  td: {
    padding: "15px 10px",
    fontSize: "0.6rem",
    borderBottom: "2px dashed #FF8551",
    whiteSpace: "nowrap",
    "@media (max-width: 768px)": {
      fontSize: "0.5rem",
      padding: "10px 5px",
    },
  },
};

export default RefactorHistory;
