import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const RefactorModifyStudentModal = ({
  isOpen,
  onClose,
  student,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    photo_url: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        photo_url: student.photo_url || "",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!student?.rfid_id) {
      console.error("Invalid student RFID ID");
      return;
    }

    try {
      const updatedData = {
        ...student,
        ...formData,
      };

      const response = await fetch(
        `http://server.nikolaacademy.com:8000/api/update-student/${student.rfid_id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update student");
      }

      onSave(student.rfid_id, updatedData);
      onClose();
    } catch (error) {
      console.error("Error updating student:", error.message);
    }
  };

  const handleDelete = async () => {
    if (!student?.rfid_id) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://server.nikolaacademy.com:8000/api/delete-student/${student.rfid_id}/`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete student.");
          }

          Swal.fire({
            title: "Deleted!",
            text: "Student has been deleted.",
            icon: "success",
          });

          onDelete(student.rfid_id); 
          onClose(); 
        } catch (error) {
          console.error("Error deleting student:", error);
        }
      }
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay} onClick={handleOverlayClick}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>Modify Student Profile</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button style={styles.saveButton} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#FFF7DC",
    borderRadius: "20px",
    padding: "20px",
    border: "4px solid #FF8551",
    width: "90%",
    maxWidth: "400px",
  },
  title: {
    color: "#FF8551",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "1rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    color: "#FDBA00",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "0.8rem",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "2px solid #FF8551",
    backgroundColor: "white",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "0.8rem",
    color: "#FF8551",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    gap: "10px",
  },
  cancelButton: {
    backgroundColor: "#FF8551",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "0.8rem",
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#FF8551",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "0.8rem",
    flex: 1,
  },
};

export default RefactorModifyStudentModal;
