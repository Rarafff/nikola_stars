import { useState, useEffect } from "react";
import StudentProfileModal from "../Components/StudentModal";
import Leaderboard from "./Leaderboard";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [student, setStudent] = useState(null);
  const [rfid, setRfid] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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
        setModalShow(true);

        setTimeout(() => {
          setModalShow(false);
          setStudent(null);
          clearRFID();
        }, 15000);
      } else if (response.status === 404) {
        let timerInterval;
        Swal.fire({
          title: "Card Detected! 🔍",
          html: `
                  <div style="margin: 20px 0;">
                    <h3 style="color: #FF6B6B;">Sorry...</h3>
                    <h1 style="color: #666; font-size: 24px; margin: 15px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
                      This card is not registered 😅
                    </h1>
                  </div>
                  <p style="margin-top: 15px;">This window will close soon</p>
                `,
          timer: 15000,
          timerProgressBar: true,
          background: "#fff3e0",
          backdrop: `
                  rgba(255,230,255,0.95)
                  url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l5.5 11.5L48 22l-11.5 5.5L30 39l-5.5-11.5L12 22l11.5-5.5z' fill='%23FFD700' fill-opacity='0.3'/%3E%3C/svg%3E")
                `,
          confirmButtonColor: "#4CAF50",
          confirmButtonText: "Tutup",
          showClass: {
            popup: "animate__animated animate__bounceIn",
          },
          hideClass: {
            popup: "animate__animated animate__bounceOut",
          },
          customClass: {
            container: "full-screen-modal",
            popup: "rounded-popup",
            title: "custom-title",
          },
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Math.ceil(Swal.getTimerLeft() / 1000)}`;
            }, 100);

            const popup = Swal.getPopup();
            popup.style.border = "3px solid #FFD700";
            popup.style.borderRadius = "20px";
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCloseButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        setErrorMessage("");
        clearRFID();
      } else {
        setErrorMessage(data.error || "An error occurred while fetching data.");
      }
    } catch (error) {
      console.error("Error fetching RFID data:", error);
      setErrorMessage("Failed to connect to the server.");
    }
  };

  const fetchLatestRFID = async () => {
    try {
      const response = await fetch(
        "http://192.168.5.200:8000/api/latest-rfid/"
      );
      const data = await response.json();
      if (data.uid) {
        setRfid(data.uid);
      }
    } catch (error) {
      console.error("Error fetching latest RFID UID:", error);
    }
  };

  const clearRFID = async () => {
    try {
      await fetch("http://192.168.5.200:8000/api/clear-rfid/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setRfid(null);
    } catch (error) {
      console.error("Error clearing RFID:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchLatestRFID, 2000);

    return () => {
      clearInterval(interval);
      clearRFID();
    };
  }, []);

  useEffect(() => {
    if (rfid) {
      fetchStudentData(rfid);
    }
  }, [rfid]);

  const handleCloseModal = () => {
    setModalShow(false);
    setStudent(null);
    clearRFID();
  };

  return (
    <div>
      <Helmet>
        <title>Nikola Tracker | Home</title>
      </Helmet>
      {!modalShow && (
        <>
          <Leaderboard />
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
        </>
      )}
      <StudentProfileModal
        student={student}
        show={modalShow}
        onHide={handleCloseModal}
      />
    </div>
  );
};

export default Home;
