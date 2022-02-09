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
  const [openSingleView, setOpenSingleView] = useState(false);
  const theme = createTheme();
  const [counter, setCounter] = useState(1);
  // const serverTemplates = useStoreState((state) => state.serverTemplates);
  const setServerTemplates = useStoreActions((actions) => actions.setServerTemplates);
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(null);

  useEffect(() => {
    fetchMemes();
    //eslint-disable-next-line
  }, []);

  const fetchMemes = () => {
    fetch('http://localhost:3000/api/template/retrieve').then((res) => {
      res.json().then((res) => {
        setServerTemplates(res);
        setCounter(counter + 1);
        const _memes = res.slice(0, counter);
        setMemes(_memes);
      });
    });
  };

  const handleEdit = (event) => {
    const button = event.target;
    const cardBody = button.parentNode.parentNode;
    setTemplate(cardBody.childNodes[0].childNodes[0]);
    navigate('/editor');
  };

  const handleView = (event) => {
    const button = event.target;
    const cardBody = button.parentNode.parentNode;
    setMemeIndex(Number(cardBody.childNodes[0].childNodes[0].alt));
    setOpenSingleView(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container maxWidth='md'>
          <Heading />
          <InfiniteScroll
            dataLength={memes.length - 1}
            next={fetchMemes}
            hasMore
            loader={<Loader />}
            scrollThreshold={0.9}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Grid container>
              {memes.map((meme, index) => (
                <Grid item key={meme.id} xs={12} sm={12} md={12} sx={{ mb: 4 }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      border: 2,
                      boxShadow: 4,
                    }}
                    style={{
                      backgroundColor: '#D3D3D3',
                      justifyContent: 'center',
                      alignItems: 'center',
                      resizeMode: 'contain',
                    }}
                  >
                    <CardMedia key={meme._id} maxHeight={600}>
                      <img
                        src={
                          'http://localhost:3000' +
                          meme.filePath.substr(1, meme.filePath.length - 1)
                        }
                        alt={index}
                        crossOrigin='Anonymous' // Source: https://konvajs.org/docs/posts/Tainted_Canvas.html (13.01.2022)
                        loading='lazy'
                      />
                    </CardMedia>

                    <CardContent
                      sx={{
                        width: '100%',
                        textAlign: 'center',
                      }}
                    >
                      <Typography gutterBottom variant='h4' component='h2'>
                        {meme.fileName}
                      </Typography>
                      <Typography sx={{ fontSize: 20 }}>{meme.description}</Typography>
                    </CardContent>
                    <CardActions sx={{ width: '100%', justifyContent: 'center' }}>
                      <Button
                        sx={{ fontSize: 20, mr: 4, fontWeight: 'bold' }}
                        size='small'
                        onClick={handleView}
                      >
                        View
                      </Button>
                      <Button
                        sx={{ fontSize: 20, mr: 4, fontWeight: 'bold' }}
                        size='small'
                        onClick={handleEdit}
                      >
                        Edit
                      </Button>
                      <Button sx={{ fontSize: 20, mr: 4, fontWeight: 'bold' }} size='small'>
                        Comment
                      </Button>
                      <Button sx={{ fontSize: 20, mr: 4, fontWeight: 'bold' }} size='small'>
                        Vote
                      </Button>
                      <Button sx={{ fontSize: 20, mr: 4, fontWeight: 'bold' }} size='small'>
                        Share
                      </Button>
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
      </main>
    </ThemeProvider>
  );
}

export default InfiniteScroller;
