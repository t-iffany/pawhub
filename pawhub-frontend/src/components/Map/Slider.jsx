import Form from "react-bootstrap/Form";

export default function Slider(props) {
  return (
    <div>
      <Form.Range
        type="range"
        min={0}
        max={100}
        value={props.sliderValue}
        className="slider"
        onChange={props.onChange}
      />
      <div>{props.sliderValue}</div>
    </div>
  );
}
