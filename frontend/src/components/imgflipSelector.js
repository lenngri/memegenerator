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
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function ImgflipSelector() {
  const setTemplate = useStoreActions((actions) => actions.setTemplate);
  const imgflipTemplates = useStoreState((state) => state.imgflipTemplates);
  const [open, setOpen] = React.useState(false);
  const scroll = 'paper';
  const [imagesrc, setImagescr] = React.useState();
  const [name, setName] = React.useState();
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const image = new Image(60, 45);
  // image.src = `"${name}"`;
  image.src = name;
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
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '20vh' }}
      >
        <Box sx={{ flexDirection: 'row', m: 4 }}>
          <Button
            variant='contained'
            onClick={handleClickOpen('paper')}
            sx={{ my: 5, m: 2 }}
          >
            Select Template
          </Button>

          <Button
            variant='contained'
            onClick={(e) => {
              setTemplate(image);
            }}
            sx={{ my: 5, m: 2 }}
          >
            Use URL
          </Button>
        </Box>

        <TextField
          id='outlined-basic'
          label='Enter URL'
          onChange={handleChange}
          size='small'
        />

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
                <ImageList
                  style={{ cursor: 'pointer' }}
                  variant='masonry'
                  cols={3}
                  gap={8}
                >
                  {imgflipTemplates.map((item) => (
                    <ImageListItem key={item.id}>
                      <img
                        src={item.url}
                        alt={item.name}
                        onClick={(e) => {
                          setTemplate(e.target);
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
      </Grid>
    </div>
  );
}
