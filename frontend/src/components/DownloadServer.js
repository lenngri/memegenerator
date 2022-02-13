import React from 'react';
import { useStoreState } from 'easy-peasy';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';

const DownloadServer = () => {
  const { memeObject } = useStoreState((state) => state.editor);

  let baseURL;
  // source: https://stackoverflow.com/questions/6042007/how-to-get-the-host-url-using-javascript-from-the-current-page (11.02.2022)
  if (process.env.REACT_APP_BURL === '') baseURL = window.location.host;
  else baseURL = process.env.REACT_APP_BURL;

  const downloadMeme = () => {
    console.log('Download meme from:', baseURL + memeObject.filePath);
    saveAs(baseURL + memeObject.filePath.substring(1, memeObject.filePath.length), 'yourmeme.jpg'); //TODO: remove substring
  };

  return (
    <>
      <Button
        disabled={!memeObject ? true : false}
        variant='contained'
        onClick={downloadMeme}
        startIcon={<DownloadIcon />}
      >
        Download
      </Button>
    </>
  );
};

export default DownloadServer;
