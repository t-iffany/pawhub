import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Profile() {

  const [state, setState] = useState({ users: [] });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((response) => {
        if (response.status === 200) {
          setState({ users: response.data });
        } else {
          console.log('Error:', response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const findUserById = (userId) => {
    if (!state.users) {
      return;
    }

    return state.users.find((user) => user.id === userId);
  };

  const user = findUserById(3);

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "25%", height: "50%", backgroundColor: "transparent", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div>{user ? user.username : "user not found"}</div>
        <Avatar alt='avatar'
          src={user ? user.avatar : "user.avatar not found"}
          sx={{ width: 130, height: 130 }}
        />
      </div>
      <div style={{ width: "50%", height: "50%", backgroundColor: "transparent" }}>
        Profile
        <ul>
          <li>Name: {user ? user.dog_name : "user.dog_name not found"}</li>
          <li>Breed: {user ? user.breed : "user.breed not found"}</li>
          <li>Description: {user ? user.description : "user.description not found"}</li>
          <li>Social Media Links</li>
        </ul>
      </div>
    </div>
  );
}