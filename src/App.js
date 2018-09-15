import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state= { 
      uploadedFileCloudinaryURL: ''
    };

    this.onImageDrop = this.onImageDrop.bind(this);
  }

  onImageDrop(files){
    this.setState({ 
      newImage: files[0]
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
          <img className="uploadedImage" src={ this.state.newImage && this.state.newImage.preview && this.state.newImage.preview }/>
        </Dropzone>
      </div>
    );
  }
}

export default App;
