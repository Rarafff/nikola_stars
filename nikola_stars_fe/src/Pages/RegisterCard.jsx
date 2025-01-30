import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterCard = () => {
  const [rfid, setRfid] = useState("");
  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const [photoUrl, setPhotoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [rfidExists, setRfidExists] = useState(false);

  const navigate = useNavigate();

  const checkIfRFIDExists = async (uid) => {
    if (!uid) return;

    try {
      const response = await fetch(
        `http://192.168.5.200:8000/api/student/${uid}/`
      );
      if (response.status === 200) {
        setRfidExists(true);
        setMessage("This RFID UID is already registered.");
      } else if (response.status === 404) {
        setRfidExists(false);
        setMessage("This RFID UID is available for registration.");
      } else {
        setRfidExists(false);
        setMessage("Error checking RFID status.");
      }
    } catch (error) {
      console.error("Error checking RFID UID:", error);
      setMessage("Error checking RFID UID.");
    }
  };

  const fetchLatestRFID = async () => {
    try {
      const response = await fetch(
        "http://192.168.5.200:8000/api/latest-rfid/"
      );
      if (response.status === 200) {
        const data = await response.json();
        if (data.uid) {
          setRfid(data.uid);
          setMessage("RFID card detected!");
          checkIfRFIDExists(data.uid);
        }
      } else if (response.status === 204) {
        setRfid("");
        setMessage("No RFID card detected.");
      }
    } catch (error) {
      console.error("Error fetching RFID:", error);
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
    } catch (error) {
      console.error("Error clearing RFID:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchLatestRFID, 2000); // Checking for RFID every 2 seconds

    return () => {
      clearInterval(interval);
      clearRFID();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rfid || !name) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (rfidExists) {
      setMessage("This RFID UID is already registered.");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.5.200:8000/api/register-card/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            rfid_id: rfid,
            name: name,
            stars: stars,
            photo_url: photoUrl,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        Swal.fire("Card registered successfully!");
        setRfid("");
        setName("");
        setStars(0);
        setPhotoUrl("");
        clearRFID();
        navigate("/");
      } else {
        setMessage(data.error || "An error occurred");
      }
    } catch (error) {
      setMessage("Network error occurred");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <Helmet>
        <title>Nikola Stars | Register</title>
      </Helmet>
      <h1
        style={{
          background: "linear-gradient(45deg, #FF6B6B, #FFB84C)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Register Card📚
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="rfid" className="form-label">
            RFID UID
          </label>
          <input
            type="text"
            className="form-control"
            id="rfid"
            value={rfid}
            onChange={(e) => setRfid(e.target.value)}
            placeholder="Waiting for RFID card..."
            readOnly
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Student Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="stars" className="form-label">
            Stars
          </label>
          <input
            type="number"
            className="form-control"
            id="stars"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            required
          />
        </div>

        <div className="mb-3 visually-hidden">
          <label htmlFor="photoUrl" className="form-label">
            Photo URL (optional)
          </label>
          <input
            type="text"
            className="form-control"
            id="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            background: "linear-gradient(45deg, #4CAF50, #81C784)",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "25px",
            boxShadow: "0 4px 15px rgba(76,175,80,0.3)",
            transition: "all 0.3s ease",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(76,175,80,0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(76,175,80,0.3)";
          }}
          disabled={rfidExists}
        >
          ✨ Register Card
        </button>
      </form>

      {message && (
        <div
          className={`alert ${rfidExists ? "alert-danger" : "alert-info"} mt-3`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default RegisterCard;
