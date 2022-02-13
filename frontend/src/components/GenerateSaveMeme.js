import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Box, Slider, Button, TextField, IconButton, Stack } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';
import marks from '../tools/sliderMarks';
import getCaptions from '../tools/getCaptions';

const GenerateSaveMeme = () => {
  // central state
  const editorState = useStoreState((state) => state.editor);
  const stageRef = useStoreState((state) => state.editor.stageRef);
  const setEditorState = useStoreActions((actions) => actions.setEditorState);
  const user = useStoreState((state) => state.userSession.user);

  // local state
  const [open, setOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(100);
  const [title, setTitle] = useState('Title');
  const [description, setDescription] = useState('Description');
  const [isDraft, setIsDraft] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [success, setSuccess] = useState(false);
  // IN CASE OF MANAGING THE generateServer Flag via local state
  // const [generateServer, setGenerateServer] = useState(false);

  const clearState = () => {
    setTitle('Title');
    setDescription('Description');
    setIsDraft(false);
    setIsHidden(false);
    setIsPrivate(false);
    // setGenerateServer(false);
  };

  const handleClose = () => {
    clearState();
    setOpen(!open);
  };

  const handleUploadMeme = async (generateServer) => {
    // check, whether the template is new
    if (editorState.templateNew) {
      // if the template is new, get background of canvas as dataURL
      const templateDataURL = stageRef.current.getLayers()[0].toDataURL({
        mimeType: 'image/jpeg',
        quality: 1.0,
      });

      // set the new dataURL to the templateObject
      editorState.templateObject.template = templateDataURL;

      // send the template to the server
      try {
        const templateResponse = await axios.post(
          process.env.REACT_APP_BURL + '/api/template/uploadSingle',
          editorState.templateObject
        );
        console.log('Sent new template, server responeded:', templateResponse);
        sendMeme(templateResponse.data._id, generateServer);
      } catch (error) {
        alert('Something went wrong, please try again.');
        console.log(error);
      }
    } else {
      console.log('Existing template with ID:', editorState.templateObject.templateID);
      sendMeme(editorState.templateObject._id, generateServer);
    }

    // clear the state and close dialog
    clearState();
    setOpen(!open);
  };

  const sendMeme = (templateID, generateServer) => {
    // get meta data and image from the current editor canvas
    const konvaObject = stageRef.current.toObject();
    let dataURL;
    let route;
    if (!generateServer) {
      dataURL = stageRef.current.toDataURL({
        mimeType: 'image/jpeg',
        quality: sliderValue / 100,
      });
      route = '/api/meme/uploadSingle';
    } else {
      dataURL = null;
      route = '/api/meme/createSingle';
    }
    // construct meme object
    const body = {
      userID: user._id,
      templateID: templateID,
      title: title,
      description: description,
      memeCaptions: getCaptions(konvaObject),
      meme: dataURL,
      konva: konvaObject,
      isPrivate: isPrivate,
      isHidden: isHidden,
      isDraft: isDraft,
      votes: [],
      comments: [],
    };

    // send the meme object to the server
    console.log(`Send meme object to ${route}:`, body);
    axios
      .post(process.env.REACT_APP_BURL + route, body)
      .then((res) => {
        console.log('Server responded with:', res);
        const memeObject = res.data.meme;
        memeObject.stableURL = res.data.stableURL;
        setEditorState({ memeObject });
        setSuccess(true);
      })
      .catch((res, error) => {
        console.log('Server responded with:', res);
        console.log('Error:', error);
        alert('Sorry, your meme could not be saved.');
      });
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

  return (
    <>
      <Button
        variant='contained'
        onClick={() => setOpen(!open)}
        disabled={!editorState.image ? true : false}
      >
        Generate & Save
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Generate & Save</DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText>To save the meme, please specify the fields below.</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Title'
            fullWidth
            variant='standard'
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin='dense'
            id='name'
            label='Description'
            fullWidth
            variant='standard'
            onChange={(e) => setDescription(e.target.value)}
          />
          <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label='Draft'
              onClick={() => setIsDraft(!isDraft)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label='Unlisted'
              onClick={() => setIsHidden(!isHidden)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label='Private'
              onClick={() => setIsPrivate(!isPrivate)}
            />
          </Stack>
          {/* In case of managing generateServer flag over local state */}
          {/* <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label='Generate on server?'
              onClick={() => setGenerateServer(!generateServer)}
            />
          </Stack> */}
          <DialogContentText>Image Quality in %:</DialogContentText>
          <Box sx={{ mx: 3 }}>
            <Slider
              defaultValue={100}
              aria-label='Default'
              valueLabelDisplay='on'
              marks={marks}
              onChange={(e) => {
                setSliderValue(e.target.value);
              }}
              min={1}
              max={100}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleUploadMeme(false)}>Generate Local</Button>
          <Button onClick={() => handleUploadMeme(true)}>Generate Server</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackClose} severity='success' sx={{ width: '100%' }}>
          Your meme was saved!
        </Alert>
      </Snackbar>
    </>
  );
};

export default GenerateSaveMeme;
