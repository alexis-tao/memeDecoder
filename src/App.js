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

    //this.decodeMeme(this.state.newImageURL);
  }

  decodeMeme(fileURL){

  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  client
    .labelDetection('./resources/wakeupcat.jpg')
    .then(results => {
      const labels = results[0].labelAnnotations;

      console.log('Labels:');
      labels.forEach(label => console.log(label.description));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

  }


  render() {

    return (
      <div className="appWrapper">
        <div className="header">
          <img alt='meme' className="logo" src='meme.png'/>
          <a className="headerLink" href="https://en.wikipedia.org/wiki/Meme">what is a meme?</a>
          <a className="headerLink" href="https://mashable.com/article/2018-best-memes/#M7q.TUik.Pqd">classic memes</a>
          <a className="headerLink" href="https://fsmedia.imgix.net/c7/92/42/c6/34dd/4002/b05c/71637eda680b/qdhl3sgpldcj0jdlsa8fqhdixl6wr1xq--fe1dn59c8jpg.jpeg?auto=format%2Ccompress&w=650">meme of the day</a>
        </div>
        <div className="app">
          <div className="appTitle">what does it meme ??</div>
          <div className="appDescription">
            give us a meme and we'll let you in on the joke
          </div>
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}
            className="dropzone"
          >
            { !this.state.newImage && 
              <div className="smallText">+ click to upload or drag an image here</div>
            }
            { this.state.newImage && <img alt="upload" className="uploadedImage" src={ this.state.newImageURL }/> }
          </Dropzone>
          { this.state.isImageUploaded &&
            <div>
              <div className="meaningTitle">meaning of your meme</div>
              { this.state.newImage.name === "testBrain.jpeg" &&
                <ul className='memeMeaning'>
                  <li>this is known as an <strong>expanding brain meme</strong></li>
                  <li>often used in irony to assoicate situations with intellect (size of the brain)</li>
                  <li>learn more about <a className="learnMoreLink" href="https://knowyourmeme.com/memes/expanding-brain">expanding brain memes</a></li>
                </ul>
              }
              { this.state.newImage.name === "testStarterPack.jpg" &&
                <ul className='memeMeaning'>
                  <li>this is known as a <strong>starter pack meme</strong></li>
                  <li>often used to illustrate common characteristics of a certain group</li>
                  <li>learn more about <a className="learnMoreLink" href="https://knowyourmeme.com/memes/starter-packs">starter pack memes</a></li>
                </ul>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
