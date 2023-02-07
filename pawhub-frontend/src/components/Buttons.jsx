import Button from "@mui/material/Button";

export default function Buttons(props) {
  return (
    <Button variant="outlined" className={props.name} onClick={props.onClick}>
      {" "}
      {props.children}
    </Button>
  );
}
