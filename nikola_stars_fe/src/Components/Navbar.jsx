import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LogoNikola from "/logo-nikola.png";
import { Nav } from "react-bootstrap";

const MainNavbar = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  const navStyle = {
    navbar: {
      background: "linear-gradient(135deg, #fff3e0 0%, #FFE4E1 100%)",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      padding: "15px 0",
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    logo: {
      width: "40px",
      height: "40px",
      filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
      "@media (max-width: 576px)": {
        width: "30px",
        height: "30px",
      },
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      background: "linear-gradient(45deg, #FF6B6B, #FFB84C)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
      "@media (max-width: 576px)": {
        fontSize: "1.2rem",
      },
    },
    link: {
      color: "#4CAF50",
      fontWeight: "bold",
      fontSize: "1.1rem",
      padding: "8px 15px",
      borderRadius: "20px",
      transition: "all 0.3s ease",
      "&:hover": {
        background: "rgba(76,175,80,0.1)",
        transform: "translateY(-2px)",
      },
    },
    button: {
      background: "linear-gradient(45deg, #FF6B6B, #FF8E8E)",
      color: "white",
      border: "none",
      padding: "8px 20px",
      borderRadius: "25px",
      boxShadow: "0 4px 15px rgba(255,107,107,0.3)",
      transition: "all 0.3s ease",
      fontWeight: "bold",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 6px 20px rgba(255,107,107,0.4)",
      },
    },
  };

  return (
    <Navbar expand="md" style={navStyle.navbar} className="sticky-top">
      <Container>
        <Navbar.Brand href="/" style={navStyle.brand}>
          <img
            src={LogoNikola}
            alt="Nikola Logo"
            className="d-inline-block align-top responsive-logo"
            style={navStyle.logo}
          />
          <span className="d-none d-sm-inline" style={navStyle.title}>
            Nikola Star Tracker ⭐
          </span>
          <span className="d-inline d-sm-none" style={navStyle.title}>
            Nikola ⭐
          </span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{
            border: "none",
            padding: "0.25rem 0.5rem",
            backgroundColor: "transparent",
          }}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAdminPage ? (
              <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 mt-3 mt-md-0">
                <Nav.Link
                  href="/history"
                  className="nav-link-custom"
                  style={navStyle.link}
                >
                  📚 History
                </Nav.Link>
                <button
                  className="btn-custom"
                  onClick={handleLogout}
                  style={navStyle.button}
                >
                  👋 Logout
                </button>
              </div>
            ) : (
              <div className="d-flex">
                <Nav.Link
                  href="/admin"
                  className="nav-link-custom mt-3 mt-md-0"
                  style={navStyle.link}
                >
                  🔑 Admin
                </Nav.Link>
                <Nav.Link
                  href="/test"
                  className="nav-link-custom"
                  style={navStyle.link}
                >
                  test
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
