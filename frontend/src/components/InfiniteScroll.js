import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useClipboard } from 'use-clipboard-copy';
import { Loader } from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ShareIcon from '@mui/icons-material/Share';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CommentIcon from '@mui/icons-material/Comment';
import { Button } from '@mui/material';
import Singleview from './Singleview';
import axios from 'axios';
import Votes from './Votes';
import arraySort from 'array-sort';

function InfiniteScroller() {
  // use central state
  const setServerMemes = useStoreActions((actions) => actions.setServerMemes);
  const serverMemes = useStoreState((state) => state.serverMemes);
  const setRetrieveMemesBody = useStoreActions((actions) => actions.setRetrieveMemesBody);
  const retrieveMemesBody = useStoreState((state) => state.retrieveMemesBody);
  // const sortingArgs = useStoreState((state) => state.sortingArgs);
  // const setSortingArgs = useStoreActions((actions) => actions.setSortingArgs);
  const [sortingArgs, setSortingArgs] = useState(null);
  // use local state
  const [openSingleView, setOpenSingleView] = useState(false);
  const [counter, setCounter] = useState(2);
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(null);
  // catch parameter from URL
  const { paramMemeID } = useParams();
  // initalize clipboard
  const clipboard = useClipboard();

  console.log('Rerender Infinite Scroll');
  // console.log(sortingArgs);
  console.log(retrieveMemesBody);

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

  const fetchMemes = (noIncrease, sortingArgs) => {
    axios.post(process.env.REACT_APP_BURL + '/api/meme/retrieve', retrieveMemesBody).then((res) => {
      // console.log(res);
      const sortedMemes = arraySort(res.data.data.memes, sortingArgs);
      console.log(sortingArgs);
      setServerMemes(sortedMemes);
      // load more memes if noIncrease not defined
      if (!noIncrease) setCounter(counter + 1);
      if (!noIncrease) console.log('increased counter', counter);
      const _memes = sortedMemes.slice(0, counter);
      setMemes(_memes);
    });
  };

  // button actions
  const handleView = (index) => {
    console.log('Open meme with index in single view:', index);
    setMemeIndex(index);
    setOpenSingleView(true);
  };

  const handleShare = (id) => {
    clipboard.copy(window.location.origin + '/overview/' + id);
    alert(`Link to share meme copied! \n ${window.location.origin + '/overview/' + id}`);
  };

  // filter and sort actions
  const handleChangeFilter = (key, value) => {
    retrieveMemesBody[key] = value;
    setRetrieveMemesBody(retrieveMemesBody);
    fetchMemes(true);
  };

  const sortAlphabetically = (value) => {
    setSortingArgs(value);
    fetchMemes(true, value);
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
        <Button variant='contained' onClick={() => handleChangeFilter('isDraft', true)}>
          Show drafts
        </Button>
        <Button variant='contained' onClick={() => sortAlphabetically('title')}>
          Sort after Title
        </Button>
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
                  <CardContent sx={{ textAlign: 'center', py: 1 }}>
                    <Typography variant='h5'>{meme.title}</Typography>
                    {/* <Typography>Number of votes: {calculateVoteScore(meme.votes)}</Typography> */}
                  </CardContent>
                  <CardActions
                    disableSpacing
                    sx={{ width: '100%', justifyContent: 'center', pt: 0 }}
                  >
                    <IconButton onClick={(e) => handleView(index)}>
                      <OpenInFullIcon />
                    </IconButton>
                    <IconButton onClick={(e) => handleShare(meme._id)}>
                      <ShareIcon />
                    </IconButton>
                    <Divider orientation='vertical' sx={{ pl: 3 }}></Divider>
                    <Votes meme={meme} />
                    <Divider orientation='vertical' sx={{ pl: 3 }}></Divider>
                    <IconButton onClick={(e) => handleView(index)}>
                      <CommentIcon />
                    </IconButton>
                    <Typography variant='h6' sx={{ pr: 6 }}>
                      {meme.comments.length}
                    </Typography>
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
