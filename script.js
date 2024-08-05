const playlist = [
    {
        songName: "Ambarsariya",
        songImg: "https://i.ytimg.com/vi/9UDkYz64ehA/maxresdefault.jpg",
        songSrc : "/music/Ambarsariya_320(PagalWorld.com.so).mp3"
    },
    {
        songName: "Ek Baar Nahi Ya Dil Sau Baar Hai Toota",
        songImg: "https://i.ytimg.com/vi/waiB5mgjIo8/maxresdefault.jpg",
        songSrc: "/music/Ek Baar Nahi Ya Dil Sau Baar Hai Toota_320(PagalWorld.com.so).mp3"
    },
    {
        songName: "Nadaaniyan",
        songImg: "https://i.ytimg.com/vi/gPpQNzQP6gE/sddefault.jpg",
        songSrc: "/music/Nadaaniyan_320(PagalWorld.com.so).mp3"
    },
    {
        songName: "Sitam Humpe",
        songImg: "https://i.ytimg.com/vi/BXPO87pT5l4/maxresdefault.jpg",
        songSrc: "/music/Sitam Humpe_320(PagalWorld.com.so).mp3"
    },
    {
        songName: "Tu Aayi Nai",
        songImg: "https://i.ytimg.com/vi/nFgsBxw-zWQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC5NxpGn4uUbuOi05dtxXM8p2B4zg",
        songSrc: "/music/Tu Aayi Nai_320(PagalWorld.com.so).mp3"
    },
];

var handle = document.getElementById('music');
var songName = document.getElementById('song-name');
var songImg = document.getElementById('song-img');
var play = document.getElementById('play');
var pause = document.getElementById('pause');
handle.controls = false;

function togglePlaylist() {
    console.log("5");
    document.getElementById('playlist').classList.toggle("togglePlaylist");
}

function togglePlay() {
    if(handle.paused || handle.ended) {
        play.style.display = 'none';
        pause.style.display = 'inline-block';
        handle.play();
    } else {
        pause.style.display = 'none';
        play.style.display = 'inline-block';
        handle.pause();
    }
}

function setVolume() {
    var volume = document.getElementById('volume');
    handle.volume = volume.value;
}

function loop() {
    handle.loop = !handle.loop;
    if(handle.loop) {
        document.getElementById('repeat').classList.add('repeat-active');
    } else {
        document.getElementById('repeat').classList.remove('repeat-active');
    }
}

function toggleMute() {
    if(!handle.muted) {
        document.getElementById('volume').value = "0";
    } else {
        document.getElementById('volume').value = handle.volume;
    }
    handle.muted = !handle.muted;
}

var duration = 0;
handle.onloadedmetadata = function() {
    duration = Math.floor(handle.duration);
}

function update() {
    var progress = document.getElementById('progress');
    if (handle.currentTime > 0) {
        progress.value = Math.floor((100 / handle.duration) * handle.currentTime);
    }
    var minDuration = Math.floor(duration / 60);
    var secDuration = duration - minDuration * 60;
    document.getElementById('song-duration').innerHTML = minDuration + ":" + secDuration;

    var time = Math.floor(handle.currentTime);
    var min = Math.floor(time / 60);
    var seconds = time - min * 60;
    if (seconds < 10) {
        document.getElementById('current-time').innerHTML = min + ":0" + seconds;
    } else {
        document.getElementById('current-time').innerHTML = min + ":" + seconds;
    }
}

var i = 0;

function next() {
    var prev = "id" + i;
    document.getElementById(prev).classList.remove("addClass");
    if (i < playlist.length - 1) {
        i = i + 1;
    } else {
        i = 0;
    }
    songImg.src = playlist[i].songImg;
    songName.innerHTML = playlist[i].songName;
    handle.src = playlist[i].songSrc;
    handle.autoplay = true;
    var current = "id" + i;
    document.getElementById(current).classList.add("addClass");
    document.getElementById('song-duration').innerHTML = "0:0";
    togglePlay();
}

function back() {
    var prev = "id" + i;
    document.getElementById(prev).classList.remove("addClass");
    if (i > 0) {
        i = i - 1;
    }
    songImg.src = playlist[i].songImg;
    songName.innerHTML = playlist[i].songName;
    handle.src = playlist[i].songSrc;
    handle.autoplay = true;
    var current = "id" + i;
    document.getElementById(current).classList.add("addClass");
    document.getElementById('song-duration').innerHTML = "0:0";
    togglePlay();
}

function songByChoice(e) {
    var prev = "id" + i;
    document.getElementById(prev).classList.remove("addClass");
    var get = "/music/" + document.getElementById(e.id).innerHTML + ".mp3";
    i = playlist.findIndex(x => x.songSrc === get);
    console.log(i);
    songImg.src = playlist[i].songImg;
    songName.innerHTML = playlist[i].songName;
    handle.src = playlist[i].songSrc;
    var current = "id" + i;
    document.getElementById(current).classList.add("addClass");
    handle.autoplay = true;
    togglePlay();
}

var disableUpdate = false;
var progress = document.getElementById('progress');
progress.addEventListener('input', function() {
    disableUpdate = true;
    var progress = document.getElementById('progress').value;
    handle.currentTime = (progress / 100) * handle.duration;
});

if (!disableUpdate) {
    handle.addEventListener("timeupdate", update, false);
}
