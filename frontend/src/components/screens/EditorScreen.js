import React from 'react';
import NavBar from '../NavBar';
import Editor from '../Editor';
import ImgflipSelector from '../ImgflipSelector';
import { Container, Stack } from '@mui/material';
import LocalFileSelector from '../LocalFileSelector';
import URLSelector from '../UrlSelector';
import Download from '../Download';

const EditorScreen = ({ logout }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <NavBar logout={logout} />
      <Container sx={{ justifyContent: 'space-around', display: 'flex' }}>
        <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
          <ImgflipSelector />
          <LocalFileSelector ButtonText={'Use local file'}></LocalFileSelector>
          <URLSelector></URLSelector>
        </Stack>
      </Container>
      <Editor />
      <Container sx={{ justifyContent: 'space-around', display: 'flex' }}>
        <Download />
      </Container>
    </div>
  );
};

export default EditorScreen;
