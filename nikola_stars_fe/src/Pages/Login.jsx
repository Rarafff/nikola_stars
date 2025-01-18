import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import LogoNikola from "/logo-nikola.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

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
        const expiryTime = Date.now() + 3600000;
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("token_expiry", expiryTime);
        navigate("/admin");
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (error) {
      setError("Failed to connect to the server");
    } finally {
      setIsLoading(false);
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
    <div className="login-page">
      <Helmet>
        <title>Nikola Stars | Login</title>
      </Helmet>
      
      <Container className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back! ✨</h2>
            <p>Sign in to manage your star tracker</p>
          </div>

          {error && <div className="login-error">❌ {error}</div>}

          <Form onSubmit={handleLogin} className="login-form">
            <Form.Group controlId="username" className="form-group">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group controlId="password" className="form-group">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                disabled={isLoading}
              />
            </Form.Group>

            <Button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner">
                  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  <span className="spinner-text">Logging in...</span>
                </span>
              ) : (
                'Login'
              )}
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;