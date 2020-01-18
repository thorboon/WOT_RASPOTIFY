import React, {Component} from 'react';
import '../App.css';
import * as $ from "jquery";
import Spotify from 'spotify-web-api-js'
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import SkipePrevIcon from '@material-ui/icons/SkipPrevious';
import SkipeNextIcon from '@material-ui/icons/SkipNext'
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import PauseIcon from '@material-ui/icons/PauseCircleOutline'
import 'react-toastify/dist/ReactToastify.css';
import KeyboardEventHandler from 'react-keyboard-event-handler'
const spotifyWebApi = new Spotify()

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
      is_playing: false,
      progress_ms: 0,
      percentage: 90,
      volume: 0,
      gotsong: false,
      skipe: false,
    }
    if (true){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }
  componentDidMount(){
        // Call this function so that it fetch first time right after mounting the component
        this.getNowPlaying()

        // set Interval
        this.interval = setInterval(this.getNowPlaying, 1500);
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
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url,
            artist: response.item.artists[0].name,
            playing: response.is_playing,
            duration: response.item.duration_ms,
            progress: response.progress_ms
          },
          volume: response.device.volume_percent,
          skip: false,
          gotsong: true,
          is_playing: true,
        })
        console.log('this.setstte', this.state.is_playing)
      }

      //this.getPercentage(this.state.nowPlaying.duration, this.state.nowPlaying.progress)
    }).catch((error)=> {
      console.log(error)
      /*toast.error("Seems like you're not playing anything!", {
        position: toast.POSITION.BOTTOM_CENTER
      })*/
    })
    
  }

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
      document.getElementById('youdied').style.visibility = "hidden"
      document.getElementById('youdiedcontinue').style.visibility = "hidden"
    }else{
      this.setState({
        playingGame: true
      })
    }

  }

  
  render(){
    return (
      <div>
        <ToastContainer></ToastContainer>
        <h1 id="youdied">You Died!</h1>
        <h3 id="youdiedcontinue">press enter to continue</h3>
       <div id="playbutton" className={this.state.playingGame ? 'hidden' : 'loginbutton'} >
              Play Space Invaders
        </div>
        
        
        <section class="player" id="player">
 
        </section>

        <div className="buttombar">
        <h1 className={this.state.gotsong ? 'hidden' : ''}>Play a song on any device!</h1>
        <div className={this.state.gotsong ? '' : 'hidden'}>
            <img src={this.state.nowPlaying.image} style={{width: 120}}/>
          <h1>
          {this.state.nowPlaying.name.toUpperCase()}
          </h1>
          <h1>
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
