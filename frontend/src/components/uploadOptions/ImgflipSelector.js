import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { Container, ImageList, ImageListItem, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { generateTemplateObject } from '../../tools/generateTemplateObject';

export default function ImgflipSelector() {
  const setEditorState = useStoreActions((actions) => actions.setEditorState);
  const imgflipTemplates = useStoreState((state) => state.imgflipTemplates);
  const user = useStoreState((state) => state.userSession.user);

  const [open, setOpen] = React.useState(false);
  const scroll = 'paper';

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen('paper')}>
        Imgflip Templates
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        maxWidth={'xl'}
        fullWidth={true}
        // fullScreen={true}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>
          Select a template from Imgflip.
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Container sx={{ justifyContent: 'center', display: 'flex' }}>
            <Box>
              <ImageList style={{ cursor: 'pointer' }} variant='masonry' cols={3} gap={8}>
                {imgflipTemplates.map((item) => (
                  <ImageListItem key={item.id}>
                    <img
                      src={item.url}
                      alt={item.name}
                      crossOrigin='Anonymous' // Source: https://konvajs.org/docs/posts/Tainted_Canvas.html (13.01.2022)
                      onClick={(e) => {
                        const templateObject = generateTemplateObject(user.id, 'imgflip', e.target);
                        setEditorState({
                          image: e.target,
                          templateObject,
                          templateNew: true,
                          memeObject: null,
                        });
                        handleClose();
                      }}
                      loading='lazy'
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button color={'error'} onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
