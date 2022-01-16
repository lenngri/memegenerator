import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Container, Box, Button, IconButton, CardMedia, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const WIDTH = 600;

const Singleview = ({ openSingleView, setOpenSingleView, meme }) => {
  const [viewWidth, setViewWidth] = useState(WIDTH);
  const [open, setOpen] = React.useState(false);
  const scroll = 'paper';

  useEffect(() => {
    setOpen(openSingleView);
  }, [openSingleView]);

  useEffect(() => {
    if (meme) {
      if (meme.naturalWidth > WIDTH) {
        setViewWidth({
          width: WIDTH,
          height: (meme.naturalHeight * WIDTH) / meme.naturalWidth,
        });
      } else {
        setViewWidth({
          width: meme.naturalWidth,
          height: meme.naturalHeight,
        });
      }
    }
  }, [meme, setViewWidth]);

  const handleClose = () => {
    setOpen(false);
    setOpenSingleView(false);
  };

  return meme ? (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      maxWidth={'xl'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        {meme.alt}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={scroll === 'body'}>
        <Container sx={{ justifyContent: 'center', display: 'flex' }}>
          <Box width={viewWidth} boxShadow={1}>
            <CardMedia component="img" image={meme.src} title="Picture" alt="pic"></CardMedia>
          </Box>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button color={'error'} onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  ) : (
    <CircularProgress />
  );
};

export default Singleview;
