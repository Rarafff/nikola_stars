import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function StarModal({ show, onHide, student, onConfirm }) {
  const [stars, setStars] = useState(0); // State to hold the input value

  useEffect(() => {
    // Set initial stars based on the student's current stars
    if (student) {
      setStars(student.stars || 0); // Default to 0 if no stars
    }
  }, [student]);

  const handleConfirm = () => {
    // Allow both adding and reducing stars
    if (stars !== null) {
      onConfirm(student?.rfid_id, stars); // Pass the star amount to the onConfirm callback
      onHide();
    } else {
      alert("Please enter a valid number of stars.");
    }
  };

  const handleIncrease = () => setStars(stars + 1); // Increase star count
  const handleDecrease = () => setStars(stars - 1); // Decrease star count

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Stars for {student?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formStars">
            <Form.Label>
              Current stars: <strong>{student?.stars}</strong>
            </Form.Label>
            <Form.Label className="d-block">
              Adjust the number of stars:
            </Form.Label>
            <InputGroup>
              <Button variant="outline-secondary" onClick={handleDecrease}>
                -
              </Button>
              <Form.Control
                type="number"
                value={stars}
                onChange={(e) => setStars(parseInt(e.target.value, 10) || 0)}
                min="0"
                className="text-center"
              />
              <Button variant="outline-secondary" onClick={handleIncrease}>
                +
              </Button>
            </InputGroup>
            <Form.Text className="text-muted">
              Use the + and - buttons to adjust stars.
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StarModal;
