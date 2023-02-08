import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function SimpleContainer(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="discussion-container" maxWidth="md">
        <Box sx={{ bgcolor: "transparent", height: "70vh" }}>
          {props.children}
        </Box>
      </Container>
    </React.Fragment>
  );
}
