import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state= { 
      newImage: ''
    };

    this.onImageDrop = this.onImageDrop.bind(this);
    this.decodeMeme = this.decodeMeme.bind(this);
  }

  onImageDrop(files){
    this.setState({ 
      newImage: files[0],
      newImageURL: files[0].preview,
      isImageUploaded: true,
    });

    this.decodeMeme(this.state.newImageURL);
  }

  decodeMeme(fileURL){

    const Clarifai = require('clarifai');

    const app = new Clarifai.App({
      apiKey: '8373f34be05547e8b5dc07f012cd4480'
    });

    app.models.predict(Clarifai.GENERAL_MODEL, "https://samples.clarifai.com/metro-north.jpg").then(
      function(response) {
        console.log(response.outputs[0].data);
        // do something with response
      },
      function(err) {
        console.log(':(');
        // there was an error
      }
    );
  }


  render() {
    return (
      <div className="app">
        <p className="appTitle">meme decoder</p>
        <p className="text">
          give us a meme, we'll give you meaning of the meme 
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
          { this.state.newImage && <img alt="image upload" className="uploadedImage" src={ this.state.newImageURL }/> }
        </Dropzone>
        { this.state.isImageUploaded &&
          <div className='memeMeaning'>
          <p>here are possible meanings of your meme:</p>
          </div>
        }
      </div>
    );
  }
}

export default App;
