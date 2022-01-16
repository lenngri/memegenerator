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

export default function FormDialog() {
  const setTemplate = useStoreActions((actions) => actions.setTemplate);
  const imgflipTemplates = useStoreState((state) => state.imgflipTemplates);
  const [open, setOpen] = React.useState(false);
  const scroll = 'paper';

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [selectedFile, setSelectedFile] = React.useState();
  const [preview, setPreview] = React.useState();
  const [localSource, setLocalSource] = React.useState();
  const [alert, setAlert] = React.useState(false);

  const image = new Image();
  // image.src = `"${name}"`;
  image.src = preview;

  // create a preview as a side effect, whenever selected file is changed
  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen} sx={{ my: 5 }}>
        Use Local File
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          {alert ? <Alert severity='error'>Please choose a file</Alert> : null}

          <input type='file' onChange={onSelectFile} />
        </DialogContent>
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
            Use Local File
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
