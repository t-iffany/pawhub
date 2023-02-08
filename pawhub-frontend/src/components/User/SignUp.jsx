import { useState }from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    dog_name: "",
    breed: "",
    description: "",
    image: "",
    avatar: ""
  });

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
    .then(() => <Navigate to ="/discussions" />)
    .catch((err) => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
            name="username"
            id="username"
            label="Username"
            variant="outlined"
            onChange={handleChange}
            value={formData.username}
          />
      <TextField
            name="email"
            id="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            value={formData.email}
          />
      <TextField
            name="password"
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            onChange={handleChange}
            value={formData.password}
          />
      <TextField
            name="dog_name"
            id="dog_name"
            label="Dog Name"
            variant="outlined"
            onChange={handleChange}
            value={formData.dog_name}
          />
       <TextField
            name="breed"
            id="breed"
            label="Breed"
            variant="outlined"
            onChange={handleChange}
            value={formData.breed}
          />
      <TextField
            name="description"
            id="description"
            label="Description"
            variant="outlined"
            onChange={handleChange}
            value={formData.description}
          />
      <TextField
            name="image"
            id="image"
            label="Image"
            variant="outlined"
            onChange={handleChange}
            value={formData.image}
          />
      <TextField
            name="avatar"
            id="avatar"
            label="Avatar"
            variant="outlined"
            onChange={handleChange}
            value={formData.avatar}
          />
      <Button type="submit" variant="contained">
          Submit
      </Button>
    </form>
  );
};