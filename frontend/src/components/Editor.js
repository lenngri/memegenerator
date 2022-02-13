import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image, Text, Rect } from 'react-konva'; // Source: https://konvajs.org/ (13.01.2022)
import { useStoreState, useStoreActions } from 'easy-peasy';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, TextField, Stack, Typography } from '@mui/material';
import { CompactPicker } from 'react-color';
import getAttributes from '../tools/getAttributes';

const C_WIDTH = 600;
const C_HEIGHT = 600;

const Editor = () => {
  // Source Editor Canvas: https://www.youtube.com/watch?v=-AwG8yF06Po
  const stageRef = useRef(null);
  const setStageRef = useStoreActions((actions) => actions.setStageRef);
  const setEditorState = useStoreActions((actions) => actions.setEditorState);
  // captions state
  const [topText, setTopText] = useState('');
  const [topTextPosition, setTopTextPosition] = useState(null);
  const [bottomText, setBottomText] = useState('');
  const [bottomTextPosition, setBottomTextPosition] = useState(null);
  const [midText, setMidText] = useState('');
  const [midTextPosition, setMidTextPosition] = useState(null);
  // text style state
  const [fontSize, setFontSize] = useState(26);
  const [captionColor, setColor] = useState('black');
  const [fontStyle, setFontStyle] = useState('bold');
  const [outlined, setOutlined] = useState(true);
  // editor dimensions state
  const [editorDims, setEditorDims] = useState({ width: C_WIDTH, height: C_HEIGHT });
  const [canvasWidth, setCanvasWidth] = useState(C_WIDTH);
  const [canvasHeight, setCanvasHeight] = useState(C_HEIGHT);

  // load image from store

  const { image, memeObject } = useStoreState((state) => state.editor);
  console.log(canvasWidth, canvasHeight);
  // if memeObject is available, load its state to the editor to continue editing
  useEffect(() => {
    if (image && memeObject) {
      console.log('Meme object available. Load state to editor.');
      const attrsArray = getAttributes(memeObject.konva);
      // set individual text
      setTopText(attrsArray[0].text);
      setTopTextPosition({ x: attrsArray[0].x, y: attrsArray[0].y });
      setBottomText(attrsArray[1].text);
      setBottomTextPosition({ x: attrsArray[1].x, y: attrsArray[1].y });
      setMidText(attrsArray[2].text);
      setMidTextPosition({ x: attrsArray[2].x, y: attrsArray[2].y });
      // set joint attributes
      setFontSize(attrsArray[0].fontSize);
      setColor(attrsArray[0].fill);
      setFontStyle(attrsArray[0].fontStyle);
      if (attrsArray[0].stroke === 'white') setOutlined(true);
      else setOutlined(false);
    }
  }, [image, memeObject]);

  if (stageRef) console.log(stageRef.current);

  useEffect(() => {
    if (image) {
      setEditorDims({
        width: image.width,
        height: image.height,
      });
      setCanvasWidth(image.width);
      setCanvasHeight(image.height);
      // if (image.naturalWidth > C_WIDTH) {
      //   setEditorDims({
      //     width: C_WIDTH,
      //     height: (image.naturalHeight * C_WIDTH) / image.naturalWidth,
      //   });
      // } else {
      //   setEditorDims({
      //     width: image.naturalWidth,
      //     height: image.naturalHeight,
      //   });
      // }
    }

    setStageRef(stageRef);
    console.log(stageRef.current);
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
    setFontSize(26);
    setOutlined('true');
    setEditorState({ memeObject: null });
  };

  let stroke;
  if (outlined) stroke = 'white';
  else stroke = undefined;

  const captionProps = {
    fontSize: Number(fontSize),
    fontFamily: 'Verdana',
    fontStyle: fontStyle,
    fill: captionColor,
    stroke: stroke,
    strokeWidth: 1.5,
  };
  const staticCaptionProps = {
    align: 'center',
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
              <Stage ref={stageRef} width={canvasWidth} height={canvasHeight}>
                <Layer>
                  <Rect width={canvasWidth} height={canvasHeight} fill='white'></Rect>
                  <Image image={image} width={editorDims.width} height={editorDims.height} />
                  <Text
                    id='caption'
                    x={topTextPosition ? topTextPosition.x : editorDims.width * 0.25}
                    y={topTextPosition ? topTextPosition.y : editorDims.height * 0.1}
                    text={topText}
                    {...captionProps}
                    {...staticCaptionProps}
                  ></Text>
                  <Text
                    id='caption'
                    x={bottomTextPosition ? bottomTextPosition.x : editorDims.width * 0.25}
                    y={bottomTextPosition ? bottomTextPosition.y : editorDims.height * 0.9}
                    text={bottomText}
                    {...captionProps}
                    {...staticCaptionProps}
                  ></Text>
                  <Text
                    id='caption'
                    x={midTextPosition ? midTextPosition.x : editorDims.width * 0.25}
                    y={midTextPosition ? midTextPosition.y : editorDims.height * 0.5}
                    text={midText}
                    {...captionProps}
                    {...staticCaptionProps}
                  ></Text>
                </Layer>
              </Stage>
            </Box>
          ) : (
            <>
              <Box width={600} height={400} boxShadow={1}>
                <Container sx={{ textAlign: 'center', my: 20 }}>
                  <Typography variant='body1' color='gray' gutterBottom component='div'>
                    Please choose a template first...
                  </Typography>
                </Container>
              </Box>
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
              value={fontSize}
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
          <Stack direction='row' spacing={1} sx={{ mt: 3, mb: 2 }}>
            <TextField
              disabled={!image ? true : false}
              value={canvasWidth}
              size='small'
              id='outlined-required'
              label='Width'
              type='number'
              onChange={(e) => setCanvasWidth(Number(e.target.value))}
            />
            <TextField
              disabled={!image ? true : false}
              value={canvasHeight}
              size='small'
              id='outlined-required'
              label='Height'
              type='number'
              onChange={(e) => setCanvasHeight(Number(e.target.value))}
            />
            <Button
              disabled={!image ? true : false}
              variant='contained'
              onClick={handleClearEditor}
            >
              Append Images
            </Button>
          </Stack>
          <CompactPicker color={captionColor} onChange={(color) => setColor(color.hex)} />
        </Box>
      </Container>
    </div>
  );
};

export default Editor;
