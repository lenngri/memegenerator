import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva'; // Source: https://konvajs.org/ (13.01.2022)
import { useStoreState } from 'easy-peasy';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, TextField, Stack, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const C_WIDTH = 600;
const C_HEIGHT = 600;

const Editor = () => {
  // Source Editor Canvas: https://www.youtube.com/watch?v=-AwG8yF06Po
  const stageRef = useRef(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [editorDims, setEditorDims] = useState({ width: C_WIDTH, height: C_HEIGHT });

  // load template from store
  const template = useStoreState((state) => state.template);

  useEffect(() => {
    if (template) {
      if (template.naturalWidth > C_WIDTH) {
        setEditorDims({
          width: C_WIDTH,
          height: (template.naturalHeight * C_WIDTH) / template.naturalWidth,
        });
      } else {
        setEditorDims({
          width: template.naturalWidth,
          height: template.naturalHeight,
        });
      }
    }
  }, [template]);

  // Source: https://developer.mozilla.org/de/docs/Web/API/HTMLCanvasElement/toDataURL (08.01.2021)
  const downloadMeme = () => {
    var link = document.createElement('a');
    link.download = 'yourmeme.png';
    console.log(stageRef.current.toJSON());
    link.href = stageRef.current.toDataURL({
      mimeType: 'image/png',
      quality: 1.0,
    });
    link.click();
  };
  // Source for cursor event handling: https://konvajs.org/docs/styling/Mouse_Cursor.html (13.01.2022)
  const grabCursor = () => {
    stageRef.current.container().style.cursor = 'grab';
  };

  const defaultCursor = () => {
    stageRef.current.container().style.cursor = 'default';
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
              <Stage ref={stageRef} width={editorDims.width} height={editorDims.height}>
                <Layer>
                  <Image image={template} width={editorDims.width} height={editorDims.height} />
                  <Text
                    x={editorDims.width * 0.25}
                    y={editorDims.height * 0.1}
                    text={topText}
                    align="center"
                    fontSize={30}
                    fontFamily="Verdana"
                    fontStyle="bold"
                    stroke="white"
                    strokeWidth={1}
                    onMouseEnter={grabCursor}
                    onMouseLeave={defaultCursor}
                    draggable
                  ></Text>
                  <Text
                    x={editorDims.width * 0.25}
                    y={editorDims.height * 0.9}
                    text={bottomText}
                    align="center"
                    fontSize={30}
                    fontFamily="Verdana"
                    fontStyle="bold"
                    stroke="white"
                    strokeWidth={1}
                    onMouseEnter={grabCursor}
                    onMouseLeave={defaultCursor}
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
