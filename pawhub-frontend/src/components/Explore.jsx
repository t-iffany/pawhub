import * as React from "react";

import { Carousel, CarouselItem } from "react-round-carousel";
import "react-round-carousel/src/index.css";

export default function Explore() {
  const items = Array(20)
    .fill("")
    .map((string, index) => ({
      alt: "A random photo",
      image: `https://picsum.photos/${210 + index}`,
      content: (
        <div onClick={() => console.log("clicked")}>
          <strong>Username</strong>
          <span>Dog Name</span>
        </div>
      ),
    }));

  return (
    <div>
      <h1>Explore</h1>
      <Carousel itemWidth="275" showControls={false} items={items} />
    </div>
  );
}
