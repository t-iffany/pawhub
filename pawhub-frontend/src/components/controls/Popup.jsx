import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import Buttons from "./Buttons";
export default function Popup(props) {
  const {title, children, openPopup, setOpenPopup} = props;

  return (
    <div id="popup-container">
      <Dialog open={openPopup}>
        <DialogTitle sx={{backgroundColor: "#C6E2E9"}}>
          <div style={{display: 'flex'}}>
            <Typography id="popup-header" variant="h6" component="div" style={{flexGrow: 1}}>
              {title}
            </Typography>
            <Buttons sx={{border: "solid 2px black", fontWeight: "bold"}} onClick={() => setOpenPopup(false)}>X</Buttons>
          </div>
        </DialogTitle>
        <DialogContent  sx={{backgroundColor: "#C6E2E9"}}>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}