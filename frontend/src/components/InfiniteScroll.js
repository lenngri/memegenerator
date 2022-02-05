import React, { useState } from 'react';
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
import { useStoreState } from 'easy-peasy';

function InfiniteScroller() {
  const navigate = useNavigate();
  const setTemplate = useStoreActions((actions) => actions.setTemplate);
  const [meme, setMeme] = useState(null);
  const [openSingleView, setOpenSingleView] = useState(false);
  const theme = createTheme();
  const [counter, setCounter] = useState(2);
  const serverTemplates = useStoreState((state) => state.serverTemplates);
  const [memes, setMemes] = useState(serverTemplates);
  const [memeIndex, setMemeIndex] = useState(0);
  console.log(counter);

  // useEffect(() => {
  //   fetchMemes();
  //   //eslint-disable-next-line
  // }, []);

  // const fetchMemes = () => {
  //   fetch('https://api.imgflip.com/get_memes').then((res) => {
  //     res.json().then((res) => {
  //       const _memes = res.data.memes.slice(0, counter + 2);
  //       console.log(_memes);
  //       setMemes(_memes);
  //     });
  //   });
  // };

  const incrementCounter = () => {
    setCounter(counter + 1);
    console.log(counter);
  };

  const handleEdit = (event) => {
    const button = event.target;
    const cardBody = button.parentNode.parentNode;
    setTemplate(cardBody.childNodes[0].childNodes[0]);
    navigate('/editor');
  };

  const handleView = (event) => {
    console.log('View clicked on meme:', event.target);
    const button = event.target;
    const cardBody = button.parentNode.parentNode;
    // const meme = cardBody.childNodes[0].childNodes[0];
    console.log(cardBody.childNodes[0].childNodes[0].alt);
    setMemeIndex(cardBody.childNodes[0].childNodes[0].alt);
    // setMeme(meme);
    setOpenSingleView(true);
    console.log(openSingleView);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container maxWidth='md'>
          <Heading />
          <InfiniteScroll
            dataLength={memes.length}
            next={incrementCounter}
            hasMore={true}
            loader={<Loader />}
          >
            <Grid container>
              {memes.slice(0, counter).map((meme, index) => (
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
                    <CardMedia key={meme._id}>
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
          meme={meme}
          memeIndex={memeIndex}
          setMemeIndex={setMemeIndex}
        />
      </main>
    </ThemeProvider>
  );
}

export default InfiniteScroller;
