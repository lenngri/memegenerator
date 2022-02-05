import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Container, Box, Button, IconButton, CardMedia, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStoreState } from 'easy-peasy';

const WIDTH = 600;

const Singleview = ({ openSingleView, setOpenSingleView, meme, memeIndex, setMemeIndex }) => {
  const [viewWidth, setViewWidth] = useState(WIDTH);
  const [open, setOpen] = React.useState(false);
  const scroll = 'paper';
  const serverTemplates = useStoreState((state) => state.serverTemplates);

  const imageSource =
    'http://localhost:3000' +
    serverTemplates[memeIndex].filePath.substr(1, serverTemplates[memeIndex].filePath.length - 1);

  useEffect(() => {
    setOpen(openSingleView);
  }, [openSingleView]);

  useEffect(() => {
    if (imageSource) {
      if (imageSource.naturalWidth > WIDTH) {
        setViewWidth({
          width: WIDTH,
          height: (imageSource.naturalHeight * WIDTH) / imageSource.naturalWidth,
        });
      } else {
        setViewWidth({
          width: imageSource.naturalWidth,
          height: imageSource.naturalHeight,
        });
      }
    }
  }, [memeIndex, setViewWidth]);

  const handleClose = () => {
    setOpen(false);
    setOpenSingleView(false);
  };

  return memeIndex ? (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      maxWidth={'xl'}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogTitle id='scroll-dialog-title'>
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
      </DialogTitle>
      <DialogContent dividers={scroll === 'body'}>
        <Container sx={{ justifyContent: 'center', display: 'flex' }}>
          <Box width={viewWidth} boxShadow={1}>
            <CardMedia
              component='img'
              id='img'
              // image={'http://localhost:3000' + serverTemplates[0].filePath}
              // image={
              //   <img alt='hallo' src={'http://localhost:3000' + serverTemplates[0].filePath} />
              // }
              // image={meme.src}
              image={imageSource}
              title='Picture'
              alt='pic'
            ></CardMedia>
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
