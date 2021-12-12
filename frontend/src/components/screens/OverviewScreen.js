import React from "react";
import Typography from "@mui/material/Typography";
import NavBar from "../NavBar";

const OverviewScreen = () => {
  return (
    <div>
      <NavBar />
      <Typography variant="h4" style={{ color: "black" }}>
        OverviewScreen
      </Typography>
    </div>
  );
};

export default OverviewScreen;
