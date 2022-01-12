import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { Container, ImageList, ImageListItem, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStoreState, useStoreActions } from 'easy-peasy';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

// https://stackoverflow.com/questions/38049966/get-image-preview-before-uploading-in-react

export default function ImageUpload() {
  const setTemplate = useStoreActions((actions) => actions.setTemplate);

  const [selectedFile, setSelectedFile] = React.useState();
  const [preview, setPreview] = React.useState();
  const [localSource, setLocalSource] = React.useState();

  const image = new Image(60, 45);
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
  };

  return (
    <div>
      <input type='file' onChange={onSelectFile} />
      {selectedFile && <img src={preview} />}
      <p>{preview}</p>
      <Button
        variant='contained'
        onClick={(e) => {
          setTemplate(image);
        }}
        sx={{ my: 5, m: 2 }}
      >
        Use Template
      </Button>
    </div>
  );
}
