const exerciseTimeInput = document.getElementById('exercise-time');
const restTimeInput = document.getElementById('rest-time');
const totalTimeInput = document.getElementById('total-time');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const statusDisplay = document.getElementById('status');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
const container = document.getElementById('container');
const musicSwitch = document.getElementById('music-switch');

let exerciseTime = parseInt(exerciseTimeInput.value) || 40;
let restTime = parseInt(restTimeInput.value) || 20;
let totalTime = (parseInt(totalTimeInput.value) || 20) * 60;
let timeRemaining = totalTime;
let currentTime;
let isExercise = true;
let isPaused = false;
let intervalId;
let isMusicEnabled = true; // Variable to track music status

let sportsSoundPlayer = new Audio('./audios/happy.mp3');
let restSoundPlayer = new Audio('./audios/relaxing.mp3');

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function playSound(type) {
  const audio = new Audio(`${type}.mp3`);
  audio.play();
}

function pauseAllSounds() {
    sportsSoundPlayer.pause();
    restSoundPlayer.pause();
}

function stopAllSounds() {
  stopSportsSound();
  stopRestSound();
}

function stopSportsSound() {
    sportsSoundPlayer.pause();
    sportsSoundPlayer.currentTime = 0;
}

function stopRestSound() {
    restSoundPlayer.pause();
    restSoundPlayer.currentTime = 0;
}

function playSportsSound() {
    if (isMusicEnabled) {
        stopRestSound();
        sportsSoundPlayer.play();
    }
}

function playRestSound() {
    if (isMusicEnabled) {
        stopSportsSound();
        restSoundPlayer.play();
    }
}

function updateTimer() {
  if (!isPaused) {
    currentTime--;
    timeRemaining--;
    if (currentTime === 0) {
      isExercise = !isExercise;
      currentTime = isExercise ? exerciseTime : restTime;

      if (isExercise) {
        playSportsSound();
      }  else {
        playRestSound();
      }
    }

    if (timeRemaining === 0) {
      clearInterval(intervalId);
      stopAllSounds()
      alert('Exercise Finished!');
    }
    updateDisplay();
  }
}

function updateDisplay() {
  statusDisplay.textContent = isExercise ? 'Exercise Time' : 'Rest Time';
  currentTimeDisplay.textContent = formatTime(currentTime);
  totalTimeDisplay.textContent = `Total Time Remaining: ${formatTime(timeRemaining)}`;
  document.body.style.backgroundColor = isExercise ? '#ff6961' : '#77dd77';
  pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
}

function startTimer() {
  clearInterval(intervalId);
  exerciseTime = parseInt(exerciseTimeInput.value) || 40;
  restTime = parseInt(restTimeInput.value) || 20;
  totalTime = (parseInt(totalTimeInput.value) || 20) * 60;
  timeRemaining = totalTime;
  isExercise = true;
  currentTime = exerciseTime;
  isPaused = false;
  updateDisplay();
  intervalId = setInterval(updateTimer, 1000);
  playSportsSound();
}

function stopTimer() {
  clearInterval(intervalId);
  timeRemaining = 0;
  currentTime = 0;
  isExercise = true;
  isPaused = true;
  updateDisplay();
  stopAllSounds();
}

function toggleMusic() {
    isMusicEnabled = !isMusicEnabled;

    if (!isMusicEnabled) {
        pauseAllSounds();
    } else {
        if (isExercise) {
            playSportsSound();
        } else {
            playRestSound();
        }
    }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', () => {
  isPaused = !isPaused;

  if (isExercise) {
    if (isPaused) {
      sportsSoundPlayer.pause();
    } else {
      playSportsSound();
    }
  } else {
    if (isPaused) {
      restSoundPlayer.pause();
    } else {
      playRestSound();
    }
  }

  updateDisplay();
});
stopBtn.addEventListener('click', stopTimer);
musicSwitch.addEventListener('change', toggleMusic);
