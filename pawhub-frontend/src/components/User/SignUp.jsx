import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './SignUp.css';
import DropdownTypeAhead from '../controls/DropdownTypeAhead';

export default function SignUp ({setCurrentUser}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    dog_name: "",
    breed: "",
    description: "",
    avatar: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const userCreds = { ...formData };

    axios
    .post("http://localhost:3001/api/users", userCreds)
    .then((user) => {
      setCurrentUser(user);
      localStorage.setItem("userInfo", JSON.stringify(user));
      navigate("/discussions")
    })
    .catch((err) => console.log(err));
  }

  return (
    <Container className="signup-container">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h1 className="text-center">Sign Up to PawHub</h1>
          <p>Join the fun in the discussions and connect with other users</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                label="Username"
                variant="outlined"
                onChange={handleChange}
                value={formData.username}
                type="text"
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                label="Email"
                variant="outlined"
                onChange={handleChange}
                value={formData.email}
                placeholder="Enter Email"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                onChange={handleChange}
                value={formData.password}
                placeholder="Enter password"
              />
            </Form.Group>
            <Form.Group controlId="dog_name">
              <Form.Label>Dog Name</Form.Label>
              <Form.Control
                type="text"
                name="dog_name"
                label="Dog's Name"
                variant="outlined"
                onChange={handleChange}
                value={formData.dog_name}
                placeholder="Enter your dog's name"
              />
            </Form.Group>
            <Form.Group controlId="breed">
              <Form.Label>Dog's Breed</Form.Label>
              <Form.Control
                 type="text"
                 name="breed"
                 label="Dog's Breed"
                 variant="outlined"
                 onChange={handleChange}
                 value={formData.breed}
                placeholder="Enter your dog's breed"
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="2"
                type="text"
                name="description"
                label="Description"
                variant="outlined"
                onChange={handleChange}
                value={formData.description}
                placeholder="Enter a brief description"
              />
            </Form.Group>
            <Form.Group controlId="avatar">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
               type="text"
               name="avatar"
               label="Avatar"
               variant="outlined"
               onChange={handleChange}
               value={formData.avatar}
                placeholder="Enter avatar URL"
              />
            </Form.Group>
            <DropdownTypeAhead />
            <Button variant="primary" type="submit">
              Sign-Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};