import React from "react";
import Typography from "@mui/material/Typography";
import NavBar from "../NavBar";

const ProfileScreen = () => {
  return (
    <div>
      <NavBar />
      <Typography variant="h4" style={{ color: "black" }}>
        ProfileScreen
      </Typography>
    </div>
  );
};

export default ProfileScreen;
