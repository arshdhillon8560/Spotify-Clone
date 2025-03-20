console.log("Spotify API");
let currentSong = new Audio();
let songs;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
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

const playMusic = (track, pause = false) => {
    currentSong.src = "/songs/" + track;
    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function main() {
    songs = await getSongs();
    playMusic(songs[0], true);

    let songUL = document.querySelector(".songList ul");
    songs.forEach(song => {
        songUL.innerHTML += `<li>
            <img class="invert" width="34" src="img/music.svg" alt="">
            <div class="info">
                <div>${song.replaceAll("%20", " ")}</div>
                <div>Punjabi Music</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="img/play.svg" alt="">
            </div>
        </li>`;
    });

    document.querySelectorAll(".songList li").forEach((e, index) => {
        e.addEventListener("click", () => {
            playMusic(songs[index]);
        });
    });

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = Math.min((currentSong.currentTime / currentSong.duration) * 100) + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-130%";
    });

    // Fix previous button
    previous.addEventListener("click", () => {
        currentSong.pause();
        let currentFilename = decodeURIComponent(currentSong.src.split("/").pop());
        let index = songs.indexOf(currentFilename);
        if (index > 0) {
            playMusic(songs[index - 1]);
        }
    });

    // Fix next button
    next.addEventListener("click", () => {
        currentSong.pause();
        let currentFilename = decodeURIComponent(currentSong.src.split("/").pop());
        let index = songs.indexOf(currentFilename);
        if (index < songs.length - 1) {
            playMusic(songs[index + 1]);
        }
    });

    document.querySelector(".range input").addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        document.querySelector(".volume>img").src = currentSong.volume > 0 ? "img/volume.svg" : "img/mute.svg";
    });

    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("img/volume.svg")) {
            e.target.src = "img/mute.svg";
            currentSong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            e.target.src = "img/volume.svg";
            currentSong.volume = 0.1;
            document.querySelector(".range input").value = 10;
        }
    });
}

main();