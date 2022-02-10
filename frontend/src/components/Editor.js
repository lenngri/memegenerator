import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva'; // Source: https://konvajs.org/ (13.01.2022)
import { useStoreState, useStoreActions } from 'easy-peasy';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, TextField, Stack, Typography } from '@mui/material';
import { CompactPicker } from 'react-color';

const C_WIDTH = 600;
const C_HEIGHT = 600;

const Editor = () => {
  // Source Editor Canvas: https://www.youtube.com/watch?v=-AwG8yF06Po
  const stageRef = useRef(null);
  const setStageRef = useStoreActions((actions) => actions.setStageRef);
  // captions state
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [midText, setMidText] = useState('');
  // text style state
  const [fontSize, setFontSize] = useState(30);
  const [captionColor, setColor] = useState('black');
  const [fontStyle, setFontStyle] = useState('bold');
  const [editorDims, setEditorDims] = useState({ width: C_WIDTH, height: C_HEIGHT });

  // load memeToEdit from store
  const memeToEdit = useStoreState((state) => state.memeToEdit);

  useEffect(() => {
    if (memeToEdit) {
      if (memeToEdit.naturalWidth > C_WIDTH) {
        setEditorDims({
          width: C_WIDTH,
          height: (memeToEdit.naturalHeight * C_WIDTH) / memeToEdit.naturalWidth,
        });
      } else {
        setEditorDims({
          width: memeToEdit.naturalWidth,
          height: memeToEdit.naturalHeight,
        });
      }
    }
    setStageRef(stageRef);
  }, [memeToEdit, setStageRef]);

  // Source for cursor event handling: https://konvajs.org/docs/styling/Mouse_Cursor.html (13.01.2022)
  const grabCursor = () => {
    stageRef.current.container().style.cursor = 'grab';
  };

  const defaultCursor = () => {
    stageRef.current.container().style.cursor = 'default';
  };

  // clears all captions from the Editor
  const handleClearEditor = () => {
    setTopText('');
    setMidText('');
    setBottomText('');
    setColor('black');
    setFontStyle('bold');
    setFontSize('30');
  };

  const captionProps = {
    align: 'center',
    fontSize: fontSize,
    fontFamily: 'Verdana',
    fontStyle: fontStyle,
    fill: captionColor,
    stroke: 'white',
    strokeWidth: 1.5,
    onMouseEnter: grabCursor,
    onMouseLeave: defaultCursor,
    draggable: true,
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
            mb: 3,
          }}
        >
          {memeToEdit ? (
            <Box boxShadow={2}>
              <Stage ref={stageRef} width={editorDims.width} height={editorDims.height}>
                <Layer>
                  <Image image={memeToEdit} width={editorDims.width} height={editorDims.height} />
                  <Text
                    x={editorDims.width * 0.25}
                    y={editorDims.height * 0.1}
                    text={topText}
                    {...captionProps}
                  ></Text>
                  <Text
                    x={editorDims.width * 0.25}
                    y={editorDims.height * 0.9}
                    text={bottomText}
                    {...captionProps}
                  ></Text>
                  <Text
                    x={editorDims.width * 0.25}
                    y={editorDims.height * 0.5}
                    text={midText}
                    {...captionProps}
                  ></Text>
                </Layer>
              </Stage>
            </Box>
          ) : (
            <>
              <Typography variant='body1' color='gray' gutterBottom component='div'>
                Please choose a memeToEdit first.
              </Typography>
            </>
          )}
          <Stack direction='row' spacing={1} sx={{ mt: 3, mb: 2 }}>
            <TextField
              disabled={!memeToEdit ? true : false}
              required
              id='outlined-required'
              label='Caption 1'
              onChange={(e) => setTopText(e.target.value)}
            />
            <TextField
              disabled={!memeToEdit ? true : false}
              required
              id='outlined-required'
              label='Caption 2'
              onChange={(e) => setBottomText(e.target.value)}
            />
            <TextField
              disabled={!memeToEdit ? true : false}
              required
              id='outlined-required'
              label='Caption 3'
              onChange={(e) => setMidText(e.target.value)}
            />
            <Button
              disabled={!memeToEdit ? true : false}
              variant='contained'
              onClick={handleClearEditor}
            >
              Clear
            </Button>
          </Stack>
          <Stack direction='row' spacing={1} sx={{ mb: 2 }}>
            <TextField
              disabled={!memeToEdit ? true : false}
              id='outlined-number'
              label='Font Size'
              type='number'
              defaultValue={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              disabled={!memeToEdit ? true : false}
              variant='contained'
              onClick={() => setFontStyle('bold')}
            >
              Bold
            </Button>
            <Button
              disabled={!memeToEdit ? true : false}
              variant='contained'
              onClick={() => setFontStyle('italic')}
            >
              Italic
            </Button>
            <Button
              disabled={!memeToEdit ? true : false}
              variant='contained'
              onClick={() => setFontStyle('bold italic')}
            >
              Bold Italic
            </Button>
            <Button
              disabled={!memeToEdit ? true : false}
              variant='contained'
              onClick={() => setFontStyle('normal')}
            >
              Normal
            </Button>
          </Stack>
          <CompactPicker color={captionColor} onChange={(color) => setColor(color.hex)} />
        </Box>
      </Container>
    </div>
  );
};

export default Editor;
