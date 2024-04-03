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

let exerciseTime = parseInt(exerciseTimeInput.value) || 40;
let restTime = parseInt(restTimeInput.value) || 20;
let totalTime = (parseInt(totalTimeInput.value) || 20) * 60;
let timeRemaining = totalTime;
let currentTime;
let isExercise = true;
let isPaused = false;
let intervalId;

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function playSound(type) {
  const audio = new Audio(`${type}.mp3`);
  audio.play();
}

function updateTimer() {
  if (!isPaused) {
    currentTime--;
    timeRemaining--;
    if (currentTime === 0) {
      isExercise = !isExercise;
      currentTime = isExercise ? exerciseTime : restTime;
      playSound('switch');
    }
    if (timeRemaining === 0) {
      clearInterval(intervalId);
      playSound('done');
      alert('运动结束!');
    }
    updateDisplay();
  }
}

function updateDisplay() {
  statusDisplay.textContent = isExercise ? '运动时间' : '休息时间';
  currentTimeDisplay.textContent = formatTime(currentTime);
  totalTimeDisplay.textContent = `总剩余时间: ${formatTime(timeRemaining)}`;
  document.body.style.backgroundColor = isExercise ? '#ff6961' : '#77dd77';
  pauseBtn.textContent = isPaused ? '继续' : '暂停';
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
}

function stopTimer() {
  clearInterval(intervalId);
  timeRemaining = 0;
  currentTime = 0;
  isExercise = true;
  isPaused = true;
  updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', () => {
  isPaused = !isPaused;
  updateDisplay();
});
stopBtn.addEventListener('click', stopTimer);