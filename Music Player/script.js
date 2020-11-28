const musicPlayer = document.querySelector('.music-player');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

const audio = document.querySelector('.audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const musicTitle = document.querySelector('.music-title');
const cover = document.querySelector('.cover');

const songs = ['Morning_Kiss', 'Gloomy', 'Fly_With_Me'];

// 첫 재생 곡 고정
let songIndex = 0;

function init() {
    loadSong(songs[songIndex]);
}

// 플레이할 곡 준비
function loadSong(song) {
    musicTitle.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// 곡 재생
function playSong() {
    musicPlayer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// 곡 일시정지
function pauseSong() {
    musicPlayer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

// 이전 곡 재생
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        // 맨 처음 곡에서 맨 끝 곡으로 이동
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong(); // 바로 플레이
}

// 다음 곡 재생
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        // 맨 끝 곡에서 맨 처음 곡으로 이동
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong(); // 바로 플레이
}

// progress bar 업데이트
function updateProgress(e) {
    const {
        duration,
        currentTime
    } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// progress bar 설정
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Event listeners
// * onclick 사용하지 않고 함수 짜보기
playBtn.addEventListener('click', () => {
    const isPlaying = musicPlayer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

init();

// 곡 변경
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// 시간/곡 업데이트
audio.addEventListener('timeupdate', updateProgress);

// progress bar 클릭하여 재생 구간 조정
progressContainer.addEventListener('click', setProgress);

// 곡 전체 재생 후 다음 곡으로 넘어감
audio.addEventListener('ended', nextSong);