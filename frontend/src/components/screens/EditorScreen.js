import React from 'react';
import NavBar from '../NavBar';
import Editor from '../Editor';
import Download from '../Download';
import ImgflipSelector from '../ImgflipSelector';
import { Container, Stack } from '@mui/material';

const EditorScreen = ({ logout }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <NavBar logout={logout} />
      <Editor />
      <Container sx={{ justifyContent: 'center', display: 'flex' }}>
        <Stack direction="row" spacing={1} sx={{ my: 3 }}>
          <ImgflipSelector />
          <Download />
        </Stack>
      </Container>
    </div>
  );
};

export default EditorScreen;
