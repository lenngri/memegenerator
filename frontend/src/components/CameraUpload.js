import * as React from 'react';
import { useStoreActions } from 'easy-peasy';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Webcam from 'react-webcam';

// https://www.npmjs.com/package/react-webcam

export default function CameraUpload({ ButtonText }) {
  const setMemeToEdit = useStoreActions((actions) => actions.setMemeToEdit);
  const [preview, setPreview] = React.useState();
  const [imgSrc, setImgSrc] = React.useState(null);
  const [alert, setAlert] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const webcamRef = React.useRef(null);

  const image = new Image();
  image.src = preview;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(imageSrc);
    setPreview(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen}>
        Camera Upload
      </Button>
      <Dialog open={open} onClose={handleClose}>
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
          {alert ? <Alert severity='error'>Please take a photo first</Alert> : null}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            height={400}
            width={400}
          />
          {imgSrc ? (
            <>
              <Typography>Preview:</Typography>
              <img src={imgSrc} alt={'Cannot be displayed'} />
            </>
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>
            Cancel
          </Button>
          <Button variant='contained' onClick={capture}>
            Capture photo
          </Button>
          <Button
            variant='contained'
            onClick={(e) => {
              if (preview) {
                setMemeToEdit({ image: image });
                setImgSrc(null);
                setPreview(null);
                setAlert(false);
                handleClose();
              } else {
                setAlert(true);
              }
            }}
          >
            Set Template
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
