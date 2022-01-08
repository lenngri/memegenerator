import React, { useEffect, useState, useRef } from 'react';
import { useStoreState } from 'easy-peasy';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';

// const C_WITDH = 500;
// const MARGIN = 40;
// const C_HEIGHT = 400 + MARGIN;

const Editor = () => {
  // Source Editor Canvas: https://www.youtube.com/watch?v=-AwG8yF06Po
  const canvas = useRef(null);
  const [memeIndex, setMemeIndex] = useState(0);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeToEdit, setMemeToEdit] = useState(null);
  const imgflipTemplates = useStoreState((state) => state.imgflipTemplates);

  useEffect(() => {
    if (imgflipTemplates.length) {
      const memeToEdit = new Image();
      memeToEdit.src = imgflipTemplates[memeIndex].url;
      memeToEdit.onload = () => setMemeToEdit(memeToEdit);
    }
  }, [imgflipTemplates, memeIndex]);

  useEffect(() => {
    if (memeToEdit && canvas) {
      const scaling = 0.5;
      const editWidth = memeToEdit.naturalWidth * scaling;
      const editHeight = memeToEdit.naturalHeight * scaling;
      const ctx = canvas.current.getContext('2d');
      // ctx.fillStyle = 'black';
      // ctx.fillRect(0, 0, memeToEdit.naturalWidth, memeToEdit.naturalHeight);
      ctx.drawImage(memeToEdit, 0, 0, editWidth, editHeight);

      ctx.font = '32px Comic Sans MS';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';

      ctx.fillText(topText, editWidth / 2, editHeight * 0.1);
      ctx.fillText(bottomText, editWidth / 2, editHeight * 0.9);
    }
  }, [memeToEdit, canvas, topText, bottomText]);

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
          {memeToEdit ? (
            <canvas
              id="canvas"
              ref={canvas}
              width={memeToEdit.naturalWidth * 0.5}
              height={memeToEdit.naturalHeight * 0.5}
            ></canvas>
          ) : (
            <></>
          )}
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
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => {
              setMemeIndex(memeIndex + 1);
            }}
          >
            Next
          </Button>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => {
              setMemeIndex(memeIndex - 1);
            }}
          >
            Previous
          </Button>
          <Button variant="contained" sx={{ mb: 2 }} onClick={downloadMeme}>
            Download
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Editor;
