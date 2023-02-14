import Button from "@mui/material/Button";

export default function Buttons(props) {
  return (
    <Button id="popup-button" sx={{border: "solid 2px black", fontWeight: "bold" }} variant="outlined" className={props.name} onClick={props.onClick}>
      {props.children}
    </Button>
  );
}
