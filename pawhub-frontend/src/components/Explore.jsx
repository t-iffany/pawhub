import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { Carousel } from "react-round-carousel";
import "react-round-carousel/src/index.css";
import { useNavigate } from "react-router-dom";

export default function Explore() {
  const [state, setState] = useState({ users: [], images: [] });
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/users"),
      axios.get("http://localhost:3001/api/images"),
    ])
      // Our res is an array of the response received: [{users}, {images}]
      .then((response) => {
        setState((prev) => ({
          ...prev,
          users: response[0].data,
          images: response[1].data,
        }));
      })

      .catch((err) => console.log(err));
  }, []);

  // console.log("State.images", state.images);

  const getUserByImage = (index) => {
    return state.users.find((user) => user.id === state.images[index].user_id);
  };

  const handleClick = (index) => {
    navigate(`/profile/${getUserByImage(index).id}`);
  };

  const items = Array(state.images.length)
    .fill("")
    .map((image, index) => ({
      alt: `${getUserByImage(index).username}`,
      image: `data:image/jpeg;base64,${state.images[index].file_data}`,

      content: (
        <div key={index} onClick={() => handleClick(index)}>
          <strong>{getUserByImage(index).username}</strong>
          <span>{getUserByImage(index).dog_name}</span>
        </div>
      ),
    }));

  return (
    <div>
      <h1 className="page-header">Find new friends!</h1>
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <Carousel
            className="carousel"
            itemWidth="275"
            showControls={false}
            items={items}
          />
        </div>
      </div>
    </div>
  );
}
