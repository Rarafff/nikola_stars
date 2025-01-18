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

  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img src={LogoNikola} alt="" className="logo-nikola" />
            Nikola Star Tracker
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="flex">
              {isAdminPage ? (
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <Nav.Link href="/history">History</Nav.Link>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Nav.Link href="/admin">Admin</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
