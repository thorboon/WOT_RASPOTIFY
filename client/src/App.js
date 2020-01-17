import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js'
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SpotifyPage from './pages/SpotifyPage'
import 'react-toastify/dist/ReactToastify.css';

const spotifyWebApi = new Spotify()

class App extends Component {
render(){
  return(
    <div className="App">
      <SpotifyPage></SpotifyPage>
    </div>
  )
}
}
export default App;
