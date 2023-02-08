import { useState } from "react";
import Button from "@mui/material/Button";

export default function Login() {

  const [userId, setUserId] = useState();

  const handleLogin = () => {
    fetch("http://localhost:3000/api/login/1")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('data', data);
        setUserId(data.userId);
        localStorage.setItem('userId', data.userId);
      });
  };

  const handleLogout = () => {
    
  };

  return (
    <div>
      <p>{userId ? `Logged in as: ${userId}` : 'Not logged in'}</p>
      <Button variant="outlined" onClick={handleLogin}>Login</Button>
      <Button variant="outlined" onClick={handleLogout}>Logout</Button>
    </div>
  );
}