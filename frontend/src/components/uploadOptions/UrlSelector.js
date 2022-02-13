import * as React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { generateTemplateObject } from '../../tools/generateTemplateObject';

export default function URLSelector() {
  const setEditorState = useStoreActions((actions) => actions.setEditorState);
  const user = useStoreState((state) => state.userSession.user);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState();
  const [alert, setAlert] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const image = new Image();
  image.src = name;
  image.crossOrigin = 'anonymous';

  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen}>
        Use URL
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Please insert an URL</DialogTitle>
        {alert ? <Alert severity='error'>Please choose a file</Alert> : null}

        <DialogContent sx={{ width: 400 }}>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='URL'
            type='email'
            fullWidth
            variant='standard'
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={(e) => {
              if (name) {
                console.log('Set image from web url to editor:', image);
                const templateObject = generateTemplateObject(user._id, 'web-url', image);
                setEditorState({ image, templateObject, templateNew: true, memeObject: null });
                handleClose();
                setAlert(false);
              } else {
                setAlert(true);
              }
            }}
            sx={{ width: '100%' }}
          >
            Use URL
          </Button>{' '}
        </DialogActions>
      </Dialog>
    </div>
  );
}
