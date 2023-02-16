import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

export default function SignUp({ setCurrentUser }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    dog_name: "",
    breed: "",
    description: ""
  });

  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const getBreeds = {
    method: "GET",
    url: "https://dog-breeds2.p.rapidapi.com/dog_breeds",
    headers: {
      "X-RapidAPI-Key": "da1a663316mshd7457aea6fda466p18c83fjsn5db0b9b1ad56",
      "X-RapidAPI-Host": "dog-breeds2.p.rapidapi.com",
    },
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    axios
      .request(getBreeds)
      .then(function (response) {
        const newOpts = response.data.map((res) => res.breed);
        setOptions(newOpts);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleToggle = () => {
    setShowOptions(!showOptions);
  };

  const handleSelect = (selectedOption) => {
    setFormData({
      ...formData,
      breed: selectedOption,
    });
    setShowOptions(false);
  };

  //filters the menu based on what's typed
  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().indexOf(formData.breed.toLowerCase()) !== -1
  );

  function handleSubmit(e) {
    e.preventDefault();

    const signupData = new FormData();
    signupData.append("username", formData.username);
    signupData.append("password", formData.password);
    signupData.append("email", formData.email);
    signupData.append("dog_name", formData.dog_name);
    signupData.append("breed", formData.breed);
    signupData.append("description", formData.description);
    signupData.append("avatar", selectedFile);

    axios
      .post("http://localhost:3001/api/users", signupData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((user) => {
        setCurrentUser(user.data);
        localStorage.setItem("userInfo", JSON.stringify(user.data));
        navigate("/discussions");
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container className="signup-container">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h1 className="text-center">Sign Up</h1>
          <p className="signup-parg">
            Join in on the fun discussions and connect with other users on PawHub!
          </p>
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
            <Dropdown onToggle={handleToggle} show={showOptions}>
              <Form.Label>Dog's Breed</Form.Label>
              <Dropdown.Toggle
                as={FormControl}
                type="text"
                id="breed"
                name="breed"
                placeholder="Type and select your dog's breed"
                value={formData.breed}
                onChange={handleChange}
              />
              <Dropdown.Menu>
                {filteredOptions.map((option) => (
                  <Dropdown.Item
                    key={option}
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
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
              {/* <Form.Control
                type="text"
                name="avatar"
                label="Avatar"
                variant="outlined"
                onChange={handleChange}
                value={formData.avatar}
                placeholder="Enter avatar URL"
              /> */}
              <input
              type="file"
              name="avatar"
              onChange={handleFileSelect}
              accept="image/*"
              />
            </Form.Group>
            <br></br>
            <Button className="signup-button" variant="primary" type="submit">
              Sign-Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
