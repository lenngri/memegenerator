import React from "react";
import NavBar from "../NavBar";
import InfiniteScroller from "./InfiniteScroll";

const Editor = ({ logout }) => {
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

export default Editor;
