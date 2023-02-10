import Form from "react-bootstrap/Form";

export default function Slider(props) {
  return (
    <div>
      <Form.Range
        type="range"
        min={0}
        max={10000}
        value={props.sliderValue}
        className="slider"
        onChange={props.onChange}
      />
      <div>{props.sliderValue / 1000} kilometres</div>
    </div>
  );
}
