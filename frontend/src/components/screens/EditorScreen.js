import React from 'react';
import NavBar from '../NavBar';
import Editor from '../Editor';
import ImgflipSelector from '../imgflipSelector';
import { Container } from '@mui/material';
import LocalFileSelector from '../localfileselector';
import { Box } from '@mui/system';
import URLSelector from '../urlSelector';

const EditorScreen = ({ logout }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <NavBar logout={logout} />
      <Editor />
      <Container sx={{ justifyContent: 'space-around', display: 'flex' }}>
        <ImgflipSelector />
        <LocalFileSelector ButtonText={'Use local file'}></LocalFileSelector>
        <LocalFileSelector ButtonText={'Use from Device'}></LocalFileSelector>
        <URLSelector></URLSelector>
      </Container>
    </div>
  );
};

export default EditorScreen;
