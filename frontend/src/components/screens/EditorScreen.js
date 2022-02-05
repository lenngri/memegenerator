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
    </div>
  );
};

export default EditorScreen;
