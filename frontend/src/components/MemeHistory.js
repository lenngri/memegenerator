import { useEffect } from 'react';
import { Box } from '@mui/system';
import { Container, Typography, ImageList, ImageListItem } from '@mui/material';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

export default function MemeHistory() {
  const fetchServerMemes = useStoreActions((actions) => actions.fetchServerMemes);
  const fetchServerTemplates = useStoreActions((actions) => actions.fetchServerTemplates);
  const setEditorState = useStoreActions((actions) => actions.setEditorState);
  const serverMemes = useStoreState((state) => state.serverMemes);
  const serverTemplates = useStoreState((state) => state.serverTemplates);
  const user = useStoreState((state) => state.userSession.user);
  const navigate = useNavigate();

  let baseURL;
  if (process.env.REACT_APP_BURL === '') baseURL = window.location.host;
  else baseURL = process.env.REACT_APP_BURL;

  useEffect(() => {
    fetchServerMemes();
    fetchServerTemplates();
  }, [fetchServerMemes, fetchServerTemplates]);

  const handleEdit = (e) => {
    console.log(e.target);
    const memeObject = serverMemes[Number(e.target.alt)];
    // filter in the serverTemplates array for the template with the corresponding ID
    // select first and only element of the array
    const templateObject = serverTemplates.filter(
      (template) => template._id === memeObject.templateID
    )[0];
    console.log(templateObject);
    const image = new Image();
    image.onload = function () {
      setEditorState({
        image,
        memeObject,
        templateObject,
      });
      navigate('/editor');
    };
    image.src = baseURL + templateObject.filePath;
  };

  const filteredMemes = serverMemes.filter((meme) => meme.userID === user._id);

  return (
    <div>
      <Container sx={{ justifyContent: 'center' }}>
        <Typography variant='h5' sx={{ mt: 3 }}>
          Your Meme History
        </Typography>
        <Typography color='text.secondary'>Click on a meme to edit.</Typography>
        <Box>
          <ImageList style={{ cursor: 'pointer' }} variant='masonry' cols={3} gap={8}>
            {filteredMemes ? (
              filteredMemes.map((item, index) => (
                <ImageListItem key={item._id}>
                  <img
                    src={baseURL + item.filePath}
                    alt={index}
                    crossOrigin='Anonymous' // Source: https://konvajs.org/docs/posts/Tainted_Canvas.html (13.01.2022)
                    loading='lazy'
                    onClick={handleEdit}
                  />
                </ImageListItem>
              ))
            ) : (
              <></>
            )}
          </ImageList>
        </Box>
      </Container>
    </div>
  );
}
