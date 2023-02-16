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
    const userId = shuffledImages[index].user_id;
    //return state.users.find((user) => user.id === state.images[index].user_id);
    return state.users.find((user) => user.id === userId);
  };

  const handleClick = (index) => {
    navigate(`/profile/${getUserByImage(index).id}`);
  };

  // Shuffle the images array
  const shuffledImages = [...state.images].sort(() => Math.random() - 0.5);

  // Map the shuffled images array to the items array
  const items = shuffledImages.map((image, index) => ({
    alt: `${getUserByImage(index).username}`,
    image: `data:image/jpeg;base64,${image.file_data}`,
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
