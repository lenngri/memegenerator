import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ShowMeme = () => {
  const { memeObject } = useStoreState((state) => state.editor);
  const navigate = useNavigate();

  const handleShow = () => {
    navigate('/overview/' + memeObject._id);
  };

  return (
    <>
      <Button disabled={!memeObject ? true : false} variant='contained' onClick={handleShow}>
        Show
      </Button>
    </>
  );
};

export default ShowMeme;
