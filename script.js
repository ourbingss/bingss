// Deklarasi Elemen DOM
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const progressBar = document.getElementById('progress-bar');
const soundWave = document.getElementById('sound-wave');
const currentTimeEl = document.getElementById('current-time');
const maxDuration = 90; 
const progress = (audio.currentTime / maxDuration) * 100;
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().then(() => {
      playIcon.classList.replace('fa-play', 'fa-pause');
      if (soundWave) soundWave.classList.add('playing');
    }).catch(error => {
      console.error("Gagal memutar audio. Periksa path file atau interaksi browser:", error);
    });
  } else {
    audio.pause();
    playIcon.classList.replace('fa-pause', 'fa-play');
    if (soundWave) soundWave.classList.remove('playing');
  }
});

audio.addEventListener('timeupdate', () => {
  if (currentTimeEl) {
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
  
  if (progressBar) {
    progressBar.value = Math.min(progress, 100);
  }
  
  if (audio.currentTime >= maxDuration) {
    audio.pause();
    audio.currentTime = 0;
    playIcon.classList.replace('fa-pause', 'fa-play');
    if (soundWave) soundWave.classList.remove('playing');
  }
});

if (progressBar) {
  progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * maxDuration;
  });
}