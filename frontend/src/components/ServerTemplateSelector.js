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

export default function ServerTemplateSelector() {
  const setTemplate = useStoreActions((actions) => actions.setTemplate);
  const serverTemplates = useStoreState((state) => state.serverTemplates);
  const [open, setOpen] = React.useState(false);
  const scroll = 'paper';

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen('paper')}>
        Burrito Templates
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
          Select a template from Burrito Memes.
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
                {serverTemplates ? (
                  serverTemplates.map((item) => (
                    <ImageListItem key={item._id}>
                      <img
                        src={
                          'http://localhost:3001' +
                          item.filePath.substr(1, item.filePath.length - 1)
                        }
                        alt={item.fileName}
                        crossOrigin='Anonymous' // Source: https://konvajs.org/docs/posts/Tainted_Canvas.html (13.01.2022)
                        onClick={(e) => {
                          setTemplate(e.target);
                          handleClose();
                        }}
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
