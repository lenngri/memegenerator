import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import { Heading } from './Heading';
import { Loader } from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Singleview from './Singleview';

function InfiniteScroller() {
  const navigate = useNavigate();
  const setTemplate = useStoreActions((actions) => actions.setTemplate);
  const [memes, setMemes] = useState([]);
  const [meme, setMeme] = useState(null);
  const [openSingleView, setOpenSingleView] = useState(false);
  const theme = createTheme();

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = () => {
    fetch('https://api.imgflip.com/get_memes').then((res) => {
      res.json().then((res) => {
        const _memes = res.data.memes;
        console.log(_memes);
        setMemes(_memes);
      });
    });
  };

  const handleEdit = (event) => {
    const button = event.target;
    const cardBody = button.parentNode.parentNode;
    const meme = cardBody.childNodes[0];
    setTemplate(meme);
    navigate('/editor');
  };

  const handleView = (event) => {
    console.log('View clicked on meme:', event.target);
    const button = event.target;
    const cardBody = button.parentNode.parentNode;
    const meme = cardBody.childNodes[0];
    setMeme(meme);
    setOpenSingleView(true);
    console.log(openSingleView);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 2 }} maxWidth="xl">
          <Heading />
          <InfiniteScroll
            dataLength={memes.length}
            next={fetchMemes}
            hasMore={true}
            loader={<Loader />}
          >
            <Grid container spacing={4}>
              {memes.map((meme) => (
                <Grid item key={meme.id} xs={8} sm={5} md={3}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      border: 2,
                    }}
                    style={{
                      backgroundColor: '#D3D3D3',
                      justifyContent: 'center',
                      alignItems: 'center',
                      resizeMode: 'contain',
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        resizeMode: 'stretch',
                        height: 450,
                        justifyContent: 'center',
                      }}
                      style={{
                        justifyContent: 'center',
                        resizeMode: 'stretch',
                        objectFit: 'cover',
                      }}
                      //Only works occasionally, maybe sometimes the get request comes back empty? If doesn't work try "https://source.unsplash.com/random" as placeholder
                      image={meme.url}
                      alt={meme.name}
                      key={meme.id}
                      id={meme.id}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {meme.name}
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to describe the content.
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing={true}>
                      <Button size="small" onClick={handleView}>
                        View
                      </Button>
                      <Button size="small" onClick={handleEdit}>
                        Edit
                      </Button>
                      <Button size="small">Comment</Button>
                      <Button size="small">Vote</Button>
                      <Button size="small">Share</Button>
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
          meme={meme}
        />
      </main>
    </ThemeProvider>
  );
}

export default InfiniteScroller;
