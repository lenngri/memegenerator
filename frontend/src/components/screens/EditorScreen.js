import React, { useState } from 'react';
import NavBar from '../NavBar';
import Editor from '../Editor';
import { Box } from '@mui/system';
import { Container, ImageList, ImageListItem } from '@mui/material';
import { useStoreState } from 'easy-peasy';

const EditorScreen = ({ logout }) => {
  const [templateUrl, setTemplateUrl] = useState(null);
  const imgflipTemplates = useStoreState((state) => state.imgflipTemplates);

  return (
    <div style={{ overflow: 'hidden' }}>
      <NavBar logout={logout} />
      <Editor templateUrl={templateUrl} />
      <Container sx={{ justifyContent: 'center', display: 'flex' }}>
        <Box>
          <ImageList variant="masonry" cols={3} gap={8}>
            {imgflipTemplates.map((item) => (
              <ImageListItem key={item.id}>
                <img
                  src={item.url}
                  alt={item.name}
                  onClick={(e) => setTemplateUrl(e.target.src)}
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
