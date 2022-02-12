import React from 'react';
import { useStoreState } from 'easy-peasy';
import { useClipboard } from 'use-clipboard-copy';
import { Button } from '@mui/material';

const Share = () => {
  const clipboard = useClipboard();
  const { memeObject } = useStoreState((state) => state.editor);

  const handleShare = () => {
    clipboard.copy(window.location.origin + '/overview/' + memeObject._id);
  };

  return (
    <>
      <Button disabled={!memeObject ? true : false} variant='contained' onClick={handleShare}>
        Share
      </Button>
    </>
  );
};

export default Share;
