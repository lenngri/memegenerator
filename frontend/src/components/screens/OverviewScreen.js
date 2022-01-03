import React from "react";
import NavBar from "../NavBar";
import InfiniteScroller from "./InfiniteScroll";

// import StandardImageList from "../ImageList";
// import { fontWeight } from "@mui/system";

const OverViewScreen = ({ logout }) => {
  return (
    <div
      style={{
        overflow: "hidden",
      }}
    >
      <NavBar logout={logout} />
      <InfiniteScroller></InfiniteScroller>
    </div>
  );
};

export default OverViewScreen;
