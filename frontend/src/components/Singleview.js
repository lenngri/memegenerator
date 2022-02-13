import React, { useEffect, useState } from 'react';
import useInterval from '../tools/useInterval';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  IconButton,
  CircularProgress,
  Typography,
  Divider,
  CardActions,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import Votes from './Votes';

const WIDTH = 600;

const Singleview = ({ openSingleView, setOpenSingleView, memeIndex }) => {
  const serverMemes = useStoreState((state) => state.serverMemes);
  const [open, setOpen] = useState(false);
  const [shownIndex, setShownIndex] = useState(null);
  const [autoPlayFlag, setAutoPlayFlag] = useState(false);
  const scroll = 'paper';
  const delay = 3000;
  const navigate = useNavigate();

  let baseURL;
  if (process.env.REACT_APP_BURL === '') baseURL = window.location.host;
  else baseURL = process.env.REACT_APP_BURL;

  useEffect(() => {
    setOpen(openSingleView);
    setShownIndex(memeIndex);
  }, [openSingleView, memeIndex]);

  useInterval(() => {
    if (autoPlayFlag && shownIndex < serverMemes.length - 1) {
      setShownIndex(shownIndex + 1);
    } else if (autoPlayFlag) {
      setShownIndex(0);
    }
  }, delay);

  const handleClose = () => {
    setOpen(false);
    setOpenSingleView(false);
    navigate('/overview');
  };

  return (
    <>
      {serverMemes[shownIndex] ? (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          maxWidth={'xl'}
          aria-labelledby='scroll-dialog-title'
          aria-describedby='scroll-dialog-description'
        >
          <DialogTitle id='scroll-dialog-title'>
            {serverMemes[shownIndex].title}
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
            <Divider></Divider>
          </DialogTitle>

          <DialogContent dividers={scroll === 'body'}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                boxShadow: 0,
              }}
            >
              <CardContent>
                <Box width={WIDTH}>
                  {serverMemes[shownIndex] ? (
                    <CardMedia
                      component='img'
                      id='img'
                      image={baseURL + serverMemes[shownIndex].filePath}
                      title='Picture'
                      alt='pic'
                    ></CardMedia>
                  ) : (
                    <CircularProgress />
                  )}
                </Box>
                <Typography variant='body' color='text.secondary' sx={{ mt: 2 }}>
                  {serverMemes[shownIndex].description}
                </Typography>
              </CardContent>
              <CardActions sx={{ width: '100%', justifyContent: 'center' }}>
                <Button
                  color={!autoPlayFlag ? 'success' : 'error'}
                  onClick={() => setAutoPlayFlag(!autoPlayFlag)}
                >
                  {!autoPlayFlag ? 'Play' : 'Stop'}
                </Button>
                <Button
                  onClick={() => setShownIndex(Math.floor(Math.random() * serverMemes.length))}
                >
                  Random
                </Button>
                <Button
                  disabled={shownIndex < 1 ? true : false}
                  onClick={() => setShownIndex(shownIndex - 1)}
                >
                  Previous
                </Button>
                <Button
                  disabled={shownIndex === serverMemes.length - 1 ? true : false}
                  onClick={() => setShownIndex(shownIndex + 1)}
                >
                  Next
                </Button>
                {/* <Button color={'error'} onClick={handleClose}>
              Close
            </Button> */}
                <Votes meme={serverMemes[shownIndex]} />
              </CardActions>
            </Card>
          </DialogContent>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default Singleview;
