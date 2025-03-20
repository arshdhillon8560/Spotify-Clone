console.log("Spotify API");
let currentSong = new Audio();
let songs;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
  return [
    "Apsara - Prem Dhillon.mp3",
    "Barkat - Ranjit Bawa.mp3",
    "Chubby Girl - Davy.mp3",
    "Dildarian - Kambi Rajpuria.mp3",
    "Ehna Chauni Aa - Jassie Gill.mp3",
    "FLOWERS - Talwiinder.mp3",
    "Kamli Jehi - Amrinder Gill.mp3",
    "Main Hi Kyon - Wazir Patar.mp3",
    "Mirrors - Jordan Sandhu.mp3",
    "OVER AND OVER - Armaan Gill.mp3",
    "Pyaar Hoya - Hustinder.mp3",
    "Raula Pai Gya - Sajjan Adeeb.mp3",
    "Shikayatan - Nimrat Khaira.mp3",
    "Water - Diljit Dosanjh.mp3",
    "Yaad - Jassa Dhillon.mp3",
    "You And I - Prem Dhillon.mp3"
  ];
}

const playMusic = (track, pause=false) => {
  //let audio = new Audio("/songs/" + track);
  currentSong.src = "/songs/" + track;
  if(!pause){
    currentSong.play()
      play.src = "img/pause.svg"
  }

  document.querySelector(".songinfo").innerHTML =decodeURI(track)
  document.querySelector(".songtime").innerHTML ="00:00 / 00:00"
};

async function main() {

  songs = await getSongs();
  playMusic(songs[0],true);

  let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];

  for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" width="34" src="img/music.svg" alt="">
                            <div class="info">
                                <div> ${song.replaceAll("%20", " ")}</div>
                                <div>Punjabi Music</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div> </li>`;
  } 

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
      e.addEventListener("click", element => {
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild
        .innerHTML.trim());
      })
    })
    play.addEventListener("click", () => {
     if(currentSong.paused){
       currentSong.play()
       play.src = "img/pause.svg"
     }
     else{
       currentSong.pause()
       play.src = "img/play.svg"
     }

    })
  currentSong.addEventListener("timeupdate", () => {
     console.log(currentSong.currentTime,currentSong.duration)
     document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
     document.querySelector(".circle").style.left=Math.min((currentSong.currentTime / currentSong.duration) * 100) + "%";
    
  })
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = ((currentSong.duration) * percent) / 100

})

document.querySelector(".hamburger").addEventListener("click", () => {
    console.log("Hamburger menu clicked"); // Debugging log
    document.querySelector(".left").style.left = "0"; // Show the sidebar
});

document.querySelector(".close").addEventListener("click", () => {
    console.log("Close button clicked"); // Debugging log
    document.querySelector(".left").style.left = "-130%"; // Hide the sidebar
});
  




  // Add an event listener to previous
  previous.addEventListener("click", () => {
    currentSong.pause()
    console.log("Previous clicked")
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if ((index - 1) >= 0) {
        playMusic(songs[index - 1])
    }
})

// Add an event listener to next
next.addEventListener("click", () => {
    currentSong.pause()
    console.log("Next clicked")

    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if ((index + 1) < songs.length) {
        playMusic(songs[index + 1])
    }
})

document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
    console.log("Setting volume to", e.target.value, "/ 100")
    currentSong.volume = parseInt(e.target.value) / 100
    if (currentSong.volume >0){
        document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("img/mute.svg", "img/volume.svg")
    }
})

// Add event listener to mute the track
document.querySelector(".volume>img").addEventListener("click", e=>{ 
    if(e.target.src.includes("img/volume.svg")){
        e.target.src = e.target.src.replace("img/volume.svg", "img/mute.svg")
        currentSong.volume = 0;
        document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
    }
    else{
        e.target.src = e.target.src.replace("img/mute.svg", "img/volume.svg")
        currentSong.volume = .10;
        document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
    }

})


}

main()