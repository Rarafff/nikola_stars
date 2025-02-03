import { useState, useEffect } from "react";
import RefactorStarModal from "../Components/RefactorStarModal";
import RefactorModifyStudentModal from "../Components/RefactorModifyStudentModal";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import studentList from "../assets/list-icon.svg";
import yellowList from "../assets/yellow-list.svg";
import star from "../assets/star.svg";

const RefactorAdmin = () => {
  const [students, setStudents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://server.nikolaacademy.com:8000/api/students/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data: " + err.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");

      if (token && token.length > 0) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-grow text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

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

  const handleUpdateStudent = (studentId, updatedData) => {
    fetch(
      `http://server.nikolaacademy.com:8000/api/update-student/${studentId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          setStudents((prevStudents) =>
            prevStudents.map((student) =>
              student.rfid_id === studentId
                ? { ...student, ...updatedData }
                : student
            )
          );
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => console.error("Error updating student:", error));
  };

  const handleAddStar = (studentId, newStarsValue) => {
    fetch(
      `http://server.nikolaacademy.com:8000/api/update-student/${studentId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ stars: newStarsValue }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          setStudents((prevStudents) =>
            prevStudents.map((student) =>
              student.rfid_id === studentId
                ? { ...student, stars: newStarsValue }
                : student
            )
          );
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => console.error("Error updating stars:", error));
  };

  if (error) {
    return <div className="table-error">😢 {error}</div>;
  }

  const handleDeleteStudent = (rfid_id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.rfid_id !== rfid_id)
    );
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
                  <th
                    style={styles.th}
                    className="dflex align-align-items-center justify-content-center"
                  >
                    Editor
                  </th>
                  <th style={styles.th}></th>
                </tr>
              </thead>
            </table>
            <div style={styles.tableBody}>
              <table style={styles.table}>
                <tbody>
                  {students.map((student, index) => (
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
                          onClick={() => {
                            setSelectedStudent(student);
                            handleOpenModal(student);
                          }}
                        >
                          + Bintang
                        </button>
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.editButton}
                          onClick={() => {
                            setSelectedStudent(student);
                            handleOpenModifyModal(student);
                          }}
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
        onSave={handleAddStar}
      />
      <RefactorModifyStudentModal
        isOpen={isModifyModalOpen}
        onClose={handleCloseModifyModal}
        student={selectedStudent}
        onSave={handleUpdateStudent}
        onDelete={handleDeleteStudent}
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
    width: "25px",
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
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "130px",
    borderBottom: "2px dashed #FFB700",
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
