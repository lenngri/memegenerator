import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Button } from '@mui/material';
import axios from 'axios';

const Vote = ({ meme, buttonProps }) => {
  const user = useStoreState((state) => state.userSession.user);
  const fetchServerMemes = useStoreActions((actions) => actions.fetchServerMemes);

  const handleVote = () => {
    const voteObject = {
      memeID: meme._id,
      userID: user._id,
    };
    console.log('Vote on meme, sending voteObject to server.', voteObject);
    axios.put(process.env.REACT_APP_BURL + '/api/meme/like/add', voteObject).then((res) => {
      console.log('Server responded with:', res);
      fetchServerMemes();
    });
  };

  return (
    <Button {...buttonProps} onClick={handleVote}>
      Vote
    </Button>
  );
};

export default Vote;
