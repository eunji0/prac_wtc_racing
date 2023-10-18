/*사용변수 만들기
상태를 확인하는 메서드만들기 게임종료와 확인초 추가.
인풋창에 focus라고 점수를 0으로 초기화
버튼 체인지를 게임중으로
게임종료가되면 다시 게임을 시작을 할 수 있도록
*/

let score = 0;
let GAME_TIME = 3;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let word = 0;

const wordDisplay = document.querySelector('.word-display');
const wordInput = document.querySelector('.word-input');
const timeDisplay = document.querySelector('.time');
const scoreDisplay = document.querySelector('.score');
const button = document.querySelector('.button');

init();

function init() {
  getWords();
  wordInput.addEventListener('input', checkMatch);
}

function getWords() {
  word = ['abc', 'apple', 'key', 'dog'];
  buttonChange('게임시작');
}

function checkMatch() {
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = "";
    if (!isPlaying) {
      return;
    }
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random() * word.length);
    wordDisplay.innerText = word[randomIndex];
  }
}

function checkState() {
  if (!isPlaying && time === 0) {
    buttonChange('게임시작');
    clearInterval(checkInterval);
  }
}
function timeCount() {
  time > 0 ? time-- : isPlaying = false;
  if (!isPlaying) {
    clearInterval(timeInterval);
    buttonChange('게임종료');
  }
  timeDisplay.innerText = time;
}

function buttonChange(text) {
  button.innerText = text;
  text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}

function run() {
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus();
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(timeCount, 1000);
  checkInterval = setInterval(checkState, 50);
  buttonChange('게임중')
}

