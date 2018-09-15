import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state= { 
      newImage: ''
    };

    this.onImageDrop = this.onImageDrop.bind(this);
  }

  onImageDrop(files){
    this.setState({ 
      newImage: files[0],
      newImageURL: files[0].preview,
      isImageUploaded: true,
    });
  }

  render() {
    return (
      <div className="app">
        <p className="appTitle">meme decoder</p>
        <p className="text">
          give us a meme and we'll decode it for you!
        </p>
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onImageDrop.bind(this)}
          className="dropzone"
        >
          { !this.state.newImage && 
            <p className="smallText">Click to upload or drag an image here</p>
          }
          <img className="uploadedImage" src={ this.state.newImageURL }/>
        </Dropzone>
        { this.state.isImageUploaded &&
          <div className='memeMeaning'>
          <p>here are possible meanings of your meme</p>
          </div>
        }
      </div>
    );
  }
}

export default App;
