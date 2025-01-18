import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function StudentProfileModal({ rfid, show, onClose }) {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show && rfid) {
      fetchStudentData(rfid);
    }
  }, [show, rfid]);

  const fetchStudentData = async (uid) => {
    try {
      const response = await fetch("http://192.168.5.200:8000/api/rfid/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid }),
      });

      const data = await response.json();

      if (response.status === 200 && data.student) {
        setStudent(data.student);
        setError(null);

        Swal.fire({
          title: `Hello, ${data.student.name}! 🌟`,
          html: `
            <div style="margin: 20px 0;">
              <h5>You have</h5>
              <h1 style="color: #FFD700; font-size: 48px; margin: 15px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
                ${data.student.stars} ⭐
              </h1>
            </div>
          `,

          timer: 15000,
          timerProgressBar: true,
          background: "linear-gradient(45deg, #FFD93D, #FFF3B0)",
          backdrop: `
          rgb(255, 243, 224)
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l5.5 11.5L48 22l-11.5 5.5L30 39l-5.5-11.5L12 22l11.5-5.5z' fill='%23FFD700' fill-opacity='0.3'/%3E%3C/svg%3E")
        `,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(onClose);
      } else if (response.status === 404) {
        setStudent(null);
        setError("This card is not registered 😅");

        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "This card is not registered 😅",
          timer: 5000,
          background: "linear-gradient(45deg, #FFD93D, #FFF3B0)",
          backdrop: `
            rgb(255, 243, 224)
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l5.5 11.5L48 22l-11.5 5.5L30 39l-5.5-11.5L12 22l11.5-5.5z' fill='%23FFD700' fill-opacity='0.3'/%3E%3C/svg%3E")
          `,
          timerProgressBar: true,
          confirmButtonColor: "#FF6B6B",
        }).then(onClose);
      } else {
        setError(data.error || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error fetching RFID data:", error);
      setError("Failed to connect to the server.");
    }
  };

  return null;
}

export default StudentProfileModal;
