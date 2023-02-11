import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { Carousel, CarouselItem } from "react-round-carousel";
import "react-round-carousel/src/index.css";

export default function Explore() {
  const [state, setState] = useState({ users: [], images: [] });

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

  console.log("State.images", state.images);

  const getUserByImage = (index) => {
    return state.users.find((user) => user.id === state.images[index].user_id);
  };

  const items = Array(state.images.length)
    .fill("")
    .map((image, index) => ({
      alt: `${getUserByImage(index).username}`,
      image: `data:image/jpeg;base64,${state.images[index].file_data}`,
      height: "190",
      width: "190",
      content: (
        <div key={index} onClick={() => console.log("clicked")}>
          <strong>{getUserByImage(index).username}</strong>
          <span>{getUserByImage(index).dog_name}</span>
        </div>
      ),
    }));

  console.log("items", items);

  return (
    <div>
      <h1>Explore</h1>
      <Carousel itemWidth="275" showControls={false} items={items} />
    </div>
  );
}
