import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://192.168.5.200:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        const expiryTime = Date.now() + 3600000; // Token expiry time after 1 hour
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("token_expiry", expiryTime); // Save the expiry time
        navigate("/admin");
      } else {
        setError(data.error || "An error occurred during login.");
      }
    } catch (error) {
      setError("Failed to connect to the server.", error);
    }
  };

  useEffect(() => {
    const tokenExpiry = localStorage.getItem("token_expiry");
    if (tokenExpiry && Date.now() > tokenExpiry) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_expiry");
      console.log("Session expired, logged out.");
      navigate("/login");
    }
  }, []);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Helmet>
        <title>Nikola Stars | Login</title>
      </Helmet>
      <h2 className="mb-2">Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Form onSubmit={handleLogin} style={{ width: "100%", maxWidth: "400px" }}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
