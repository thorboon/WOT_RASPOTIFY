import React, {Component} from 'react';
import '../App.css';
import * as $ from "jquery";
import Spotify from 'spotify-web-api-js'
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import SkipePrevIcon from '@material-ui/icons/SkipPrevious';
import SkipeNextIcon from '@material-ui/icons/SkipNext';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import PauseIcon from '@material-ui/icons/PauseCircleOutline';
import 'react-toastify/dist/ReactToastify.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import shortid from 'shortid';
import firebase from 'firebase';

const spotifyWebApi = new Spotify()
  // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyDIG7Rz9x19TBzzPIm9BIm1JKCtDGg3-Bw",
    authDomain: "spotifypoll-e2607.firebaseapp.com",
    databaseURL: "https://spotifypoll-e2607.firebaseio.com",
    projectId: "spotifypoll-e2607",
    storageBucket: "spotifypoll-e2607.appspot.com",
    messagingSenderId: "268377467416",
    appId: "1:268377467416:web:d2f46cf25be9002ee6716d",
    measurementId: "G-JDHF1KSXNK"
};
firebase.initializeApp(firebaseConfig)
let database = firebase.database()
var songRef = database.ref('randomSong/randomItem');


class SpotifyPage extends Component {

  constructor(props){
    super(props)
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      refreshtoken: params.refresh_token ,
      nowPlaying: {
        name: 'Play a song!',
        image: '',
        artist: '',
        playing: false,
        duration: 0,
        progress: 0,
      },
      randomSong: {
        songtitle: '',
        songArtist: '',
        songImage: '',
      },
      name:'',
      randomTitle:'',
      randomArtist:'',
      is_playing: false,
      progress_ms: 0,
      percentage: 90,
      volume: 0,
      gotsong: false,
      skipe: false,
    }
    if (this.state.loggedIn){
      spotifyWebApi.setAccessToken(params.access_token)
    } 
  }
  componentWillMount(){
    if(!this.state.loggedIn){
      window.location.href = 'http://localhost:8888/'
    }else{
      // user is logged in play song now
    }
    
  }
  componentDidMount(){
      songRef.on('value', snapshot => {
        let data = snapshot.val()
        if(data){
          this.setState({
            randomTitle: data.title,  
            randomArtist: data.artist
        })

          this.searchSong()
        } else {
          // no song from poll
        }   

      })
        // Call this function so that it fetch first time right after mounting the component
        this.getNowPlaying()


        // set Interval
        this.interval = setInterval(this.getNowPlaying, 2000);
  }

  getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  
  searchSong = () => {
      spotifyWebApi.searchTracks(this.state.randomTitle)
    .then((data) => {
      this.setState({
        randomSong: {
          songTitle: data.tracks.items[0].title,
          songArtist:  data.tracks.items[0].artist,
          songImage: data.tracks.items[0].image
        }
      })
      this.playRandomSong(data.tracks.items[0].uri)
      //this.getAudioFeaturesForTrack(data.tracks.items[0].uri)
    }, function(err) {
      console.error(err);
    });
    };

    playRandomSong = (data) => {
      let options =  {"uris": [data]}
      spotifyWebApi.play(options)
      .then()
      .catch(err => console.log(err))
    }


  getNowPlaying = () => {
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      // if song is paused
      if(!response.is_playing){
        this.pauseSong()
      }else{
        if(this.state.name == response.item.name){
          // if same song don't do anything
          //setTimeout(function(){document.getElementById('title').classList.remove('anim-typewriter')}, 1500)
        }else{
          //if not same song add animation
          document.getElementById('image').classList.add('fade-in')
          document.getElementById('title').classList.add('anim-typewriter')
          document.getElementById('artist').classList.add('anim-typewriter')

          setTimeout(function(){document.getElementById('title').classList.remove('anim-typewriter')}, 3700)
          setTimeout(function(){document.getElementById('artist').classList.remove('anim-typewriter')}, 3700)
          setTimeout(function(){document.getElementById('image').classList.remove('fade-in')}, 2700)

        }
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url,
            artist: response.item.artists[0].name,
            playing: response.is_playing,
            duration: response.item.duration_ms,
            progress: response.progress_ms
          },
          name: response.item.name,
          volume: response.device.volume_percent,
          skip: false,
          gotsong: true,
          is_playing: true,
        })
        
        document.body.style.backgroundImage = `url('${this.state.nowPlaying.image}')`;

      }
     
    }).catch((error)=> {
      console.log(error)
      window.location.href = 'http://localhost:8888'
    })
    
  }


  skipSong = () => {
    spotifyWebApi.skipToNext()
    .then((response) => {
      this.setState({
        skip: true
    })
      this.getNowPlaying()
    }).catch((error)=> {
      toast.error("Seems like you're not playing anything!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    })
  }

  prevSong = () =>{
    spotifyWebApi.skipToPrevious()
    .then((response) => {
      this.setState({
          skip: true
      })
      this.getNowPlaying()
      
    }).catch((error)=> {
      toast.error("Seems like you're not playing anything!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    })
  }

  playSong = () =>{
    spotifyWebApi.play()
    .then((respone) => {
      this.getNowPlaying()
    })
  }

  pauseSong = () => {
    if(this.state.is_playing){
      spotifyWebApi.pause()
      .then(
        this.setState({
            is_playing: false
        }), 
      ).catch((error) => {
        console.log(error)
      })
    }else{
      // already paused
    }
  }

  setLouder = () => {
    let volume = this.state.volume + 10
    if(volume > 100){
      volume = 100
    }
    spotifyWebApi.setVolume(volume)
    .then((respone) => {
      this.setState({
          volume: volume,
        
      })
     
    })
  }

  setQuiet = () => {
    let volume = this.state.volume - 10
    if(volume < 0){
      volume = 0
    }
    spotifyWebApi.setVolume(volume)
    .then((respone) => {
      this.setState({
          volume: volume,  
      })
      
    })
  }
  playorpause = () => {
    if(this.state.is_playing){
      this.pauseSong()
    }else if(!this.state.is_playing){
      this.playSong()
    }
  }
  
  startGame = () => {
    if(this.state.playingGame){
      this.setState({
        playingGame: false
      })
      if(document.getElementById('playbutton').style.visibility = 'hidden'){
        document.getElementById('playbutton').style.visibility = 'visible'
      }
      document.getElementById('score').style.visibility = 'hidden'
      document.getElementById('score').innerHTML = 0
      document.getElementById('youdied').style.visibility = "hidden"
      document.getElementById('youdiedcontinue').style.visibility = "hidden"
      document.getElementById('youwon').style.visibility = "hidden"
      document.getElementById('youwoncontinue').style.visibility = "hidden"
      
    }else{
      document.getElementById('playbutton').style.visibility = 'hidden'
      this.setState({
        playingGame: true
      })
      
    }

  }

  render(){
    return (
      <div>
        <ToastContainer></ToastContainer>
        <h1 id="score"></h1>
        <h1 id="youdied">You Died!</h1>
        <h3 id="youdiedcontinue">press enter to continue</h3>

        <h1 id="youwon">Congratulations! You Won!</h1>
        <h3 id="youwoncontinue">press enter to continue</h3>
       <div id="playbutton" className={this.state.playingGame ? 'hidden' : 'loginbutton'} >
              Play Space Invaders
        </div>
        
        
        <section className="player" id="player">
 
        </section>

        <div className="buttombar">
        <h1 className={this.state.gotsong ? 'hidden' : ''}>Play a song on any device!</h1>
        <div className={this.state.gotsong ? '' : 'hidden'}>
            <img id="image" src={this.state.nowPlaying.image} style={{width: 120}}/>
          <h1 id="title">
          {this.state.nowPlaying.name.toUpperCase()}
          </h1>
          <h1 id="artist">
          {this.state.nowPlaying.artist.toUpperCase()}
          </h1>

        <IconButton style={{color: 'white'}} onClick={()=> this.prevSong()} >
        <SkipePrevIcon />
        </IconButton>
        <div className={this.state.is_playing ? 'hidden' : 'playsongs'}>
        <IconButton style={{color: 'white'}} onClick={()=> this.playSong()} >
        <PlayIcon />
        </IconButton>
        </div>
        <div className={this.state.is_playing ? 'playsongs' : 'hidden'}>
        <IconButton  style={{color: 'white'}} onClick={()=> this.pauseSong()} >
        <PauseIcon/>
        </IconButton>
        </div>
        <IconButton style={{color: 'white'}} onClick={()=> this.skipSong()} >
        <SkipeNextIcon />
        </IconButton>
      
        <IconButton style={{color: 'white'}} onClick={()=> this.setQuiet()}>
        <VolumeDownIcon />
        </IconButton>
        <IconButton style={{color: 'white'}} onClick={()=> this.setLouder()}>
        <VolumeUpIcon />
        </IconButton>
        
        </div>
      </div>
      <KeyboardEventHandler handleKeys={['space']} onKeyEvent={(key) => this.playorpause()} />
      <KeyboardEventHandler handleKeys={['up']} onKeyEvent={(key) => this.setLouder()} />
      <KeyboardEventHandler handleKeys={['down']} onKeyEvent={(key) => this.setQuiet()} />
      <KeyboardEventHandler handleKeys={['left']} onKeyEvent={(key) => this.prevSong()} />
      <KeyboardEventHandler handleKeys={['right']} onKeyEvent={(key) => this.skipSong()} />
      <KeyboardEventHandler handleKeys={['enter']} onKeyEvent={(key) => this.startGame()} />

      </div>
      
    );
  }

}
/*
const ProgressBar = (props) => {
  return (
      <div className="Progressbar">
          <Filler percentage={props.percentage}/>
      </div>
  )
}
const Filler = (props) => {
  return(
      <div className="Thumb" style={{ width: `${props.percentage}%`}}></div>
  )
}
*/
export default SpotifyPage;
