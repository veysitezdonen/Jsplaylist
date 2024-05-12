const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

let index = 0; 

let loop = true;

const songsList = [
  {
    name: "Tanımadığım Ten",
    link: "assets/Y2DL_Ahmet_Aslan_-_Tanımadığım_Ten_I_Lyric_Video_2023_Kalan_Müzik.mp3",
    artist: "Ahmet Aslan",
    image: "assets/ahmet-aslan.jpeg",
  },
  {
    name: "Mockinbird",
    link: "assets/Y2dl.com_Eminem_-_Mockingbird_(Lyrics).mp3",
    artist: "Eminem",
    image: "assets/eminem-mockinbird.jpeg",
  },
  {
    name: "Sonne",
    link: "assets/Y2DL_rammstein_-_sonne_best_part.mp3",
    artist: "Rammstein",
    image: "assets/rammstein - sonne best part.jpeg",
  },
  {
    name: "Say Yes To Heaven",
    link: "assets/Say Yes To Heaven x Shootout.mp3",
    artist: "Say Yes To Heaven x Shootout",
    image: "assets/say yes to heaven x shootout.jpeg",
  },
];

const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
  playAudio();
  playListContainer.classList.add("hide");
};

playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
    console.log("tekrar kapatıldı");
  } else {
    repeatButton.classList.add("active");
    audio.loop = true;
    console.log("tekrar açıldı");
  }
});

shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
    console.log("karıştırma kapalı");
  } else {
    shuffleButton.classList.add("active");
    loop = false;
    console.log("karıştırma açık");
  }
});

progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;
  let coordEnd = event.clientX;
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progress * 100 + "%";
  audio.currentTime = progress * audio.duration;

  playAudio();
});

setInterval(() => {
  currentProgress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
}, 1000);

const playAudio = () => {
  audio.play();
  playButton.classList.add("hide");
  pauseButton.classList.remove("hide");
};

const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};


const nextSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
    setSong(index);
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    setSong(randIndex);
  }
};

const previousSong = () => {
  pauseAudio();
  if (index > 0) {
    index = index - 1;
  } else {
    index = songsList.length - 1;
  }
  setSong(index);
};

audio.onended = () => {
  nextSong();
};

const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

const initPlaylist = () => {
  for (const i in songsList) {
    playListSongs.innerHTML += `<li class="songsList"
       onclick="setSong(${i})">
       <div class="playlist-image-container">
        <img src="${songsList[i].image}"/>
       </div>
       <div class="playlist-song-details">
        <span id="playlist-song-name">
         ${songsList[i].name}
         </span>
         <span id="playlist-song-artist-album">
         ${songsList[i].artist}
         </span>
        </div>
       </li>`;
  }
};

playButton.addEventListener("click", playAudio);
pauseButton.addEventListener("click", pauseAudio);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", previousSong);

window.onload = () => {
  setSong(index);
  pauseAudio();
  initPlaylist();
};
