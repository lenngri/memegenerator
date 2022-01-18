import React from 'react';
import NavBar from '../NavBar';
import Editor from '../Editor';
import ImgflipSelector from '../imgflipSelector';
import { Container, Stack } from '@mui/material';
import LocalFileSelector from '../localfileselector';
import URLSelector from '../urlSelector';
import Download from '../Download';
import DrawCanvasContainer from '../drawcanvascontainer';

const EditorScreen = ({ logout }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <NavBar logout={logout} />
      <Container sx={{ justifyContent: 'space-around', display: 'flex' }}>
        <Stack direction='row' spacing={1} sx={{ mt: 3 }}>
          <ImgflipSelector />
          <LocalFileSelector ButtonText={'Use local file'}></LocalFileSelector>
          <URLSelector></URLSelector>
          <DrawCanvasContainer ButtonText={'Draw Meme'}></DrawCanvasContainer>
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
