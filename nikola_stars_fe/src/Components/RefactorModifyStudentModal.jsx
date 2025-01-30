import React, { useState } from 'react';

const RefactorModifyStudentModal = ({ isOpen, onClose, student, onSave }) => {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    photo_url: student?.photo_url || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://192.168.5.200:8000/api/students/${student.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...student,
          ...formData
        })
      });

      if (response.ok) {
        onSave(formData);
        onClose();
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
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

        <div style={styles.formGroup}>
          <label style={styles.label}>Photo URL (Optional)</label>
          <input
            type="text"
            name="photo_url"
            value={formData.photo_url}
            onChange={handleChange}
            style={styles.input}
            placeholder="....."
          />
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
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#FFF7DC',
    borderRadius: '20px',
    padding: '20px',
    border: '4px solid #FF8551',
    width: '90%',
    maxWidth: '400px',
  },
  title: {
    color: '#FF8551',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: '1rem',
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    color: '#FDBA00',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: '0.8rem',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '2px solid #FF8551',
    backgroundColor: 'white',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: '0.8rem',
    color: '#FF8551',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    gap: '10px',
  },
  cancelButton: {
    backgroundColor: '#FF8551',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: '0.8rem',
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#FF8551',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: '0.8rem',
    flex: 1,
  },
};

export default RefactorModifyStudentModal;