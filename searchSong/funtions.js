const title = document.getElementById('inputTitle');
const artist = document.getElementById('inputArtist');
const savebtn = document.getElementById('savebtn');
const output = document.getElementById('title');
const database = firebase.database();



savebtn.addEventListener('click', () => {
    database.ref('/songs/').push({
        title: title.value,
        artist: artist.value
    }) .then(() => {
        console.log('Added new song to database');
        location.reload()
    });
});
function deleta (id){
    database.ref('songs/').child(id).remove()
    .then(() => {
        console.log('Song removed from database');
        location.reload()

    })
    .catch(error => {
        console.error(error);
    });
};

//function getdata() {
//   var songs=document.getElementById("title").value;
//
//    firebase.database().ref('songs/').once('value').then(function (snapshot){
//        const title=snapshot.val().title;
//        const title=snapshot.val().title;
//        const artist=snapshot.val().artist;
    
//document.getElementById('title').innerHTML=title;
//document.getElementById('artist').innerHTML=artist;

    
//});
//}
function songRequest() {
let items = document.querySelectorAll('.songs');
    if(items != null){
        for(let i = 0; i < items.length; i++){
            items[i].addEventListener('click', function(event){
                deleta(event.target.id)

            });
        }
    }
}



let list = [];

var timer;
var startTime;

function start() {
  startTime = parseInt(localStorage.getItem('startTime') || Date.now());
  localStorage.setItem('startTime', startTime);
  timer = setInterval(clockTick, 100);
}

function stop() {
  clearInterval(timer);
}

function reset() {
  clearInterval(timer);
  localStorage.removeItem('startTime');
}



function clockTick() {
    var currentTime = Date.now()
    if(currentTime - startTime >= 150*60*100){
        stop();
        var randomItem = list[Math.floor(Math.random()*list.length)]
        database.ref('/randomSong/').set({
           randomItem
        }) .then(() => {
            console.log('Added new song to database');
            location.reload()
        });


        database.ref('/songs/').set({
        }) .then(() => {
            console.log('Added new song to database');
        });
        

        setInterval(() => {
            database.ref('/randomSong/').set({
             }) .then(() => {
                 console.log('Added new song to database');
                 location.reload()
             });
        }, 120000);
        reset()
    }

};

var stopBtn = document.getElementById('stop_btn');

stopBtn.addEventListener('click', function() {
  stop();
  reset()
})
start();

    // callback function for final action after countdown
        //var randomItem = list[Math.floor(Math.random()*list.length)]
        //console.log(randomItem)
        // show message that session is over, perhaps redirect or log out 
         

function getdata(){
    var ref = firebase.database().ref("songs");
    ref.once("value")
    .then(function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            let data = childSnapshot.val()

            list.push(data)
            
            let newdiv = document.createElement('div');
            newdiv.id = childSnapshot.key;
            newdiv.className = "songs";
            newdiv.innerHTML = data.title + " " + data.artist ;
            
            console.log(list)
            output.appendChild(newdiv)

        })
        songRequest()

});
}getdata()
