import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const Download = ({ template, stageRef }) => {
  // Source: https://developer.mozilla.org/de/docs/Web/API/HTMLCanvasElement/toDataURL (08.01.2021)
  const [open, setOpen] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState(100);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadMeme = () => {
    console.log(sliderValue / 100);
    var link = document.createElement('a');
    link.download = 'thismeme.jpg';
    console.log(stageRef.current.toJSON());
    link.href = stageRef.current.toDataURL({
      mimeType: 'image/jpeg',
      quality: sliderValue / 100,
    });
    link.click();
  };

  return (
    <div>
      <Button
        disabled={!template ? true : false}
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<DownloadIcon />}
      >
        Download
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Please select the quality in %.'}</DialogTitle>
        <DialogContent>
          <Box width={300} sx={{ pt: 5, pr: 5, pl: 5 }}>
            <Slider
              defaultValue={100}
              aria-label="Default"
              valueLabelDisplay="auto"
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
    </div>
  );
};

export default Download;
