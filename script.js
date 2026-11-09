const songs = [
    {
        title: "Song One",
        artist: "Artist One",
        src: "songs/song1.mp3"
    },
    {
        title: "Song Two",
        artist: "Artist Two",
        src: "songs/song2.mp3"
    },
    {
        title: "Song Three",
        artist: "Artist Three",
        src: "songs/song3.mp3"
    }
];

const audio = document.getElementById("audio");

const title = document.getElementById("song-title");
const artist = document.getElementById("artist");

const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlist = document.getElementById("playlist");

let songIndex = 0;



function loadSong(index) {

    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = song.src;

    updatePlaylist();
}



function playSong() {

    audio.play();

    playButton.innerHTML =
        '<i class="fa-solid fa-pause"></i>';
}



function pauseSong() {

    audio.pause();

    playButton.innerHTML =
        '<i class="fa-solid fa-play"></i>';
}


playButton.addEventListener("click", () => {

    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }

});



nextButton.addEventListener("click", () => {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();

});



prevButton.addEventListener("click", () => {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();

});



audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const progressPercent =
            (audio.currentTime / audio.duration) * 100;

        progress.value = progressPercent;

        currentTime.textContent =
            formatTime(audio.currentTime);
    }

});



audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

});



progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;
    }

});


volume.addEventListener("input", () => {

    audio.volume = volume.value;

});



audio.addEventListener("ended", () => {

    nextButton.click();

});



function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
}



function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const li = document.createElement("li");

        li.textContent =
            `${song.title} - ${song.artist}`;

        li.addEventListener("click", () => {

            songIndex = index;

            loadSong(songIndex);
            playSong();

        });

        playlist.appendChild(li);

    });

}



function updatePlaylist() {

    const items = playlist.querySelectorAll("li");

    items.forEach((item, index) => {

        item.classList.toggle(
            "active",
            index === songIndex
        );

    });

}



createPlaylist();
loadSong(songIndex);