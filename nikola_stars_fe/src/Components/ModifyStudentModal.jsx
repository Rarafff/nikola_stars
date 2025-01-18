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
    if (window.confirm("Are you sure you want to delete this student?")) {
      onDelete(student.rfid_id);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modify Student Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="photoUrl">
            <Form.Label>Photo URL (optional)</Form.Label>
            <Form.Control
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </Form.Group>

          <Container className="d-flex justify-content-center gap-3">
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete Student
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModifyStudentModal;
