import React, {Component} from 'react';
import '../App.css';
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

const spotifyWebApi = new Spotify()

class SpotifyPage extends Component {
  constructor(props){
    super(props)
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        image: '',
        artist: 'Not Checked',
        playing: false,
        duration: 0,
        
        progress: 0,
      },
      percentage: 90,
      volume: 0,
      skipe: false,
    }
    if (true){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }
  componentWillMount(){
    this.getNowPlaying()
    console.log('willmount')
  }
  componentDidMount(){
  }
  getHashParams() {
    
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  getNowPlaying(){
    console.log(this.state.loggedIn)
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      console.log(response)
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
      })
      this.getPercentage(this.state.nowPlaying.duration, this.state.nowPlaying.progress)
    }).catch((error)=> {
      toast.error("Seems like you're not playing anything!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    })
  }

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

  skipSong(){
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

  prevSong(){
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

  playSong(){
    spotifyWebApi.play()
    .then((respone) => {
      this.getNowPlaying()
    })
    console.log(this.state.nowPlaying.playing)
  }

  pauseSong(){
    spotifyWebApi.pause()
    .then((respone) => {
      this.setState({
        nowPlaying: {
          playing: false
        }
      })
      console.log(this.state.nowPlaying.playing)
      //this.getNowPlaying()
    })
  }

  setLouder(){
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

  setQuiet(){
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

  logOut(){

  }

  render(){
    return (
      <div>
        <ToastContainer></ToastContainer>
        <div >
            <a href="http://localhost:8888">
              <button>Login with spotify</button>
            </a>
          </div>

        <div className="buttombar">
        <div className="imagetrack">
          <img src={this.state.nowPlaying.image} style={{width : 80}} />
        </div>
        <div className="titles">
          <h3>
          {this.state.nowPlaying.name}
          </h3>
          <h4>
          {this.state.nowPlaying.artist}
          </h4>
        </div>
        <div className="controlButtons">

        <IconButton color="secondary" onClick={()=> this.prevSong()} >
        <SkipePrevIcon />
        </IconButton>
        <div className={this.state.nowPlaying.playing ? 'hidden' : 'playsongs'}>
        <IconButton color="secondary" onClick={()=> this.playSong()} >
        <PlayIcon />
        </IconButton>
        </div>
        <div className={this.state.nowPlaying.playing ? 'playsongs' : 'hidden'}>
        <IconButton color="secondary" className={this.state.nowPlaying.playing ? '' : 'hidden'}  onClick={()=> this.pauseSong()} >
        <PauseIcon />
        </IconButton>
        </div>
        <IconButton color="secondary" onClick={()=> this.skipSong()} >
        <SkipeNextIcon />
        </IconButton>

        

        </div>
        <div className="soundButtons">
        <IconButton color="secondary" onClick={()=> this.setQuiet()}>
        <VolumeDownIcon />
        </IconButton>
        <IconButton color="secondary" onClick={()=> this.setLouder()}>
        <VolumeUpIcon />
        </IconButton>
        </div>
        <ProgressBar percentage= {this.state.percentage}>
        </ProgressBar>
      </div>
      </div>
    );
  }

}

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
export default SpotifyPage;
