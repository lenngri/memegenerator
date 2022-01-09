import React, { useEffect, useState, useRef } from 'react';
import { useStoreState } from 'easy-peasy';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, TextField, Stack } from '@mui/material';

// const C_WITDH = 500;
// const MARGIN = 40;
// const C_HEIGHT = 400 + MARGIN;

const Editor = ({ templateUrl }) => {
  // Source Editor Canvas: https://www.youtube.com/watch?v=-AwG8yF06Po
  const canvas = useRef(null);
  const [memeIndex, setMemeIndex] = useState(0);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [template, setTemplate] = useState(null);
  console.log(templateUrl);

  useEffect(() => {
    const template = new Image();
    template.src = templateUrl;
    template.onload = () => setTemplate(template);
  }, [templateUrl]);

  useEffect(() => {
    if (template && canvas) {
      const scaling = 0.5;
      const editWidth = template.naturalWidth * scaling;
      const editHeight = template.naturalHeight * scaling;
      const ctx = canvas.current.getContext('2d');
      // ctx.fillStyle = 'black';
      // ctx.fillRect(0, 0, template.naturalWidth, template.naturalHeight);
      ctx.drawImage(template, 0, 0, editWidth, editHeight);

      ctx.font = '32px Comic Sans MS';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';

      ctx.fillText(topText, editWidth / 2, editHeight * 0.1);
      ctx.fillText(bottomText, editWidth / 2, editHeight * 0.9);
    }
  }, [template, canvas, topText, bottomText]);

  // Source: https://developer.mozilla.org/de/docs/Web/API/HTMLCanvasElement/toDataURL (08.01.2021)
  const downloadMeme = () => {
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.getElementById('canvas').toDataURL();
    link.click();
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <Container component="main">
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {template ? (
            <canvas
              id="canvas"
              ref={canvas}
              width={template.naturalWidth * 0.5}
              height={template.naturalHeight * 0.5}
            ></canvas>
          ) : (
            <></>
          )}
          <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 2 }}>
            <TextField
              required
              id="outlined-required"
              label="Top Caption"
              onChange={(e) => setTopText(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Bottom Caption"
              onChange={(e) => setBottomText(e.target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                setMemeIndex(memeIndex + 1);
              }}
            >
              Next
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setMemeIndex(memeIndex - 1);
              }}
            >
              Previous
            </Button>
            <Button variant="contained" sx={{ mb: 2 }} onClick={downloadMeme}>
              Download
            </Button>
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default Editor;
