import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

export default function UserProfile({ currentUser }) {
  const { id } = useParams();
  const [state, setState] = useState({ user: {}, images: [] });

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/api/users/${id}`),
      axios.get("http://localhost:3001/api/images"),
    ])
      .then((response) => {
        setState((prev) => ({
          ...prev,
          user: response[0].data,
          images: response[1].data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "25%",
          height: "50%",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>{state.user ? state.user.username : "user not found"}</div>
        <Avatar
          alt="avatar"
          src={state.user ? state.user.avatar : "user.avatar not found"}
          sx={{ width: 130, height: 130 }}
        />
      </div>
      <div
        style={{ width: "50%", height: "50%", backgroundColor: "transparent" }}
      >
        <div></div>
        <div>
          Profile
          <ul>
            <li>
              Name: {state.user ? state.user.dog_name : "user.breed not found"}
            </li>
            <li>
              Breed: {state.user ? state.user.breed : "user.breed not found"}
            </li>
            <li>
              Description:{" "}
              {state.user
                ? state.user.description
                : "user.description not found"}
            </li>
          </ul>
          <div>
            {state.images &&
              state.images
                .filter((image) => image.user_id === state.user.id)
                .map((image, index) => (
                  <img
                    key={index}
                    src={`data:image/jpeg;base64,${image.file_data}`}
                    alt={state.user.dog_name}
                    width="150"
                    height="150"
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
