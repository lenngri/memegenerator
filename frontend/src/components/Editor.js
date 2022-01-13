import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import { useStoreState } from 'easy-peasy';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, TextField, Stack, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

// const C_WITDH = 500;
// const MARGIN = 40;
// const C_HEIGHT = 400 + MARGIN;

const Editor = () => {
  // Source Editor Canvas: https://www.youtube.com/watch?v=-AwG8yF06Po
  const stageRef = useRef(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  // load template from store
  const template = useStoreState((state) => state.template);

  useEffect(() => {
    if (template) {
      const stage = stageRef.current;
      console.log(stage);
    }
  }, [template, stageRef]);

  // Source: https://developer.mozilla.org/de/docs/Web/API/HTMLCanvasElement/toDataURL (08.01.2021)
  const downloadMeme = () => {
    var link = document.createElement('a');
    link.download = 'yourmeme.png';
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
            <Box boxShadow={2}>
              <Stage ref={stageRef} width={template.naturalWidth} height={template.naturalHeight}>
                <Layer>
                  <Image
                    image={template}
                    width={template.naturalWidth}
                    height={template.naturalHeight}
                  />
                  <Text
                    text={topText}
                    fontSize={30}
                    fontFamily="Verdana"
                    fontStyle="bold"
                    stroke="white"
                    strokeWidth={1}
                    draggable
                  ></Text>
                  <Text
                    text={bottomText}
                    fontSize={30}
                    fontFamily="Verdana"
                    fontStyle="bold"
                    stroke="white"
                    strokeWidth={1}
                    draggable
                  ></Text>
                </Layer>
              </Stage>
            </Box>
          ) : (
            <>
              <Typography variant="body1" color="gray" gutterBottom component="div">
                Please choose a template below.
              </Typography>
            </>
          )}
          <Stack direction="row" spacing={1} sx={{ mt: 3, mb: 2 }}>
            <TextField
              disabled={!template ? true : false}
              required
              id="outlined-required"
              label="Caption 1"
              onChange={(e) => setTopText(e.target.value)}
            />
            <TextField
              disabled={!template ? true : false}
              required
              id="outlined-required"
              label="Caption 2"
              onChange={(e) => setBottomText(e.target.value)}
            />
            <Button
              disabled={!template ? true : false}
              variant="contained"
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
