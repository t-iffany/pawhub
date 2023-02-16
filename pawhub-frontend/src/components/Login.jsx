import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./Login.css";

const Login = ({setCurrentUser}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          localStorage.setItem("userInfo", JSON.stringify(user));
          navigate("/discussions");
        });
      } else {
        res.json().then((errors) => {
          console.error(errors);
        });
      }
    });
  };

  return (
    <Container className="login-container">
      <Row className="d-flex align-items-center">
        <Col md={6} className="description-container">
          <h3 className="description-header">Welcome to PawHub</h3>
          <p className="description-text">
          Your one-stop destination for pet resources! We offer a variety of tools to help you take better 
          care of your furry friends, including discussions, training videos, and maps to help you find nearby veterinarians and pet stores.
          </p>
        </Col>
        <Col md={6} className="form-container">
          <h3 className="form-header">Login</h3>
          <Form className="container-form" onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="form-label">Username</Form.Label>
              <Form.Control
                className="form-input"
                name="username"
                label="Username"
                variant="outlined"
                onChange={handleChange}
                value={formData.username}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                className="form-input"
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                onChange={handleChange}
                value={formData.password}
              />
            </Form.Group>

            <Button className="form-button" variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;