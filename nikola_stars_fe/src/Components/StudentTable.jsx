import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import StarModal from "./StarModal";
import { Button } from "react-bootstrap";
import ModifyStudentModal from "./ModifyStudentModal";

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [starModalShow, setStarModalShow] = useState(false);
  const [modifyStudentModalShow, setModifyStudentModalShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetch("http://192.168.5.200:8000/api/students/")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data", err);
        setLoading(false);
      });
  }, []);

  const handleAddStar = (studentId, newStarsValue) => {
    fetch(`http://192.168.5.200:8000/api/update-student/${studentId}/`, {
      method: "PUT", // Ensure this matches the backend method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stars: newStarsValue }), // Pass the stars value
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          setStudents(
            students.map((student) =>
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

  const handleDeleteStudent = (studentId) => {
    fetch(`http://192.168.5.200:8000/api/delete-student/${studentId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          setStudents((prevStudents) =>
            prevStudents.filter((student) => student.rfid_id !== studentId)
          );
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => console.error("Error deleting student:", error));
  };

  const handleUpdateStudent = (studentId, updatedData) => {
    fetch(`http://192.168.5.200:8000/api/update-student/${studentId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          setStudents(
            students.map((student) =>
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

  if (loading) {
    return (
      <div className="table-loader">
        <div className="spinner-grow text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="table-error">😢 {error}</div>;
  }

  return (
    <div className="student-table-container">
      <Table responsive hover className="student-table">
        <thead>
          <tr className="table-header">
            <th>No</th>
            <th>Nama</th>
            <th>Bintang</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td className="number-cell">{index + 1}</td>
              <td className="name-cell">{student.name}</td>
              <td className="star-cell">
                <span className="star-count">⭐ {student.stars || 0}</span>
              </td>
              <td className="action-cell">
                <div className="action-buttons">
                  <button
                    className="btn action-btn add-star-btn small-btn"
                    onClick={() => {
                      setSelectedStudent(student);
                      setStarModalShow(true);
                    }}
                  >
                    + Bintang
                  </button>
                  <button
                    className="btn action-btn modify-btn small-btn"
                    onClick={() => {
                      setSelectedStudent(student);
                      setModifyStudentModalShow(true);
                    }}
                  >
                    Ubah
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <StarModal
        show={starModalShow}
        onHide={() => setStarModalShow(false)}
        student={selectedStudent}
        onConfirm={handleAddStar}
      />

      <ModifyStudentModal
        show={modifyStudentModalShow}
        onHide={() => setModifyStudentModalShow(false)}
        student={selectedStudent}
        onUpdate={handleUpdateStudent}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
}

export default StudentTable;
