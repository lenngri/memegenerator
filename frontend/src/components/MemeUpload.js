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
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const MemeUpload = () => {
  // central state
  const memeToEdit = useStoreState((state) => state.memeToEdit);
  const stageRef = useStoreState((state) => state.stageRef);
  const user = useStoreState((state) => state.userSession.user);

  // local state
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Funny Meme');
  const [description, setDescription] = useState('Funny Description');
  const [isDraft, setIsDraft] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

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
      title: title,
      description: description,
      memeCaptions: [
        {
          'Text A': 'Test A',
          TextB: 'Test B',
        },
      ],
      meme: dataURL,
      konva: konvaJSON,
      isPrivate: isPrivate,
      isHidden: isHidden,
      isDraft: isDraft,
      votes: [],
      comments: [],
    };
    console.log(body);
    setOpen(!open);
    clearState();
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
    </>
  );
};

export default MemeUpload;
