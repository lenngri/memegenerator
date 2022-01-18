import React, { Component } from 'react';
import { render } from 'react-dom';
import CanvasDraw from 'react-canvas-draw';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { Container, ImageList, ImageListItem, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStoreState, useStoreActions } from 'easy-peasy';

// import classNames from './index.css';

export default class DrawCanvas extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    color: '#ffc600',
    width: 400,
    height: 400,
    brushRadius: 10,
    lazyRadius: 12,
    backgroundImg:
      'https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg',
    imgs: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg',
      'https://i.imgur.com/a0CGGVC.jpg',
    ],
  };

  click = () => {
    this.props.parentMethod();
  };

  render() {
    return (
      <div>
        <Container>
          <div>
            <button
              // onClick={() => {
              //   localStorage.setItem(
              //     'savedDrawing',
              //     this.saveableCanvas.getSaveData()
              //   );
              //   this.props.parentMethod();
              // }}
              onClick={() => {
                this.props.parentMethod(this.saveableCanvas.getDataURL());
                console.log(this.saveableCanvas.getDataURL());
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                this.saveableCanvas.eraseAll();
              }}
            >
              Erase
            </button>
            <button
              onClick={() => {
                this.saveableCanvas.undo();
              }}
            >
              Undo
            </button>
            <button
              onClick={() => {
                console.log(this.saveableCanvas.getDataURL());
                alert('DataURL written to console');
              }}
            >
              GetDataURL
            </button>
            <div>
              <label>Width:</label>
              <input
                type='number'
                value={this.state.width}
                onChange={(e) =>
                  this.setState({ width: parseInt(e.target.value, 10) })
                }
              />
            </div>
            <div>
              <label>Height:</label>
              <input
                type='number'
                value={this.state.height}
                onChange={(e) =>
                  this.setState({ height: parseInt(e.target.value, 10) })
                }
              />
            </div>
            <div>
              <label>Brush-Radius:</label>
              <input
                type='number'
                value={this.state.brushRadius}
                onChange={(e) =>
                  this.setState({ brushRadius: parseInt(e.target.value, 10) })
                }
              />
            </div>
            <div>
              <label>Lazy-Radius:</label>
              <input
                type='number'
                value={this.state.lazyRadius}
                onChange={(e) =>
                  this.setState({ lazyRadius: parseInt(e.target.value, 10) })
                }
              />
            </div>
          </div>
          <CanvasDraw
            ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
            brushColor={this.state.color}
            brushRadius={this.state.brushRadius}
            lazyRadius={this.state.lazyRadius}
            canvasWidth={this.state.width}
            canvasHeight={this.state.height}
          />

          {/* <p>
            The following is a disabled canvas with a hidden grid that we use to
            load & show your saved drawing.
          </p>
          <button
            onClick={() => {
              this.loadableCanvas.loadSaveData(
                localStorage.getItem('savedDrawing')
              );
            }}
          >
            Load what you saved previously into the following canvas. Either by
            calling `loadSaveData()` on the component's reference or passing it
            the `saveData` prop:
          </button>
          <CanvasDraw
            disabled
            hideGrid
            ref={(canvasDraw) => (this.loadableCanvas = canvasDraw)}
            saveData={localStorage.getItem('savedDrawing')}
          />
          <p>
            The saving & loading also takes different dimensions into account.
            Change the width & height, draw something and save it and then load
            it into the disabled canvas. It will load your previously saved
            masterpiece scaled to the current canvas dimensions.
          </p>
          <p></p> */}
        </Container>
      </div>
    );
  }
}
