import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Button } from '@mui/material';

const MemeUpload = () => {
  const memeToEdit = useStoreState((state) => state.memeToEdit);
  const stageRef = useStoreState((state) => state.stageRef);

  const handleUploadMeme = () => {
    console.log(stageRef);
  };

  return (
    <>
      <Button variant='contained' onClick={handleUploadMeme}>
        Save Meme
      </Button>
    </>
  );
};

export default MemeUpload;
