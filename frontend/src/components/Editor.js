import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';

const Editor = () => {
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);

  const updateCaption = (e, index) => {
    const text = e.target.value || '';
    setCaptions(
      captions.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  // const generateMeme = () => {
  //   const currentMeme = memes[memeIndex];
  //   const formData = new FormData();

  //   formData.append('username', 'derBolide');
  //   formData.append('password', 'vpfCWA9Ah4XeX8w');
  //   formData.append('template_id', currentMeme.id);
  //   captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));

  //   fetch('https://api.imgflip.com/caption_image', {
  //     method: 'POST',
  //     body: formData,
  //   }).then((res) => {
  //     res.json().then((res) => {
  //       console.log(res);
  //     });
  //   });
  // };

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((res) => {
        const memes = res.data.memes;
        setMemes(memes);
      });
  }, []);

  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(''));
    }
  }, [memeIndex, memes]);

  useEffect(() => {
    console.log(captions);
  }, [captions]);

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
          {memes.length ? (
            <div>
              <img
                src={memes[memeIndex].url}
                alt="meme"
                style={{ maxHeight: 500, maxwidth: 500 }}
              />
            </div>
          ) : (
            <></>
          )}
          {captions.map((c, index) => (
            <TextField
              required
              id="outlined-required"
              label="Caption"
              onChange={(e) => updateCaption(e, index)}
              key={index}
              sx={{ mt: 2, mb: 2 }}
            />
          ))}
          <Button variant="contained" color="success" sx={{ mb: 2 }}>
            Generate
          </Button>
          <Button
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
