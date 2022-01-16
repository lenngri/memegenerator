import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Alert from '@mui/material/Alert';

export default function URLSelector() {
  const setTemplate = useStoreActions((actions) => actions.setTemplate);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState();
  const [imagesrc, setImagescr] = React.useState();
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
  // image.src = `"${name}"`;
  image.src = name;

  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen} sx={{ my: 5 }}>
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
                setTemplate(image);
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
