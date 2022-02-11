import { Box } from '@mui/system';
import { Container, ImageList, ImageListItem } from '@mui/material';
import { useStoreState } from 'easy-peasy';

export default function MemeHistory() {
  // const setMemeToEdit = useStoreActions((actions) => actions.setMemeToEdit);
  const serverMemes = useStoreState((state) => state.serverMemes);
  const user = useStoreState((state) => state.userSession.user);

  // const handleClickTemplate = (e) => {
  //   setMemeToEdit({
  //     image: e.target,
  //     templateObject: serverMemes[Number(e.target.alt)],
  //   });
  // };

  const filteredMemes = serverMemes.filter((meme) => meme.userID === user.id);

  let baseURL;
  if (process.env.REACT_APP_BURL === '') baseURL = window.location.host;
  else baseURL = process.env.REACT_APP_BURL;

  return (
    <div>
      <Container sx={{ justifyContent: 'center', display: 'flex' }}>
        <Box>
          <ImageList style={{ cursor: 'pointer' }} variant='masonry' cols={3} gap={8}>
            {filteredMemes ? (
              filteredMemes.map((item, index) => (
                <ImageListItem key={item._id}>
                  <img
                    src={baseURL + item.filePath}
                    alt={index}
                    crossOrigin='Anonymous' // Source: https://konvajs.org/docs/posts/Tainted_Canvas.html (13.01.2022)
                    // onClick={handleClickTemplate}
                    loading='lazy'
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
