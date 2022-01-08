import React, { useEffect, useState, useRef } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';

const C_WITDH = 400;
const Y_MARGIN = 80;
const C_HEIGHT = 256 + Y_MARGIN;

const Editor = () => {
  // Source Editor Canvas: https://www.youtube.com/watch?v=-AwG8yF06Po
  const canvas = useRef(null);
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((res) => {
        const memes = res.data.memes;
        console.log(memes);
        setMemes(memes);
      });
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = 'https://thiscatdoesnotexist.com/';
    image.onload = () => setCurrentImage(image);
  }, []);

  useEffect(() => {
    if (currentImage && canvas) {
      const ctx = canvas.current.getContext('2d');
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, C_WITDH, C_HEIGHT);
      console.log(currentImage);
      ctx.drawImage(currentImage, (C_WITDH - C_HEIGHT + Y_MARGIN) / 2, Y_MARGIN / 2);

      ctx.font = '20px Comic Sans MS';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';

      ctx.fillText(topText, C_WITDH / 2, C_HEIGHT * 0.1);
      ctx.fillText(bottomText, C_WITDH / 2, C_HEIGHT * 0.9);
    }
  }, [currentImage, canvas, topText, bottomText, memes]);

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
