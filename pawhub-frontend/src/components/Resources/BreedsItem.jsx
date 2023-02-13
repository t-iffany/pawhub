import { ListGroup } from "react-bootstrap";

export default function BreedsItem({ breed, origin, img }) {
  return (
    <ListGroup.Item>
      <div className="breed-item">
        <img className="breed-image" src={img} />

        <div className="breed-item-info">
          <div className="breed-name">{breed}</div>
          Origin: {origin}
        </div>
      </div>
    </ListGroup.Item>
  );
}
