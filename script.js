const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const previousbtn = document.getElementById('previous-btn');
const answerbtn = document.getElementById('answer-btn');
const nextbtn = document.getElementById('next-btn');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const scoreShow = document.getElementById('score');
const name = window.prompt('Enter Your Name: ');
const q1 = document.getElementById('q1');
const q2 = document.getElementById('q2');
const q3 = document.getElementById('q3');
const q4 = document.getElementById('q4');
const q5 = document.getElementById('q5');
const q6 = document.getElementById('q6');
const q7 = document.getElementById('q7');
const q8 = document.getElementById('q8');
const q9 = document.getElementById('q9');
const q10 = document.getElementById('q10');
const navbar = document.getElementById('navbar');

q1.addEventListener('click', q1nav);
function q1nav(){
  currentQuestionIndex=0;
  navQuestion(shuffledQuestions[0]);
}
q2.addEventListener('click', q2nav);
function q2nav(){
  currentQuestionIndex = 1;
  nextQuestion();
}

let score = 0;
const delayInMilliseconds = 1000;


let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextbtn.addEventListener('click', next);
previousbtn.addEventListener('click', previous);
function next(){
  currentQuestionIndex++;
  nextQuestion();
}
function previous(){
  currentQuestionIndex--;
  previousQuestion();
}
let time = 600
function startGame(){
  var intervel = setInterval(function(){
    mins = parseInt(time/60);
    seconds = time%60
    document.getElementById('count').innerText = 'Time Left ' + mins + ':' + seconds;
    time--;
    if(count === 0){
      cleatInterval(interval);
      currentQuestionIndex = 10;
      showQuestion(shuffledQuestions[currentQuestionIndex]);

    }
  }, 1000);
  console.log('Started');
  navbar.classList.remove('hide');
  startButton.classList.add('hide');
  scoreShow.classList.add('hide');
  score = 0;
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
  clearStatusClass(document.body);
  answerbtn.classList.add('hide');
  if(currentQuestionIndex == 10){
    questionContainerElement.classList.add('hide');
    previousbtn.classList.add('hide');
    answerbtn.classList.add('hide');
    nextbtn.classList.add('hide');
    startButton.classList.remove('hide');
    startButton.innerText='RESTART';
    scoreShow.classList.remove('hide');
    scoreShow.innerText= name +  ' SCORED: ' + score;

  }
  else if(!question.answered){
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
}

function resetState(){
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function previousQuestion(){
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
  //resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);

}

let selectedButton = []
function selectAnswer(e){
   selectedButton[currentQuestionIndex] = e.target
   answerbtn.classList.remove('hide');
   Array.from(answerButtons.children).forEach((button) => {
     button.classList.remove('selected');
   });

   selectedButton[currentQuestionIndex].classList.add('selected')
}

answerbtn.addEventListener('click' , checkAnswer)

function checkAnswer(){
  question.answered = true;
  const correct = selectedButton[currentQuestionIndex].dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct)
  });
  if(correct){
    score++;
  }
  console.log(score);
  setTimeout(function() {
    next();
  }, delayInMilliseconds);
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
    ],
    answered : false
  },

  {question: 'Which animal Caused it?',
  answers:[
    { text: 'Bat' , correct: true},
    { text: 'Rat' , correct: false},
    { text: 'Cat' , correct: false}
  ],
  answered : false
},
  {question: 'How many countries, areas or territories are suffering from novel coronavirus outbreak in the World?',
  answers: [
    { text: 'Less than 100' , correct: false},
    { text: 'Less than 150' , correct: false},
    { text: 'More than 200' , correct: true}
  ],
  answered : false
},
  {question: 'In a study, which cells are found in COVID-19 patients bode well for long term immunity?',
  answers:[
    { text: 'P-cell' , correct: false},
    { text: 'T-cell' , correct: true},
    { text: 'D-cell' , correct: false}
],
  answered : false
},
  {question: 'Name a clinical trial in which blood is transfused from recovered COVID-19 patients to a coronavirus patient who is in critical condition?',
  answers:[
    { text: 'Plasma Therapy' , correct: true},
    { text: 'Hydroxychloroquine' , correct: false},
    { text: 'Remdesivir' , correct: false}
],
  answered : false
},
  {question: 'What is Corona Virus?',
  answers:[
    { text: 'It is a large family of viruses.' , correct: false},
    { text: 'It belongs to the family of Nidovirus.' , correct: false},
    { text: 'Both A and B are correct' , correct: true}
  ],
  answered : false
},
  {question: 'Which of the following diseases are related to coronavirus?',
  answers:[
    { text: 'MERS' , correct: false},
    { text: 'SARS' , correct: false},
    { text: 'Both A and B' , correct: true}
  ],
  answered: false
},
  {question: 'Mild Symptoms of Novel coronavirus are:',
  answers:[
    { text: 'Fever and Cough' , correct: false},
    { text: 'Shortness of breath' , correct: false},
    { text: 'All of the above' , correct: true}
  ],
  answered: false
},
  {question: 'From where coronavirus got its name?',
  answers:[
    { text: 'Due to their crown-like projections.' , correct: true},
    { text: 'Due to their leaf-like projections.' , correct: false},
    { text: 'Due to their surface structure of bricks.' , correct: false}
  ],
  answered: false
},
  {question: 'What are the precautions that need to be taken to protect from the coronavirus?',
  answers:[
    { text: 'Cover your nose and mouth when sneezing.' , correct: true},
    { text: 'Add more garlic into your diet.' , correct: false},
    { text: 'Visit your doctor for antibiotics treatment' , correct: false}
  ],
  answered: false
}



]
