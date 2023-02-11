import * as React from 'react';

import { Carousel, CarouselItem } from 'react-round-carousel';
import 'react-round-carousel/src/index.css';

export default function Explore() {
    const items = Array(20)
	.fill('')
	.map((string, index) => ({
		alt: 'A random photo',
		image: `https://picsum.photos/${210 + index}`,
		content: (
			<div>
				<strong>Round Carousel</strong>
				<span>Slide number {index + 1}</span>
			</div>
		)
	}));

    return (<Carousel items={items} />) 
}