import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import "./App.css";
import ParticlesBg from "particles-bg";


const returnCarifaiRequestOptions = (imageUrl) => {
  console.log(imageUrl);
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = "cb5edaf03e404443904849e20993f4c8";
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "dextervorbe";
  const APP_ID = "facerecognitionbrain";
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = "face-detection";
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      box: {}
    };
  }

  calculateFaceLocation = (data) => {
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box


   console.log(clarifaiFace)
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log(this.state.input)
  };

  onButtonSubmit = () => {

    fetch(
      "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
      returnCarifaiRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((result) => this.calculateFaceLocation(result))
      .catch((error) => console.log("error", error));


  };


  render() {
    return (
      <div className="App">
        <ParticlesBg num={20} type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition onInputChange={this.state.input}/>
      </div>
    );
  }
}

export default App;
