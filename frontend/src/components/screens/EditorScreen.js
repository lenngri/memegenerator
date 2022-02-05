import React from 'react';
import { Container, Stack } from '@mui/material';
import NavBar from '../NavBar';
import Editor from '../Editor';
import ServerTemplateSelector from '../ServerTemplateSelector';
import ImgflipSelector from '../ImgflipSelector';
import LocalFileSelector from '../LocalFileSelector';
import URLSelector from '../UrlSelector';
import Download from '../Download';
import CameraUpload from '../CameraUpload';
import DrawTemplateSelector from '../DrawTemplateSelector';

const EditorScreen = ({ logout }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <NavBar logout={logout} />
      <Container sx={{ justifyContent: 'space-around', display: 'flex' }}>
        <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
          <ServerTemplateSelector />
          <ImgflipSelector />
          <LocalFileSelector ButtonText={'Use local file'}></LocalFileSelector>
          <URLSelector></URLSelector>
          <CameraUpload></CameraUpload>
          <DrawTemplateSelector ButtonText={'Draw Meme'}></DrawTemplateSelector>
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
