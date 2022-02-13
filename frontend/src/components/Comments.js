import { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Typography from '@mui/material/Typography';
import Comment from './Comment';
import { Grid, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const Comments = ({ meme, width }) => {
  const [commentText, setCommentText] = useState();
  const user = useStoreState((state) => state.userSession.user);
  const fetchServerMemes = useStoreActions((actions) => actions.fetchServerMemes);

  const handleSubmit = () => {
    const route = '/api/meme/comment/add';
    const body = {
      memeID: meme._id,
      userID: user._id,
      commentText,
    };
    console.log(`Sending new comment to ${route}`, body);
    axios
      .put(process.env.REACT_APP_BURL + route, body)
      .then((res) => {
        console.log('Server responded with:', res);
        setCommentText('');
        fetchServerMemes();
      })
      .catch((res, error) => {
        console.log('Server send error:', error);
        console.log('Server responded:', res);
        alert('Sorry, something went wrong.');
      });
  };

  return (
    <>
      <Typography variant='body1'>Comments</Typography>
      <Grid container spacing={2} sx={{ pt: 1.5 }}>
        <Grid item xs={9}>
          <TextField
            size='small'
            multiline
            maxRows={4}
            label='Add a comment'
            placeholder='Your funny comment...'
            fullWidth
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item>
          <Button variant='contained' endIcon={<SendIcon />} onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
      {/* Map through comments in reverse order from new to old. */}
      {/* Source: https://stackoverflow.com/questions/36415904/is-there-a-way-to-use-map-on-an-array-in-reverse-order-with-javascript (13.02.2022) */}
      {meme.comments
        .slice(0)
        .reverse()
        .map((comment) => (
          <Comment comment={comment} width={width} key={comment.id} />
        ))}
    </>
  );
};

export default Comments;
