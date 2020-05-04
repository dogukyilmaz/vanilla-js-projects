const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const volume = document.getElementById('volume');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const backward = document.getElementById('backward');
const forward = document.getElementById('forward');
const expand = document.getElementById('expand');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

//LATER: Refactor some codes then todos down below
//TODO: add volume percentage settings
//TODO: next/prev
//TODO: forward/backward
//TODO: color palette & styles
//TODO: redesign the buttons/icons

// Event Listeners
video.addEventListener('click', toggleVideo);
video.addEventListener('pause', changePlayPauseIcon);
video.addEventListener('play', changePlayPauseIcon);
video.addEventListener('timeupdate', uptimeProgress);

play.addEventListener('click', toggleVideo);
stop.addEventListener('click', stopVideo);
volume.addEventListener('click', toggleVolume);
expand.addEventListener('click', openFullscreen);
// prev.addEventListener('click', previousVideo);
// next.addEventListener('click', nextVideo);
// backward.addEventListener('click', backwardVideo);
// forward.addEventListener('click', forwardVideo);

progress.addEventListener('change', setVideoProgress);

// Jump video to uptime progress
function setVideoProgress() {
	video.currentTime = (+progress.value * video.duration) / 100;
}

// Update Progress & Timestamp
function uptimeProgress() {
	progress.value = (video.currentTime * 100) / video.duration;

	// change timestamps to minute:seconds
	// Get minutes & seconds starts with 0...
	let mins = Math.floor(video.currentTime / 60);
	let secs = Math.floor(video.currentTime % 60);
	mins < 10 && (mins = '0' + String(mins));
	secs < 10 && (secs = '0' + String(secs));

	timestamp.innerText = `${mins}:${secs}`;
}

// Volume up & mute
function toggleVolume() {
	video.muted ? (video.muted = false) : (video.muted = true);
	// video.volume === 1 ? (video.volume = 0.00001) : (video.volume = 1);
	changeVolumeIcon();
}

// Change Mute & Unmute Icon
function changeVolumeIcon() {
	video.muted
		? (volume.innerHTML = "<i class='fa fa-volume-mute'></i>")
		: (volume.innerHTML = "<i class='fa fa-volume-up'></i>");
}

// Change Play & Pause Icon
function changePlayPauseIcon() {
	video.paused
		? (play.innerHTML = "<i class='fa fa-play'></i>")
		: (play.innerHTML = "<i class='fa fa-pause'></i>");
}

// Stop Video
function stopVideo() {
	video.currentTime = 0;
	video.pause();
}

// Play & Pause Video
function toggleVideo() {
	video.paused ? video.play() : video.pause();
}

// Fullscreen video
function openFullscreen() {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.mozRequestFullScreen) {
		/* Firefox */
		video.mozRequestFullScreen();
	} else if (video.webkitRequestFullscreen) {
		/* Chrome, Safari & Opera */
		video.webkitRequestFullscreen();
	} else if (video.msRequestFullscreen) {
		/* IE/Edge */
		video.msRequestFullscreen();
	}
}
