import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
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

function InfiniteScroller() {
  const navigate = useNavigate();
  const setMemeToEdit = useStoreActions((actions) => actions.setMemeToEdit);
  const [openSingleView, setOpenSingleView] = useState(false);

  const [counter, setCounter] = useState(2);
  // const serverTemplates = useStoreState((state) => state.serverTemplates);
  const setServerMemes = useStoreActions((actions) => actions.setServerMemes);
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(null);

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

  const handleEdit = (event) => {
    const button = event.target;
    const cardBody = button.parentNode.parentNode;
    setMemeToEdit(cardBody.childNodes[0]);
    navigate('/editor');
  };

  const handleView = (event) => {
    const button = event.target;
    const cardBody = button.parentNode.parentNode;
    setMemeIndex(Number(cardBody.childNodes[0].alt));
    setOpenSingleView(true);
  };

  let baseURL;
  if (process.env.REACT_APP_BURL === '') baseURL = window.location.host;
  else baseURL = process.env.REACT_APP_BURL;

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
              <Grid item key={meme.id} xs={12} sm={12} md={12} sx={{ mb: 4 }}>
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
                    image={baseURL + meme.filePath.split('backend')[1]}
                  ></CardMedia>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant='h5'>
                      {meme.fileName}
                    </Typography>
                    <Typography>{meme.description}</Typography>
                  </CardContent>
                  <CardActions sx={{ width: '100%', justifyContent: 'center' }}>
                    <Button size='large' onClick={handleView}>
                      View
                    </Button>
                    <Button size='large' onClick={handleEdit}>
                      Edit
                    </Button>
                    <Button size='large'>Comment</Button>
                    <Button size='large'>Vote</Button>
                    <Button size='large'>Share</Button>
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
