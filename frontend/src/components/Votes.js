import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { IconButton, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from 'axios';

const Votes = ({ meme }) => {
  const [score, setScore] = useState(0);
  const [voteStatus, setVoteStatus] = useState(null);
  const user = useStoreState((state) => state.userSession.user);
  const fetchServerMemes = useStoreActions((actions) => actions.fetchServerMemes);

  useEffect(() => {
    calculateVoteScore(meme.votes);
    getVoteStatus(meme.votes);
  }, [meme.votes]);

  const getVoteStatus = (votes) => {
    const status = votes.filter((v) => v.userID === user._id)[0];
    console.log(`MANUAL TRIGGER: Vote status for meme ${meme._id}:`, status.value);
    if (status) setVoteStatus(status.value);
  };

  const calculateVoteScore = (votes) => {
    // console.log(score);
    const upVotes = votes.filter((v) => v.value === 1).length;
    const downVotes = votes.filter((v) => v.value === -1).length;
    console.log(`Calculating Votes: ${upVotes} - ${downVotes} = ${upVotes - downVotes}`);
    setScore(upVotes - downVotes);
  };

  const handleVote = (value) => {
    const voteObject = {
      memeID: meme._id,
      userID: user._id,
      value: value,
    };
    console.log('Vote on meme, sending voteObject to server.', voteObject);
    axios.put(process.env.REACT_APP_BURL + '/api/meme/vote/update', voteObject).then((res) => {
      console.log('Server responded with:', res);
      calculateVoteScore(res.data.votes);
      fetchServerMemes();
      getVoteStatus(res.data.votes);
    });
  };

  return (
    <>
      <IconButton
        // disabled={voteStatus === 1 ? true : false}
        color={voteStatus === 1 ? 'success' : undefined}
        onClick={() => handleVote(1)}
      >
        <ThumbUpIcon />
      </IconButton>
      <Typography variant='h6'>{score}</Typography>
      <IconButton
        // disabled={voteStatus === -1 ? true : false}
        color={voteStatus === -1 ? 'error' : undefined}
        onClick={() => handleVote(-1)}
      >
        <ThumbDownIcon />
      </IconButton>
    </>
  );
};

export default Votes;
