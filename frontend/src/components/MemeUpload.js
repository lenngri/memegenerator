import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';
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
import Konva from 'konva';

const MemeUpload = () => {
  // central state
  const memeToEdit = useStoreState((state) => state.memeToEdit);
  const stageRef = useStoreState((state) => state.stageRef);
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
    const captionsArray = [];
    for (let i = 1; i < layer0Children.length; i++) {
      if (layer0Children[i].attrs.text === undefined) captionsArray.push('');
      else captionsArray.push(layer0Children[i].attrs.text);
    }
    return captionsArray;
  };

  const handleUploadMeme = async () => {
    // check, whether the template is new
    if (memeToEdit.templateNew) {
      try {
        const templateResponse = await axios.post(
          process.env.REACT_APP_BURL + '/api/template/uploadSingle',
          memeToEdit.templateObject
        );
        console.log('Sent new template, server responeded:', templateResponse);
        sendMeme(templateResponse.data._id);
      } catch (error) {
        alert('Something went wrong, please try again.');
        console.log(error);
      }
    } else {
      console.log('Existing template with ID:', memeToEdit.templateObject.templateID);
      sendMeme(memeToEdit.templateObject._id);
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
        console.log(res);
      })
      .catch((res, error) => {
        console.log(res);
        console.log(error);
      });
  };

  const memeFromJSON = () => {
    const konvaObject = stageRef.current.toObject();

    const stage = Konva.Node.create(konvaObject, 'container');
    const background = new Konva.Image({
      image: memeToEdit.image,
      width: stage.width(),
      height: stage.height(),
    });
    const layer = stage.getLayers()[0];
    layer.add(background);
    background.moveToBottom();
    console.log(stage.toDataURL());
  };

  return (
    <>
      <Button
        variant='contained'
        onClick={() => setOpen(!open)}
        disabled={!memeToEdit.image ? true : false}
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
          <Button onClick={memeFromJSON}>memeFromJSON</Button>
        </DialogActions>
      </Dialog>
      <div id='container'></div>
    </>
  );
};

export default MemeUpload;
