import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function NavBar(props) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ margin: "0 auto" }}>
        <Typography
          style={{ cursor: "pointer" }}
          onClick={() => props.backToHome("HOME")}
          variant="h4"
          color="inherit"
        >
          {"<Todos with hooks/>"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
