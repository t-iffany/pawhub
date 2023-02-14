import Form from "react-bootstrap/Form";

export default function Slider(props) {
  return (
    <div className="slider-row">
      <Form.Range
        type="range"
        min={0}
        max={10000}
        value={props.radius}
        className="slider"
        id="slider"
        onChange={props.onChange}
      />
      <div className="slider-value">{Math.round(props.radius / 1000)} km</div>
    </div>
  );
}
