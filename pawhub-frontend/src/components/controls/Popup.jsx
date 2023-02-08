import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import Buttons from "./Buttons";
export default function Popup(props) {
  const {title, children, openPopup, setOpenPopup} = props;

  return (
    <div>
      <Dialog open={openPopup}>
        <DialogTitle>
          <div style={{display: 'flex'}}>
            <Typography variant="h6" component="div" style={{flexGrow: 1}}>
              {title}
            </Typography>
            <Buttons onClick={() => setOpenPopup(false)}>X</Buttons>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}