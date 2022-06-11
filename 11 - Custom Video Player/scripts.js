// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('#full-screen');

// build our functions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function handleProgress() {
  // console.log(e);
  const currentTime = video.currentTime;
  const videoLen = video.duration;
  const progress = currentTime / videoLen;
  progressBar.style['flex-basis'] = `${progress * 100}%`;
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  // const button = e.target;
  // const skipLen = button.getAttribute('data-skip'); // can also use this.dataset
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  const value = this.value;
  const attr = this.name;
  video[attr] = parseFloat(value);
}

function scrub(e) {
  if (e.type == 'mousemove' && !mousedown) return;
  const scrubTime = e.offsetX / progress.offsetWidth;
  video.currentTime = scrubTime * video.duration;
}

function goFullScreen() {
  video.requestFullscreen();
}

// hook up event listeners
let mousedown = false;

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
fullscreen.addEventListener('click', goFullScreen);
