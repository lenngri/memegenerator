import React, { useEffect, useState, useRef } from 'react';
import { useStoreState } from 'easy-peasy';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';

const C_WITDH = 500;
const MARGIN = 40;
const C_HEIGHT = 400 + MARGIN;

const Editor = () => {
  // Source Editor Canvas: https://www.youtube.com/watch?v=-AwG8yF06Po
  const canvas = useRef(null);
  const [memeIndex, setMemeIndex] = useState(0);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [currentImage, setCurrentImage] = useState(null);
  const imgflipTemplates = useStoreState((state) => state.imgflipTemplates);

  useEffect(() => {
    if (imgflipTemplates.length) {
      const image = new Image();
      image.src = imgflipTemplates[0].url;
      image.onload = () => setCurrentImage(image);
    }
  }, [imgflipTemplates]);

  useEffect(() => {
    if (currentImage && canvas) {
      const ctx = canvas.current.getContext('2d');
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, C_WITDH, C_HEIGHT);
      ctx.drawImage(currentImage, (C_WITDH - C_HEIGHT + MARGIN) / 2, MARGIN / 2);

      ctx.font = '20px Comic Sans MS';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';

      ctx.fillText(topText, C_WITDH / 2, C_HEIGHT * 0.1);
      ctx.fillText(bottomText, C_WITDH / 2, C_HEIGHT * 0.9);
    }
  }, [currentImage, canvas, topText, bottomText]);

  return (
    <div style={{ overflow: 'hidden' }}>
      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <canvas ref={canvas} width={C_WITDH} height={C_HEIGHT}></canvas>
          <TextField
            required
            id="outlined-required"
            label="Caption"
            onChange={(e) => setTopText(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            required
            id="outlined-required"
            label="Caption"
            onChange={(e) => setBottomText(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          <Button disabled variant="contained" color="success" sx={{ mb: 2 }}>
            Generate
          </Button>
          <Button
            disabled
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => {
              setMemeIndex(memeIndex + 1);
            }}
          >
            Skip
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Editor;
