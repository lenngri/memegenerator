import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva'; // Source: https://konvajs.org/ (13.01.2022)
import { useStoreState, useStoreActions } from 'easy-peasy';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, TextField, Stack, Typography } from '@mui/material';
import { CompactPicker } from 'react-color';
import getCaptions from '../tools/getCaptions';

const C_WIDTH = 600;
const C_HEIGHT = 600;

const Editor = () => {
  // Source Editor Canvas: https://www.youtube.com/watch?v=-AwG8yF06Po
  const stageRef = useRef(null);
  const setStageRef = useStoreActions((actions) => actions.setStageRef);
  const setEditorState = useStoreActions((actions) => actions.setEditorState);
  // captions state
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [midText, setMidText] = useState('');
  // text style state
  const [fontSize, setFontSize] = useState(30);
  const [captionColor, setColor] = useState('black');
  const [fontStyle, setFontStyle] = useState('bold');
  const [outlined, setOutlined] = useState(true);
  const [editorDims, setEditorDims] = useState({ width: C_WIDTH, height: C_HEIGHT });

  // load image from store

  const { image, memeObject } = useStoreState((state) => state.editor);

  // if memeObject is available, load its state to the editor to continue editing
  useEffect(() => {
    if (image && memeObject) {
      console.log('Meme object available. Load state to editor.');
      const captionsArray = getCaptions(memeObject.konva);
      console.log(captionsArray);
      setTopText(captionsArray[0]);
      setBottomText(captionsArray[1]);
      setMidText(captionsArray[2]);
    }
  }, [image, memeObject]);

  useEffect(() => {
    if (image) {
      if (image.naturalWidth > C_WIDTH) {
        setEditorDims({
          width: C_WIDTH,
          height: (image.naturalHeight * C_WIDTH) / image.naturalWidth,
        });
      } else {
        setEditorDims({
          width: image.naturalWidth,
          height: image.naturalHeight,
        });
      }
    }
    setStageRef(stageRef);
  }, [image, setStageRef]);

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
    setOutlined('true');
    setEditorState({ memeObject: null });
  };

  let stroke;
  if (outlined) stroke = 'white';
  else stroke = undefined;

  const captionProps = {
    align: 'center',
    fontSize: Number(fontSize),
    fontFamily: 'Verdana',
    fontStyle: fontStyle,
    fill: captionColor,
    stroke: stroke,
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
          {image ? (
            <Box boxShadow={2}>
              <Stage ref={stageRef} width={editorDims.width} height={editorDims.height}>
                <Layer>
                  <Image image={image} width={editorDims.width} height={editorDims.height} />
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
                Please choose a template first.
              </Typography>
            </>
          )}
          <Stack direction='row' spacing={1} sx={{ mt: 3, mb: 2 }}>
            <TextField
              value={topText}
              disabled={!image ? true : false}
              size='small'
              id='outlined-required'
              label='Caption 1'
              onChange={(e) => setTopText(e.target.value)}
            />
            <TextField
              value={bottomText}
              disabled={!image ? true : false}
              size='small'
              id='outlined-required'
              label='Caption 2'
              onChange={(e) => setBottomText(e.target.value)}
            />
            <TextField
              value={midText}
              disabled={!image ? true : false}
              size='small'
              id='outlined-required'
              label='Caption 3'
              onChange={(e) => setMidText(e.target.value)}
            />
            <Button
              disabled={!image ? true : false}
              variant='contained'
              onClick={handleClearEditor}
            >
              Clear
            </Button>
          </Stack>
          <Stack direction='row' spacing={1} sx={{ mb: 2 }}>
            <TextField
              disabled={!image ? true : false}
              id='outlined-number'
              label='Font Size'
              type='number'
              size='small'
              width={10}
              defaultValue={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              color={fontStyle === 'bold' ? 'success' : 'primary'}
              disabled={!image ? true : false}
              variant='contained'
              onClick={() => setFontStyle('bold')}
            >
              Bold
            </Button>
            <Button
              color={fontStyle === 'italic' ? 'success' : 'primary'}
              disabled={!image ? true : false}
              variant='contained'
              onClick={() => setFontStyle('italic')}
            >
              Italic
            </Button>
            <Button
              color={fontStyle === 'bold italic' ? 'success' : 'primary'}
              disabled={!image ? true : false}
              variant='contained'
              onClick={() => setFontStyle('bold italic')}
            >
              Bold Italic
            </Button>
            <Button
              color={fontStyle === 'normal' ? 'success' : 'primary'}
              disabled={!image ? true : false}
              variant='contained'
              onClick={() => setFontStyle('normal')}
            >
              Normal
            </Button>
            <Button
              color={outlined ? 'success' : 'primary'}
              disabled={!image ? true : false}
              variant='contained'
              onClick={() => setOutlined(!outlined)}
            >
              Outlined
            </Button>
          </Stack>
          <CompactPicker color={captionColor} onChange={(color) => setColor(color.hex)} />
        </Box>
      </Container>
    </div>
  );
};

export default Editor;
