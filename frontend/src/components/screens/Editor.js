import React from "react";
import NavBar from "../NavBar";

const Editor = ({ logout }) => {
  return (
    <div
      style={{
        overflow: "hidden",
      }}
    >
      <NavBar logout={logout} />
    </div>
  );
};

export default Editor;
