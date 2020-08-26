const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const previousbtn = document.getElementById('previous-btn');
const answerbtn = document.getElementById('answer-btn');
const nextbtn = document.getElementById('next-btn');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
let score = 0;

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextbtn.addEventListener('click', next);
function next(){
  currentQuestionIndex++;
  nextQuestion();
}

function startGame(){
  console.log('Started');
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  previousbtn.classList.remove('hide');
  answerbtn.classList.remove('hide');
  nextbtn.classList.remove('hide');
  nextQuestion();
}

function nextQuestion(){
  if(currentQuestionIndex == 9){
    nextbtn.classList.add('hide');
  }
  else {
    nextbtn.classList.remove('hide');
  }
  if(currentQuestionIndex == 0){
    previousbtn.classList.add('hide');
  }
  else {
    previousbtn.classList.remove('hide');
  }
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if(answer.correct){
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click' , selectAnswer)
    answerButtons.appendChild(button)
  })
}

function resetState(){
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function previousQuestion(){

}

let selectedButton
function selectAnswer(e){
   selectedButton = e.target
   Array.from(answerButtons.children).forEach((button) => {
     button.classList.remove('selected');
   });

   selectedButton.classList.add('selected')
}

answerbtn.addEventListener('click' , checkAnswer)

function checkAnswer(){
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct)
  });
  if(correct){
    score++;
  }
  console.log(score);
  next();
}

function setStatusClass(element, correct){
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  }
  else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element){
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


const questions = [
  {question: 'Where was it originated?' ,
    answers: [
      { text: 'Japan' , correct: false},
      { text: 'China' , correct: true},
      { text: 'India', correct: false}
    ]},

  {question: 'Which animal Caused it?',
  answers:[
    { text: 'Bat' , correct: true},
    { text: 'Rat' , correct: false},
    { text: 'Cat' , correct: false}
  ]}
]
