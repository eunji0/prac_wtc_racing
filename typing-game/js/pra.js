/*사용변수 만들기
input되는 값을 event를 통해 가져오기(addEventListener)+콘솔값으로 확인
텍스트와 비교해서 같을 경우에 점수 올려주기
점수가 올라가면 input창 초기화
버튼을 눌렀을때 시간이 카운트되도록 하기
0초보다 크면 시간이 줄어듬, 그렇지 안으면 게임이 종료
이걸 초마다 적용해야하므로 setInterval사용(+버튼이 클릭했을 때 실행이 되도록)
버튼 텍스트를 바꾸는 함수 작성
만약 게임시작이라는 텍스트이면 버튼 loading을 제거 아니면 추가(classList)
버튼 태그에 onclick메서드 추가run
run함수를 만듬. setInterval처리
만약 게임종료 상태이면 clearInterval을 통해 리셋
추가로 시간도 초기화
run했을때 겜상태를 true로 
init()메서드 불러오기 -> 단어 모아오기
이벤트를 init메서드 안에 넣기
단어를 불러오면 버튼체인지를 넣기
상태를 확인하는 메서드만들기 게임종료와 확인초 추가.
만약 게임중이 아닌데, 점수 올려주지 않고 return
랜덤숫자를 만들어 랜덤인덱스로 단어 랜덤하게
인풋창에 focus라고 점수를 0으로 초기화
버튼 체인지를 게임중으로
게임종료가되면 다시 게임을 시작을 할 수 있도록
게임이 실행중이라면 버튼이 클릭되지 않도록*/

let score = 0;
let GAME_TIME = 3;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let word = [];
let checkInterval;

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const timeDisplay = document.querySelector('.time');
const scoreDisplay = document.querySelector('.score');
const button = document.querySelector('.button');


init();

function init() {
  getWords();
  wordInput.addEventListener('input', checkMatch);
}

function getWords() {
  word = ['apple', 'key', 'hope', 'abc'];
  changeButton('게임시작');
}

function checkMatch() {
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = "";
    if(!isPlaying){
      return;
    }
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random()*word.length);
    wordDisplay.innerText = word[randomIndex];
  }
}

function checkState() {
  if(!isPlaying && time === 0){
    changeButton('게임시작');
    clearInterval(checkInterval);
  }
}

function countDown() {
  time > 0 ? time-- : isPlaying = false;
  if (!isPlaying) {
    clearInterval(timeInterval);
  }
  timeDisplay.innerText = time;
}

function changeButton(text) {
  button.innerText = text;
  text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}

function run() {
  if(isPlaying){
    return;
  }
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus();
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkState, 50);
  changeButton('게임중')
}