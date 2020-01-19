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

setTimeout(function() {   //calls click event after a certain time
    var randomItem = list[Math.floor(Math.random()*list.length)]
    console.log(randomItem)
  }, 2000);


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
