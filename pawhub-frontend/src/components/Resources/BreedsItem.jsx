import { ListGroup } from "react-bootstrap";

export default function BreedsItem({ breed, origin, img, onClick }) {
  if (img && img !== "Not available" && origin !== "Not available") {
    return (
      <ListGroup.Item
        className="breed-list-item"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
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
}
