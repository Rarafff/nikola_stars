import { useState, useEffect } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";

function ModifyStudentModal({ show, onHide, student, onUpdate, onDelete }) {
  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (student) {
      setName(student.name);
      setStars(student.stars || 0);
      setPhotoUrl(student.photo_url || "");
    }
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStudent = { name, stars, photo_url: photoUrl };
    onUpdate(student.rfid_id, updatedStudent);
    onHide();
  };

  const handleDelete = () => {
    if (window.confirm("Apakah anda yakin ingin menghapus siswa ini?")) {
      onDelete(student.rfid_id);
      onHide();
    }
  };

  const modalStyle = {
    content: {
      background: 'linear-gradient(135deg, #fff3e0 0%, #FFE4E1 100%)',
      borderRadius: '20px',
      border: 'none',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    },
    header: {
      background: 'transparent',
      border: 'none',
      padding: '20px 20px 0 20px',
    },
    title: {
      color: '#FF6B6B',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    input: {
      borderRadius: '15px',
      border: '2px solid #FFB84C',
      padding: '10px 15px',
      transition: 'all 0.3s ease',
    },
    saveButton: {
      background: 'linear-gradient(45deg, #4CAF50, #81C784)',
      border: 'none',
      borderRadius: '25px',
      padding: '8px 20px',
      color: 'white',
      fontWeight: 'bold',
      boxShadow: '0 4px 15px rgba(76,175,80,0.3)',
      transition: 'all 0.3s ease',
    },
    deleteButton: {
      background: 'linear-gradient(45deg, #FF6B6B, #FF8E8E)',
      border: 'none',
      borderRadius: '25px',
      padding: '8px 20px',
      color: 'white',
      fontWeight: 'bold',
      boxShadow: '0 4px 15px rgba(255,107,107,0.3)',
      transition: 'all 0.3s ease',
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered contentClassName="rounded-4">
      <Modal.Header closeButton style={modalStyle.header}>
        <Modal.Title style={modalStyle.title}>
          ✏️ Modify Student Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle.content}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="name">
            <Form.Label style={{ fontWeight: 'bold', color: '#666' }}>
              Student Name
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={modalStyle.input}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="photoUrl">
            <Form.Label style={{ fontWeight: 'bold', color: '#666' }}>
              Photo URL (optional)
            </Form.Label>
            <Form.Control
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              style={modalStyle.input}
            />
          </Form.Group>

          <Container className="d-flex justify-content-center gap-3 mt-4">
            <Button style={modalStyle.saveButton} type="submit">
              💾 Save
            </Button>
            <Button style={modalStyle.deleteButton} onClick={handleDelete}>
              🗑️ Delete
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModifyStudentModal;