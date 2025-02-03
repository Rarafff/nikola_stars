import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import nikolaStarTracker from "../assets/nikola-startracker.svg";
import historyImage from "../assets/history-button.svg";
import newCardImage from "../assets/new-card.svg";
import logoutImage from "../assets/log-out.svg";
import Swal from "sweetalert2";

const RefactorNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FDBA00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
        Swal.fire({
          title: "OK!",
          icon: "success",
        });
      }
    });
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.leftSection}>
        <img
          src={nikolaStarTracker}
          alt="Nikola StarTracker"
          style={styles.logo}
          onClick={() => navigate("/")}
        />
      </div>

      <div style={styles.middleSection}>
        <img src={logo} alt="Nikola" style={styles.middleLogo} />
      </div>

      <div style={styles.rightSection}>
        <button style={styles.navButton} onClick={() => navigate("/history")}>
          <img
            src={historyImage}
            alt="History"
            style={styles.navImageHistory}
          />
        </button>
        <button
          style={styles.navButton}
          onClick={() => navigate("/register-card")}
        >
          <img src={newCardImage} alt="New Card" style={styles.navImage} />
        </button>
        <button style={styles.navButton} onClick={handleLogout}>
          <img src={logoutImage} alt="Logout" style={styles.navImage} />
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    width: "100%",
    height: "100px",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  leftSection: {
    flex: 1,
    backgroundColor: "#FF8551",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
  },
  middleSection: {
    flex: 1,
    backgroundColor: "#4CACBC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rightSection: {
    flex: 1,
    backgroundColor: "#FFD93D",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "0 20px",
  },
  logo: {
    height: "40px",
    cursor: "pointer",
  },
  middleLogo: {
    height: "50px",
  },
  navButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  navImage: {
    height: "40px",
    width: "auto",
    objectFit: "contain",
  },
  navImageHistory: {
    height: "20px",
    width: "auto",
    objectFit: "contain",
  },
};

export default RefactorNavbar;
