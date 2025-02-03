import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import RefactorLeaderboard from "./RefactorLeaderboard";
import RefactorStudentModal from "../Components/RefactorStudentModal";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [rfid, setRfid] = useState(null);
  

  const fetchLatestRFID = async () => {
    try {
      const response = await fetch(
        "http://server.nikolaacademy.com:8000/api/latest-rfid/"
      );
      const data = await response.json();
      if (data.uid) {
        setRfid(data.uid);
        setModalShow(true); 
      }
    } catch (error) {
      console.error("Error fetching latest RFID UID:", error);
    }
  };

  const clearRFID = async () => {
    try {
      await fetch("http://server.nikolaacademy.com:8000/api/clear-rfid/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  const handleCloseModal = () => {
    setModalShow(false);
    clearRFID();
  };

  return (
    <div>
      <Helmet>
        <title>Nikola Tracker | Home</title>
      </Helmet>
      {!modalShow && <RefactorLeaderboard />}
      <RefactorStudentModal
        rfid={rfid}
        show={modalShow}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Home;
