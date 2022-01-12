import React, { useEffect, useState, useRef } from 'react';
import { useStoreState } from 'easy-peasy';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {
  Button,
  TextField,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';

// const C_WITDH = 500;
// const MARGIN = 40;
// const C_HEIGHT = 400 + MARGIN;

const Editor = () => {
  // Source Editor Canvas: https://www.youtube.com/watch?v=-AwG8yF06Po
  const canvas = useRef(null);

  // set top text state
  const [topText, setTopText] = useState('');
  const [moveTopText, setMoveTopText] = useState(false);
  const [topTextPosition, setTopTextPosition] = useState({ x: 100, y: 50 });

  // set bottom text state
  const [bottomText, setBottomText] = useState('');
  const [moveBottomText, setMoveBottomText] = useState(false);
  const [bottomTextPosition, setBottomTextPosition] = useState({
    x: 100,
    y: 100,
  });

  // load template from store
  const template = useStoreState((state) => state.template);

  useEffect(
    () => {
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

        // setTopTextPosition({ x: editWidth / 2, y: editHeight * 0.1 });
        ctx.fillText(topText, topTextPosition.x, topTextPosition.y);
        ctx.fillText(bottomText, bottomTextPosition.x, bottomTextPosition.y);
      }
    },
    [
      template,
      canvas,
      topText,
      topTextPosition.x,
      topTextPosition.y,
      bottomTextPosition.x,
      bottomText,
      bottomTextPosition.y,
    ],
    console.log(template)
  );

  const moveText = (e) => {
    if (moveTopText) {
      setTopTextPosition({
        x: e.clientX - e.target.offsetLeft,
        y: e.clientY - e.target.offsetTop,
      });
    }
    if (moveBottomText) {
      setBottomTextPosition({
        x: e.clientX - e.target.offsetLeft,
        y: e.clientY - e.target.offsetTop,
      });
    }
  };

  // Source: https://developer.mozilla.org/de/docs/Web/API/HTMLCanvasElement/toDataURL (08.01.2021)
  const downloadMeme = () => {
    var link = document.createElement('a');
    link.download = 'yourmeme.png';
    link.href = document.getElementById('canvas').toDataURL();
    link.click();
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <Container component='main'>
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
            <Box boxShadow={2}>
              <canvas
                id='canvas'
                style={{ cursor: 'crosshair' }}
                ref={canvas}
                width={template.naturalWidth * 0.5}
                height={template.naturalHeight * 0.5}
                onMouseMove={moveText}
                onClick={(e) => {
                  moveTopText
                    ? setMoveTopText(false)
                    : setMoveBottomText(false);
                }}
              ></canvas>
            </Box>
          ) : (
            <>
              <Typography
                variant='body1'
                color='gray'
                gutterBottom
                component='div'
              >
                Please choose a template below.
              </Typography>
            </>
          )}
          <Stack direction='row' spacing={1} sx={{ mt: 3, mb: 2 }}>
            <TextField
              disabled={!template ? true : false}
              required
              id='outlined-required'
              label='Caption 1'
              onChange={(e) => setTopText(e.target.value)}
            />
            <Tooltip title='Move Caption 1' placement='top' arrow>
              <IconButton onClick={() => setMoveTopText(true)}>
                <ControlCameraIcon
                  color={moveTopText ? 'primary' : 'gray'}
                ></ControlCameraIcon>
              </IconButton>
            </Tooltip>
            <TextField
              disabled={!template ? true : false}
              required
              id='outlined-required'
              label='Caption 2'
              onChange={(e) => setBottomText(e.target.value)}
            />
            <Tooltip title='Move Caption 2' placement='top' arrow>
              <IconButton onClick={() => setMoveBottomText(true)}>
                <ControlCameraIcon
                  color={moveBottomText ? 'primary' : 'gray'}
                ></ControlCameraIcon>
              </IconButton>
            </Tooltip>
            <Button
              disabled={!template ? true : false}
              variant='contained'
              sx={{ mb: 2 }}
              onClick={downloadMeme}
              startIcon={<DownloadIcon />}
            >
              Download
            </Button>
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default Editor;
