import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import "./UserProfile.css";
import ModalImage from "react-modal-image";

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
    <div className="profile-page">
      <div className="profile-info">
        <Avatar
          alt="avatar"
          src={state.user ? state.user.avatar : "user.avatar not found"}
          sx={{ width: 150, height: 150 }}
        />

        <div className="profile-user-info">
          <div>
            Profile
            <ul>
              <li>
                Name:{" "}
                {state.user ? state.user.dog_name : "user.breed not found"}
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
          </div>
        </div>
      </div>

      <div className="modal-images">
        {state.images &&
          state.images
            .filter((image) => image.user_id === state.user.id)
            .map((image, index) => (
              <ModalImage
                className="modal-image"
                key={index}
                small={`data:image/jpeg;base64,${image.file_data}`}
                large={`data:image/jpeg;base64,${image.file_data}`}
                alt={state.user.dog_name}
                style={{
                  transform: `rotate(${index % 4 !== 0 ? "-45" : "45"}deg`,
                }}
              />
            ))}
      </div>
    </div>
  );
}
