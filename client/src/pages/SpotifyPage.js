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
      nowPlaying: {
        name: 'Play a song!',
        image: '',
        artist: '',
        playing: false,
        duration: 0,
        progress: 0,
      },
      name:'',
      title:'',
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
    console.log(this.state.loggedIn)
    
    if(!this.state.loggedIn){
      window.location.href = 'http://localhost:8888/'
    }else{
      console.log('loggedin')
    }
    
  }
  componentDidMount(){
      songRef.on('value', snapshot => {
        let data = snapshot.val()      
        this.setState({
            title: data.title  
        })
      })
        // Call this function so that it fetch first time right after mounting the component
        this.getNowPlaying()
        this.searchSong()


        // set Interval
        this.interval = setInterval(this.getNowPlaying, 2000);
  }
  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      console.log('enter press here! ')
    }
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
    console.log(this.state.title)
      spotifyWebApi.searchTracks('this.state.title')
    .then(function(data) {
      console.log('Search tracks by "Love" in the artist name', data);
    }, function(err) {
      console.error(err);
    });
    };
  
  getId = () => {
    const id = shortid.generate();
    console.log(id);
    return id;
  };


  getNowPlaying = () => {
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      //console.log(response)
      console.log('song is playing?',response.is_playing)
      // if song is paused
      if(!response.is_playing){
        console.log('song is pauzed')
        this.pauseSong()
      }else{
        if(this.state.name == response.item.name){
          // if same song don't do anything
          //setTimeout(function(){document.getElementById('title').classList.remove('anim-typewriter')}, 1500)
        }else{
          console.log('not same song')
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
        console.log('this.set', this.state.is_playing)
        document.body.style.backgroundImage = `url('${this.state.nowPlaying.image}')`;

      }
      //this.getPercentage(this.state.nowPlaying.duration, this.state.nowPlaying.progress)
    }).catch((error)=> {
      console.log(error)
      /*toast.error("Seems like you're not playing anything!", {
        position: toast.POSITION.BOTTOM_CENTER
      })*/
    })
    
  }

//search Song
//first connection with firebase

//src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js">




  // Your web app's Firebase configuration


// query that must search for the song 
// https://api.spotify.com/v1/search?q=this must be the artist&type=artist
//curl -X "GET" "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer "




/*
  getPercentage(noemer,teller){
    let percent = teller * 100 / noemer
    this.setState({
        percentage: percent
      
    })
      console.log(this.state.percentage)
      console.log(percent)
      this.updateTrack(noemer)
    
    
  }

  updateTrack(noemer){
    let myVar
    // get sec
    let noemersec = noemer / 1000
    // clear interval before we start !doesntwork!
    this.TryClearFuckingInterval(this.myVar)
    // get procent per seconde
    let noemersecpersec = 100 / noemersec
    if(this.state.nowPlaying.playing){
        functionClearInterval()
        myVar = setInterval(()=> {
        this.getPercentageUpdate(noemersecpersec)
            // if songs is over clear interval !works!
        if(!this.state.nowPlaying.playing || this.state.percentage > 99.999){
          this.getNowPlaying()
          functionClearInterval()
        }
        
      }, 1000);
   
      function functionClearInterval(){
          console.log(myVar)
        clearInterval(myVar);
        console.log("clearint")

      }
      
      //clearInterval(i)
    }else{
        
      //clearInterval(i)
      // nothing playing 
    }
    
  }
TryClearFuckingInterval(interval){
    console.log(interval)
    clearInterval(interval)
}

  getPercentageUpdate(noemersecpersec){
    console.log(this.state.percentage)
    console.log('1')
    let newpercent = this.state.percentage + noemersecpersec
    this.setState({
      percentage: newpercent
    })
  }
*/
  skipSong = () => {
    console.log(this.state.loggedIn)
    spotifyWebApi.skipToNext()
    .then((response) => {
      //console.log(response)
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
      console.log(response)
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
    console.log(this.state.nowPlaying.playing)
  }

  pauseSong = () => {
    console.log('pause function')
    //console.log('state pause', this.state.is_playing)
    if(this.state.is_playing){
      spotifyWebApi.pause()
      .then(
        this.setState({
            is_playing: false
        }), 
        console.log('state playing',this.state.is_playing)
        //this.getNowPlaying()
      ).catch((error) => {
        console.log(error)
      })
    }else{
      console.log('already paused')
    }
  }

  setLouder = () => {
    console.log(this.state.volume)
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
    console.log(this.state.nowPlaying.volume)
    let volume = this.state.volume - 10
    if(volume < 0){
      volume = 0
    }
    spotifyWebApi.setVolume(volume)
    .then((respone) => {
      console.log(respone)
      this.setState({
          volume: volume,  
      })
      
    })
  }
  playorpause = () => {
    console.log(this.state.is_playing)
    if(this.state.is_playing){
      this.pauseSong()
    }else if(!this.state.is_playing){
      this.playSong()
    }
  }
  
  startGame = () => {
    console.log(this.state.playingGame)
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
