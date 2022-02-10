import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';
import { Button, TextField } from '@mui/material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

const MemeUpload = () => {
  const memeToEdit = useStoreState((state) => state.memeToEdit);
  const stageRef = useStoreState((state) => state.stageRef);
  const user = useStoreState((state) => state.userSession.user);

  const [open, setOpen] = useState(false);

  const handleUploadMeme = () => {
    console.log(stageRef.current);

    const dataURL = stageRef.current.toDataURL({
      mimeType: 'image/jpeg',
    });
    const konvaJSON = stageRef.current.toJSON();
    console.log(konvaJSON);

    const body = {
      userID: user.id,
      templateID: 'fixedID',
      title: 'Funny Testing Title',
      description: 'This is a funny test meme, sent by the Frontend',
      memeCaptions: [
        {
          'Text A': 'Test A',
          TextB: 'Test B',
        },
      ],
      meme: dataURL,
      konva: konvaJSON,
      isPrivate: 'true',
      isHidden: 'true',
      isDraft: 'false',
      votes: [],
      comments: [],
    };
    console.log(body);
  };

  return (
    <>
      <Button
        variant='contained'
        onClick={() => setOpen(!open)}
        disabled={!memeToEdit ? true : false}
      >
        Save Meme
      </Button>
      <Dialog open={open} onClose={() => setOpen(!open)}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(!open)}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MemeUpload;
