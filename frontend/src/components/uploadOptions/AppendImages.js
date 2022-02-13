import React from 'react';
import LocalFileSelector from './LocalFileSelector';
import { useStoreState, useStoreActions } from 'easy-peasy';
import CameraUpload from './CameraUpload';
import URLSelector from './UrlSelector';
import ServerTemplateSelector from './ServerTemplateSelector';
import DrawTemplateSelector from './DrawTemplateSelector';
import ImgflipSelector from './ImgflipSelector';
import { IconButton, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

const AppendImages = () => {
  const setEditorState = useStoreActions((actions) => actions.setEditorState);
  const user = useStoreState((state) => state.userSession.user);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant='contained' onClick={handleClickOpen}>
        Append Image
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Select a local file</DialogTitle>
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
          <Stack direction='column' spacing={1} sx={{ mt: 3 }}>
            <ServerTemplateSelector />
            <ImgflipSelector />
            <LocalFileSelector ButtonText={'Use local file'} append={true}></LocalFileSelector>
            <URLSelector></URLSelector>
            <CameraUpload></CameraUpload>
            <DrawTemplateSelector ButtonText={'Draw Meme'}></DrawTemplateSelector>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppendImages;
