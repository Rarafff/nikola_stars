import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function StarModal({ show, onHide, student, onConfirm }) {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    if (student) {
      setStars(student.stars || 0);
    }
  }, [student]);

  const handleConfirm = () => {
    if (stars !== null) {
      onConfirm(student?.rfid_id, stars);
      onHide();
    }
  };

  const handleIncrease = () => setStars(stars + 1);
  const handleDecrease = () => stars > 0 && setStars(stars - 1);

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
    button: {
      background: 'linear-gradient(45deg, #4CAF50, #81C784)',
      border: 'none',
      borderRadius: '25px',
      padding: '8px 20px',
      color: 'white',
      fontWeight: 'bold',
      boxShadow: '0 4px 15px rgba(76,175,80,0.3)',
      transition: 'all 0.3s ease',
    },
    cancelButton: {
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
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="rounded-4"
    >
      <Modal.Header closeButton style={modalStyle.header}>
        <Modal.Title style={modalStyle.title}>
          ⭐ Update {student?.name} Star
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle.content}>
        <Form>
          <Form.Group controlId="formStars" className="text-center">
            <Form.Label className="mb-3">
              <h4>Jumlah bintang saat ini: <strong style={{ color: '#FFD700' }}>⭐ {student?.stars}</strong></h4>
            </Form.Label>
            <Form.Label className="d-block mb-3">
              <h5>Atur jumlah bintang:</h5>
            </Form.Label>
            <InputGroup className="w-50 mx-auto mb-3">
              <Button 
                style={{...modalStyle.button, borderRadius: '20px 0 0 20px'}}
                onClick={handleDecrease}
              >
                -
              </Button>
              <Form.Control
                type="number"
                value={stars}
                onChange={(e) => setStars(parseInt(e.target.value, 10) || 0)}
                min="0"
                className="text-center"
                style={{ borderColor: '#4CAF50' }}
              />
              <Button 
                style={{...modalStyle.button, borderRadius: '0 20px 20px 0'}}
                onClick={handleIncrease}
              >
                +
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ border: 'none', padding: '20px' }}>
        <Button style={modalStyle.cancelButton} onClick={onHide}>
          Batal
        </Button>
        <Button style={modalStyle.button} onClick={handleConfirm}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StarModal;