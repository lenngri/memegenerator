import React from 'react';
import NavBar from '../NavBar';
import Editor from '../KonvaEditor';
import ImgflipSelector from '../imgflipSelector';
import { Container } from '@mui/material';

const EditorScreen = ({ logout }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <NavBar logout={logout} />
      <Editor />
      <Container sx={{ justifyContent: 'center', display: 'flex' }}>
        <ImgflipSelector />
      </Container>
    </div>
  );
};

export default EditorScreen;
