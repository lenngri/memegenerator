import React, { Component } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { Container } from '@mui/material';
import { SliderPicker } from 'react-color';

export default class DrawCanvas extends Component {
  state = {
    color: '#ffc600',
    width: 400,
    height: 400,
    brushRadius: 10,
    lazyRadius: 12,
    counter: 0,
    background: '#ffc600',
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    this.setState({ color: color.hex });
  };

  render() {
    return (
      <div>
        <Container>
          <div>
            <button
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
            <div>
              Current color:{' '}
              <div
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  backgroundColor: this.state.color,
                  border: '1px solid #272727',
                }}
              />
            </div>
            <SliderPicker
              color={this.state.background}
              onChangeComplete={this.handleChangeComplete}
            />
          </div>
          <CanvasDraw
            ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
            brushColor={this.state.color}
            brushRadius={this.state.brushRadius}
            lazyRadius={this.state.lazyRadius}
            canvasWidth={this.state.width}
            canvasHeight={this.state.height}
          />
        </Container>
      </div>
    );
  }
}
