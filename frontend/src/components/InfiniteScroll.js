import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useClipboard } from 'use-clipboard-copy';
import { Loader } from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Singleview from './Singleview';
import axios from 'axios';
import Votes from './Votes';

function InfiniteScroller() {
  // use central state
  const setServerMemes = useStoreActions((actions) => actions.setServerMemes);
  const serverMemes = useStoreState((actions) => actions.serverMemes);

  // use local state
  const [openSingleView, setOpenSingleView] = useState(false);
  const [counter, setCounter] = useState(2);
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(null);
  // catch parameter from URL
  const { paramMemeID } = useParams();
  // initalize clipboard
  const clipboard = useClipboard();

  console.log('Rerender Overview');

  let baseURL;
  if (process.env.REACT_APP_BURL === '') baseURL = window.location.host;
  else baseURL = process.env.REACT_APP_BURL;

  // if there is a memeID passed as parameter, check it and open single view
  useEffect(() => {
    if (paramMemeID !== undefined) {
      // source: https://stackoverflow.com/questions/26468557/return-index-value-from-filter-method-javascript (11.02.2021)
      const paramMemeIndex = serverMemes.findIndex((meme) => meme._id === paramMemeID);
      console.log('URL contains existing meme id, open single view.');
      if (paramMemeIndex > -1) {
        setMemeIndex(paramMemeIndex);
        setOpenSingleView(true);
      }
    }
  }, [paramMemeID, serverMemes]);

  useEffect(() => {
    fetchMemes();
    //eslint-disable-next-line
  }, []);

  const fetchMemes = () => {
    axios.get(process.env.REACT_APP_BURL + '/api/meme/retrieve').then((res) => {
      setServerMemes(res.data.data.memes);
      setCounter(counter + 1);
      const _memes = res.data.data.memes.slice(0, counter);
      setMemes(_memes);
    });
  };

  const getCardMediaFromButton = (button) => {
    return button.parentNode.parentNode.childNodes[0];
  };

  const handleView = (event) => {
    const cardMedia = getCardMediaFromButton(event.target);
    setMemeIndex(Number(cardMedia.alt));
    setOpenSingleView(true);
  };

  const handleShare = (event) => {
    const cardMedia = getCardMediaFromButton(event.target);
    const meme = memes[Number(cardMedia.alt)];
    clipboard.copy(window.location.origin + '/overview/' + meme._id);
    alert(`Link to share meme copied! \n ${window.location.origin + '/overview/' + meme._id}`);
  };

  return (
    <>
      <Container maxWidth='md'>
        <Typography variant='h4' sx={{ mt: 5, mb: 2, textAlign: 'center' }}>
          Meme Gallery
        </Typography>
        <Typography variant='subtitle1' sx={{ mb: 2, textAlign: 'center' }}>
          Explore public memes on Burrito Memes!
        </Typography>
        <InfiniteScroll
          dataLength={memes.length - 1}
          next={fetchMemes}
          hasMore
          loader={<Loader />}
          scrollThreshold={0.9}
        >
          <Grid container>
            {memes.map((meme, index) => (
              <Grid item key={meme._id} xs={12} sm={12} md={12} sx={{ mb: 4 }}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: 1,
                    boxShadow: 4,
                    backgroundColor: '#D1D1D1',
                  }}
                >
                  <CardMedia
                    component='img'
                    key={meme._id}
                    alt={index}
                    height={600}
                    width={500}
                    image={baseURL + meme.filePath}
                  ></CardMedia>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant='h5'>
                      {meme.title}
                    </Typography>
                    <Typography>{meme.description}</Typography>
                    {/* <Typography>Number of votes: {calculateVoteScore(meme.votes)}</Typography> */}
                  </CardContent>
                  <CardActions sx={{ width: '100%', justifyContent: 'center' }}>
                    <Button size='large' onClick={handleView}>
                      View
                    </Button>
                    <Button size='large'>Comment</Button>
                    <Button size='large' onClick={handleShare}>
                      Share
                    </Button>
                    <Votes meme={meme} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Container>
      <Singleview
        openSingleView={openSingleView}
        setOpenSingleView={setOpenSingleView}
        memeIndex={memeIndex}
      />
    </>
  );
}

export default InfiniteScroller;
