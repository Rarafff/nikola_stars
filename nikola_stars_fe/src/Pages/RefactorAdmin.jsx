import { useState, useEffect } from "react";
import RefactorStarModal from "../Components/RefactorStarModal";
import RefactorModifyStudentModal from "../Components/RefactorModifyStudentModal";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import studentList from "../assets/list-icon.svg";
import yellowList from "../assets/yellow-list.svg";
import star from "../assets/star.svg";

const RefactorAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const dummyStudents = [
    { id: 1, name: "Winly", stars: 10 },
    { id: 2, name: "Jesse", stars: 60 },
    { id: 3, name: "Dian", stars: 5 },
    { id: 4, name: "Alvin", stars: 35 },
    { id: 5, name: "Michael", stars: 25 },
    { id: 6, name: "Sarah", stars: 42 },
    { id: 7, name: "Kevin", stars: 15 },
    { id: 8, name: "Rachel", stars: 30 },
  ];

  // useEffect(() => {
  //   const checkAuth = () => {
  //     const token = localStorage.getItem("access_token");

  //     if (token) {
  //       try {
  //         if (token.length > 0) {
  //           setIsAuthenticated(true);
  //         } else {
  //           setIsAuthenticated(false);
  //         }
  //       } catch (error) {
  //         console.error("Token validation error:", error);
  //         setIsAuthenticated(false);
  //       }
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //     setIsLoading(false);
  //   };

  //   checkAuth();
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div
  //       className="d-flex justify-content-center align-items-center"
  //       style={{ minHeight: "100vh" }}
  //     >
  //       <div className="spinner-grow text-warning" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // }

  // if (isAuthenticated === false) {
  //   return <Navigate to="/login" />;
  // }

  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const handleOpenModifyModal = (student) => {
    setSelectedStudent(student);
    setIsModifyModalOpen(true);
  };

  const handleCloseModifyModal = () => {
    setSelectedStudent(null);
    setIsModifyModalOpen(false);
  };

  const handleSaveModify = (updatedData) => {
    // Update local state atau refresh data
    // Bisa tambahkan fetch untuk get data terbaru
  };

  const handleSaveStars = (newStarCount) => {
    // Update local state atau refresh data
    // Bisa tambahkan fetch untuk get data terbaru
  };

  const yellowLines = Array(10).fill(null);

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Nikola Stars | Admin</title>
      </Helmet>
      <div style={styles.cardHeader}>
        STUDENT LIST{" "}
        <img src={studentList} alt="" style={styles.studentListImage} />
      </div>
      <div style={styles.content}>
        <div style={styles.tableCard}>
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
                  <th style={styles.th}>No</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>STARS</th>
                  <th style={styles.th} className="dflex align-align-items-center justify-content-center">Editor</th>
                  <th style={styles.th}></th>
                </tr>
              </thead>
            </table>
            <div style={styles.tableBody}>
              <table style={styles.table}>
                <tbody>
                  {dummyStudents.map((student, index) => (
                    <tr key={student.id} style={styles.tr}>
                      <td style={styles.td}>{`${index + 1}.`}</td>
                      <td style={styles.td}>{student.name}</td>
                      <td style={styles.td}>
                        {student.stars} &nbsp;
                        <img
                          src={star}
                          alt="Star Icon"
                          style={styles.starIcon}
                        />
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.addButton}
                          onClick={() => handleOpenModal(student)}
                        >
                          + Bintang
                        </button>
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.editButton}
                          onClick={() => handleOpenModifyModal(student)}
                        >
                          Ubah
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <RefactorStarModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        student={selectedStudent}
        onSave={handleSaveStars}
      />
      <RefactorModifyStudentModal
        isOpen={isModifyModalOpen}
        onClose={handleCloseModifyModal}
        student={selectedStudent}
        onSave={handleSaveModify}
      />
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
  starIcon: {
    width: "25px", // Adjust size of the star icon
    height: "25px",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(80vh - 100px)",
    overflow: "hidden",
  },
  tableCard: {
    backgroundColor: "#FFF7DC",
    borderRadius: "20px",
    padding: "0",
    width: "90%",
    maxWidth: "1200px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    border: "4px solid #FF8551",
    position: "relative",
    maxHeight: "calc(100vh - 200px)",
    overflow: "visible",
    height: "auto",
  },
  studentListImage: {
    width: "40px",
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
    color: "white",
    borderRadius: "15px 15px 0 0",
    textAlign: "center",
    fontSize: "2.5rem",
    position: "relative",
    marginTop: "12vh",
    zIndex: 1,
    marginBottom: "10px",
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
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0px",
    position: "relative",
    tableLayout: "fixed",
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
    padding: "20px 7px",
    textAlign: "left",
    fontSize: "1.2rem",
    fontWeight: "normal",
    position: "relative",
  },
  tr: {
    backgroundColor: "transparent",
  },
  td: {
    padding: "15px",
    textAlign: "left",
    fontSize: "1.2rem",
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
    borderBottom: "2px dashed #FFB700",
  },
  starsList: {
    maxHeight: "calc(100vh - 300px)",
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
    scrollbarWidth: "thin",
    scrollbarColor: "#FF8551 #FFF7DC",
  },
  addButton: {
    backgroundColor: "#F9C943",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "30px",
    cursor: "pointer",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "0.8rem",
    minWidth: "120px",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 4px 15px rgba(255,183,0,0.3)",
    },
  },
  editButton: {
    backgroundColor: "#F9C943",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "30px",
    cursor: "pointer",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "0.8rem",
    minWidth: "120px",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 4px 15px rgba(255,183,0,0.3)",
    },
  },
};

export default RefactorAdmin;
