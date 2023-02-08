import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function Login({setCurrentUser}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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
        });
      } else {
        res.json().then((errors) => {
          console.error(errors);
        });
      }
    });
  };

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
            name="password"
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            value={formData.password}
          />
      <Button type="submit" variant="contained">
          Submit
      </Button>
    </form>
  );
};