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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>RFID ID</th>
            <th>Star</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.rfid_id}</td>
              <td>{student.stars || 0}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedStudent(student);
                    setStarModalShow(true); // Open StarModal
                  }}
                >
                  Modify Stars
                </Button>
              </td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedStudent(student);
                    setModifyStudentModalShow(true); // Open ModifyStudentModal
                  }}
                >
                  Modify Student
                </Button>
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
    </>
  );
}

export default StudentTable;
