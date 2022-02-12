import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Button, TextField, IconButton, Stack } from '@mui/material';
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

const MemeUpload = () => {
  // central state
  const editorState = useStoreState((state) => state.editor);
  const stageRef = useStoreState((state) => state.editor.stageRef);
  const setEditorState = useStoreActions((actions) => actions.setEditorState);
  const user = useStoreState((state) => state.userSession.user);

  // local state
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Title');
  const [description, setDescription] = useState('Description');
  const [isDraft, setIsDraft] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const clearState = () => {
    setTitle('Title');
    setDescription('Description');
    setIsDraft(false);
    setIsHidden(false);
    setIsPrivate(false);
  };

  const getCaptions = (konvaObject) => {
    const layer0Children = konvaObject.children[0].children;
    console.log(layer0Children);
    const captionsArray = [];
    for (let i = 0; i < layer0Children.length; i++) {
      if (layer0Children[i].className === 'Text') {
        if (layer0Children[i].attrs.text === undefined) captionsArray.push('');
        else captionsArray.push(layer0Children[i].attrs.text);
      }
    }
    return captionsArray;
  };

  const handleUploadMeme = async () => {
    // check, whether the template is new
    if (editorState.templateNew) {
      try {
        const templateResponse = await axios.post(
          process.env.REACT_APP_BURL + '/api/template/uploadSingle',
          editorState.templateObject
        );
        console.log('Sent new template, server responeded:', templateResponse);
        sendMeme(templateResponse.data._id);
      } catch (error) {
        alert('Something went wrong, please try again.');
        console.log(error);
      }
    } else {
      console.log('Existing template with ID:', editorState.templateObject.templateID);
      sendMeme(editorState.templateObject._id);
    }

    // clear the state and close dialog
    clearState();
    setOpen(!open);
    alert('You saved the meme.');
  };

  const sendMeme = (templateID) => {
    // get meta data and image from the current editor canvas
    const konvaObject = stageRef.current.toObject();
    const dataURL = stageRef.current.toDataURL({ mimeType: 'image/jpeg' });
    // construct meme object
    const body = {
      userID: user.id,
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
    console.log('Send meme object to the server:', body);
    axios
      .post(process.env.REACT_APP_BURL + '/api/meme/uploadSingle', body)
      .then((res) => {
        console.log('Server responded with meme object:', res);
        const memeObject = res.data.meme;
        memeObject.stableURL = res.data.stableURL;
        console.log(memeObject);
        setEditorState({ memeObject });
      })
      .catch((res, error) => {
        console.log(res);
        console.log(error);
      });
  };

  return (
    <>
      <Button
        variant='contained'
        onClick={() => setOpen(!open)}
        disabled={!editorState.image ? true : false}
      >
        Save Meme
      </Button>
      <Dialog open={open} onClose={() => setOpen(!open)}>
        <DialogTitle>Save Meme</DialogTitle>
        <IconButton
          aria-label='close'
          onClick={() => setOpen(!open)}
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
          <Stack direction='row' spacing={1}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadMeme}>Save</Button>
        </DialogActions>
      </Dialog>
      <div id='container'></div>
    </>
  );
};

export default MemeUpload;
