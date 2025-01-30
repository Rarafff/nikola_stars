import React, { useState } from "react";

const RefactorStarModal = ({ isOpen, onClose, student, onSave }) => {
  const [starCount, setStarCount] = useState(student?.stars || 0);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const handleIncrement = () => {
    setStarCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (starCount > 0) {
      setStarCount((prev) => prev - 1);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://192.168.5.200:8000/api/students/${student.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...student,
            stars: starCount,
          }),
        }
      );

      if (response.ok) {
        onSave(starCount);
        onClose();
      }
    } catch (error) {
      console.error("Error updating stars:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay} onClick={handleOverlayClick}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>Update {student?.name} STAR</h2>

        <div style={styles.starDisplay}>
          <span style={styles.starCount}>{starCount}⭐</span>
        </div>

        <div style={styles.counterContainer}>
          <p style={styles.counterLabel}>Atur jumlah bintang</p>
          <div style={styles.counter}>
            <button style={styles.leftCounterButton} onClick={handleDecrement}>
              -
            </button>
            <span style={styles.counterValue}>{starCount}</span>
            <button style={styles.rightCounterButton} onClick={handleIncrement}>
              +
            </button>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.cancelButton} onClick={onClose}>
            Batal
          </button>
          <button style={styles.saveButton} onClick={handleSave}>
            Simpan
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
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  title: {
    color: "#FF8551",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "1.2rem",
    textAlign: "center",
    margin: "0",
  },
  starDisplay: {
    marginTop: "10px",
  },
  starCount: {
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "2rem",
    color: "#FDBA00",
  },
  counterContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  counterLabel: {
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "0.8rem",
    color: "#FF8551",
    margin: "0",
  },
  counter: {
    display: "flex",
    alignItems: "center",
  },
  leftCounterButton: {
    backgroundColor: "#FF8551",
    color: "white",
    border: "none",
    borderRadius: "50px 0px 0px 50px",
    width: "33px",
    height: "33px",
    fontSize: "1.2rem",
    cursor: "pointer",
    fontFamily: '"Press Start 2P", cursive',
  },
  rightCounterButton: {
    backgroundColor: "#FF8551",
    color: "white",
    border: "none",
    borderRadius: "0 50px 50px 0",
    width: "33px",
    height: "33px",
    fontSize: "1.2rem",
    cursor: "pointer",
    fontFamily: '"Press Start 2P", cursive',
  },
  counterValue: {
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "1.2rem",
    color: "#FF8551",
    backgroundColor: "#FFFFFF",
    minWidth: "150px",
    border: "3px solid #F9C943",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  cancelButton: {
    backgroundColor: "#FF8551",
    color: "white",
    border: "none",
    borderRadius: "50px",
    padding: "10px 50px",
    cursor: "pointer",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "0.8rem",
  },
  saveButton: {
    backgroundColor: "#FF8551",
    color: "white",
    border: "none",
    borderRadius: "50px",
    padding: "10px 50px",
    cursor: "pointer",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "0.8rem",
  },
};

export default RefactorStarModal;
