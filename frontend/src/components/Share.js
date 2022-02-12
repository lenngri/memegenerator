import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';
import { useClipboard } from 'use-clipboard-copy';
import { Button } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';

const Share = () => {
  const clipboard = useClipboard();
  const { memeObject } = useStoreState((state) => state.editor);
  const [success, setSuccess] = useState(false);

  const handleShare = () => {
    clipboard.copy(window.location.origin + '/overview/' + memeObject._id);
    setSuccess(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

  return (
    <>
      <Button disabled={!memeObject ? true : false} variant='contained' onClick={handleShare}>
        Share
      </Button>
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackClose} severity='success' sx={{ width: '100%' }}>
          Link to share meme copied!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Share;
