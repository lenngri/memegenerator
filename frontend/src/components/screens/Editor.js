import React from "react";
import NavBar from "../NavBar";
import VoiceToText from "../VoiceToText";

const Editor = ({ logout }) => {
  return (
    <div
      style={{
        overflow: "hidden",
      }}
    >
      <NavBar logout={logout} />
      <VoiceToText />
    </div>
  );
};

export default Editor;
