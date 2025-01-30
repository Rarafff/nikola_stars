import { useNavigate } from "react-router-dom";
import adminIcon from "../assets/admin-icon.svg";
import logo from "../assets/logo.svg";
import nikolaStarTracker from "../assets/nikola-startracker.svg";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar" style={styles.sidebar}>
      <div style={styles.topSection}>
        <div style={styles.logoContainer}>
          <img
            src={logo}
            alt="Nikola Logo"
            style={styles.logo}
            onClick={() => navigate("/")}
          />
          <img
            src={nikolaStarTracker}
            alt="Nikola StarTracker"
            style={styles.starTrackerLogo}
          />
        </div>
      </div>

      <div style={styles.middleSection}></div>

      <div style={styles.bottomSection}>
        <div style={styles.adminContainer}>
          <img
            src={adminIcon}
            alt="Admin Icon"
            style={styles.adminIcon}
            onClick={() => navigate('/admin')}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    left: 0,
    top: 0,
  },
  topSection: {
    backgroundColor: "#FFD93D", 
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  middleSection: {
    backgroundColor: "#4CACBC", 
    flex: "1",
    padding: "20px",
  },
  bottomSection: {
    backgroundColor: "#FF8551",
    flex: "1",
    display: "flex",
    alignItems: "flex-end", 
    padding: "20px",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    width: "auto",
    height: "80px",
    cursor: "pointer",
  },
  starTrackerLogo: {
    width: "auto",
    height: "50px",
  },
  adminContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingBottom: "20px", 
  },
  adminIcon: {
    width: "auto",
    height: "35px",
    marginLeft: "10px", 
    cursor: "pointer",
  },
};

export default Sidebar;
