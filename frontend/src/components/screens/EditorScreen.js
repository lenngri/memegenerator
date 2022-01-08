import React from 'react';
import NavBar from '../NavBar';
import Editor from '../Editor';

const EditorScreen = ({ logout }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <NavBar logout={logout} />
      <Editor />
    </div>
  );
};

export default EditorScreen;
