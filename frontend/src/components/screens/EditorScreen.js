import React from 'react';
import NavBar from '../NavBar';
import Editor from '../Editor';
import ImgflipSelector from '../imgflipSelector';
import { Container, Stack } from '@mui/material';
import LocalFileSelector from '../localfileselector';
import URLSelector from '../urlSelector';
import Download from '../Download';

const EditorScreen = ({ logout }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <NavBar logout={logout} />
      <Editor />
      <Container sx={{ justifyContent: 'space-around', display: 'flex' }}>
        <Stack direction="row" spacing={1} sx={{ my: 3 }}>
          <ImgflipSelector />
          <LocalFileSelector ButtonText={'Use local file'}></LocalFileSelector>
          <LocalFileSelector ButtonText={'Use from Device'}></LocalFileSelector>
          <URLSelector></URLSelector>
          <Download />
        </Stack>
      </Container>
    </div>
  );
};

export default EditorScreen;
