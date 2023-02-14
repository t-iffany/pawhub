import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import './UserProfile.css';
import PolaroidImage from "./PolaroidImage";

export default function UserProfile({ currentUser }) {
  const { id } = useParams();
  const [state, setState] = useState({ user: {}, images: [] });
  const [clickedImage, setClickedImage] = useState(null);

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


  const handleImageClick = (src) => {
    setClickedImage(src);
  }

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
                  <PolaroidImage
                    key={index}
                    src={`data:image/jpeg;base64,${image.file_data}`}
                    alt={state.user.dog_name}
                    width="210"
                    height="210"
                    style={{
                      transform: `rotate(${index % 4 !== 0 ? "-45" : "45"}deg`,
                    }}
                    onClick={() => handleImageClick(`data:image/jpeg;base64,${image.file_data}`)}
                  />
                ))}
          </div>
          {clickedImage && (
  <div className="clicked-image">
    <img src={clickedImage} alt="clicked-image" />
    <button onClick={() => setClickedImage(null)}>Close</button>
  </div>
)}

        </div>
      </div>
    </div>
  );
}
