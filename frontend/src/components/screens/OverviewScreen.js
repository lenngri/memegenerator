import React from "react";
import Typography from "@mui/material/Typography";
import NavBar from "../NavBar";
import Album from "../screens/Album";
// import StandardImageList from "../ImageList";
// import { fontWeight } from "@mui/system";

const OverviewScreen = () => {
  return (
    <div
      style={{
        overflow: "hidden",
      }}
    >
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 40.0,
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" style={{ color: "black", fontWeight: "bold" }}>
          Meme Gallery
        </Typography>
        {/* <StandardImageList></StandardImageList> */}
        <Album></Album>
      </div>
    </div>
  );
};

export default OverviewScreen;
