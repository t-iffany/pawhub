import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import "./UserProfile.css";
import { SocialIcon } from "react-social-icons";

export default function UserProfile({ currentUser }) {
  const { id } = useParams();
  const [state, setState] = useState({ user: {}, images: [] });

  let imageCount = () => {
    if (state.images) {
      return state.images.filter((image) => image.user_id === state.user.id)
        .length;
    }
  };

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
        <div className="avatar-div">
          <div className="profile-username">
            {state.user ? state.user.username : "user.username not found"}
          </div>
          <Avatar
            alt="avatar"
            src={
              state.user
                ? `data:image/jpeg;base64,${state.user.avatar}`
                : "user.avatar not found"
            }
            sx={{ width: 130, height: 130 }}
          />
        </div>
        <div className="profile-user-info">
          <div>
            <div className="profile-header">
              <div className="profile-username">
                Hi, my name is{" "}
                {state.user ? state.user.dog_name : "user.breed not found"}!
              </div>
              <div className="profile-post-count">{imageCount()} posts</div>
            </div>
          </div>

          <div className="profile-user-breed">
            I am a {state.user ? state.user.breed : "user.breed not found"}
          </div>

          <div className="profile-description">
            {state.user ? state.user.description : "user.description not found"}
          </div>

          <div className="social-media-links">
            <SocialIcon
              bgColor="white"
              fgColor="#A5DCCC"
              className="social-link"
              url="https://www.instagram.com/udonthecoton/"
              target="_blank"
            />
            <SocialIcon
              bgColor="white"
              fgColor="#A5DCCC"
              className="social-link"
              url="https://www.facebook.com"
              target="_blank"
            />
            <SocialIcon
              bgColor="white"
              fgColor="#A5DCCC"
              className="social-link"
              url="https://www.tiktok.com"
              target="_blank"
            />
          </div>
        </div>
      </div>

      <div className="profile-images">
        {state.images &&
          state.images
            .filter((image) => image.user_id === state.user.id)
            .reverse()
            .map((image, index) => (
              <img
                className="profile-image"
                key={index}
                src={`data:image/jpeg;base64,${image.file_data}`}
                alt={state.user.dog_name}
              />
            ))}
      </div>
    </div>
  );
}
