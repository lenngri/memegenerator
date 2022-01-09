import React from 'react';
import NavBar from '../NavBar';
import Editor from '../Editor';
import { Box } from '@mui/system';
import { Container, ImageList, ImageListItem } from '@mui/material';
import { useStoreState, useStoreActions } from 'easy-peasy';

const EditorScreen = ({ logout }) => {
  const setTemplate = useStoreActions((actions) => actions.setTemplate);
  const imgflipTemplates = useStoreState((state) => state.imgflipTemplates);

  return (
    <div style={{ overflow: 'hidden' }}>
      <NavBar logout={logout} />
      <Editor />

      <Container sx={{ justifyContent: 'center', display: 'flex' }}>
        <Box>
          <ImageList variant="masonry" cols={3} gap={8}>
            {imgflipTemplates.map((item) => (
              <ImageListItem key={item.id}>
                <img
                  src={item.url}
                  alt={item.name}
                  onClick={(e) => setTemplate(e.target)}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Container>
    </div>
  );
};

export default EditorScreen;
