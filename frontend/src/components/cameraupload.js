import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useStoreActions } from 'easy-peasy';
import Alert from '@mui/material/Alert';
import Webcam from 'react-webcam';

// https://www.npmjs.com/package/react-webcam

export default function CameraUpload({ ButtonText }) {
  const setTemplate = useStoreActions((actions) => actions.setTemplate);
  const [open, setOpen] = React.useState(false);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [preview, setPreview] = React.useState();
  const [alert, setAlert] = React.useState(false);
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const image = new Image();
  // image.src = `"${name}"`;
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
        <DialogContent>
          {alert ? (
            <Alert severity='error'>Please take a photo first</Alert>
          ) : null}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            height={400}
            width={400}
          />
          {imgSrc && <img src={imgSrc} alt={'Cannot be displayed'} />}
        </DialogContent>
        <button onClick={capture}>Capture photo</button>

        <DialogActions>
          <Button
            onClick={(e) => {
              if (preview) {
                setTemplate(image);
                handleClose();
                setAlert(false);
              } else {
                setAlert(true);
              }
            }}
          >
            set Template
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
