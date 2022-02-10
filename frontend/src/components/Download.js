import React from 'react';
import { useStoreState } from 'easy-peasy';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const Download = () => {
  // Source: https://developer.mozilla.org/de/docs/Web/API/HTMLCanvasElement/toDataURL (08.01.2021)
  const [open, setOpen] = React.useState(false);
  const stageRef = useStoreState((state) => state.stageRef);
  const memeToEdit = useStoreState((state) => state.memeToEdit);
  const [sliderValue, setSliderValue] = React.useState(100);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadMeme = () => {
    var link = document.createElement('a');
    link.download = 'thismeme.jpg';
    link.href = stageRef.current.toDataURL({
      mimeType: 'image/jpeg',
      quality: sliderValue / 100,
    });
    link.click();
  };

  const marks = [
    {
      value: 100,
      label: '100%',
    },
    {
      value: 70,
      label: '70%',
    },
    {
      value: 10,
      label: '10%',
    },
  ];

  return (
    <>
      <Button
        disabled={!memeToEdit ? true : false}
        variant='contained'
        onClick={handleClickOpen}
        startIcon={<DownloadIcon />}
        sx={{ my: 1 }}
      >
        Download
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Please select the quality in %.'}</DialogTitle>
        <DialogContent>
          <Box width={300} sx={{ pt: 5, px: 5 }}>
            <Slider
              defaultValue={100}
              aria-label='Default'
              valueLabelDisplay='on'
              marks={marks}
              onChange={(e) => {
                setSliderValue(e.target.value);
              }}
              min={1}
              max={100}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={(e) => {
              downloadMeme(e.target.value);
            }}
            autoFocus
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Download;
