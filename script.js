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
  navQuestion(shuffledQuestions[1]);
}

q3.addEventListener('click', q3nav);
function q3nav(){
  currentQuestionIndex = 2;
  navQuestion(shuffledQuestions[2]);
}

q4.addEventListener('click', q4nav);
function q4nav(){
  currentQuestionIndex = 3;
  navQuestion(shuffledQuestions[3]);
}

q5.addEventListener('click', q5nav);
function q5nav(){
  currentQuestionIndex = 4;
  navQuestion(shuffledQuestions[4]);
}

q6.addEventListener('click', q6nav);
function q6nav(){
  currentQuestionIndex = 5;
  navQuestion(shuffledQuestions[5]);
}

q7.addEventListener('click', q7nav);
function q7nav(){
  currentQuestionIndex = 6;
  navQuestion(shuffledQuestions[6]);
}

q8.addEventListener('click', q8nav);
function q8nav(){
  currentQuestionIndex = 7;
  navQuestion(shuffledQuestions[7]);
}

q9.addEventListener('click', q9nav);
function q9nav(){
  currentQuestionIndex = 8;
  navQuestion(shuffledQuestions[8]);
}

q10.addEventListener('click', q10nav);
function q10nav(){
  currentQuestionIndex = 9;
  navQuestion(shuffledQuestions[9]);
}



function navQuestion(question){
  if(question.answered){
    resetState();
    answerbtn.classList.add('hide');
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if(answer.correct){
        button.dataset.correct = answer.correct
      }
      Array.from(answerButtons.children).forEach((button) => {
        button.classList.remove('selected');
      });


      answerButtons.appendChild(button)
      selectedButton[currentQuestionIndex].classList.add('selected')

      setStatusClass(document.body, correct[currentQuestionIndex])
      Array.from(answerButtons.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct)
      });
    })
  }
  else{
    nextQuestion();
  }
}

let score = 0;
const delayInMilliseconds = 1000;


let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextbtn.addEventListener('click', next);
previousbtn.addEventListener('click', previous);
function next(){
  currentQuestionIndex++;
  navQuestion(shuffledQuestions[currentQuestionIndex])
}
function previous(){
  currentQuestionIndex--;
  navQuestion(shuffledQuestions[currentQuestionIndex]);
}
let time = 300
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
  else {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if(answer.correct){
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click' , selectAnswer)
    // question.answered = true;
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
let correct = []
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
    questions[currentQuestionIndex].answered = true;
   correct[currentQuestionIndex] = selectedButton[currentQuestionIndex].dataset.correct
  setStatusClass(document.body, correct[currentQuestionIndex])
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct)
  });
  if(correct[currentQuestionIndex]){
    score++;
  }
  console.log(score);
  setTimeout(function() {
    currentQuestionIndex++;
    nextQuestion();
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
      { text: 'Japan' , correct: false , selected: false},
      { text: 'China' , correct: true , selected: false},
      { text: 'India', correct: false , selected:false}
    ],
    answered : false
  },

  {question: 'Which animal Caused it?',
  answers:[
    { text: 'Bat' , correct: true , selected: false},
    { text: 'Rat' , correct: false , selected: false},
    { text: 'Cat' , correct: false , selected: false}
  ],
  answered : false
},
  {question: 'How many countries, areas or territories are suffering from novel coronavirus outbreak in the World?',
  answers: [
    { text: 'Less than 100' , correct: false , selected: false},
    { text: 'Less than 150' , correct: false , selected: false},
    { text: 'More than 200' , correct: true , selected: false}
  ],
  answered : false
},
  {question: 'In a study, which cells are found in COVID-19 patients bode well for long term immunity?',
  answers:[
    { text: 'P-cell' , correct: false , selected: false},
    { text: 'T-cell' , correct: true , selected: false},
    { text: 'D-cell' , correct: false , selected: false}
],
  answered : false
},
  {question: 'Name a clinical trial in which blood is transfused from recovered COVID-19 patients to a coronavirus patient who is in critical condition?',
  answers:[
    { text: 'Plasma Therapy' , correct: true , selected: false},
    { text: 'Hydroxychloroquine' , correct: false , selected: false},
    { text: 'Remdesivir' , correct: false , selected: false}
],
  answered : false
},
  {question: 'What is Corona Virus?',
  answers:[
    { text: 'It is a large family of viruses.' , correct: false , selected: false},
    { text: 'It belongs to the family of Nidovirus.' , correct: false , selected: false},
    { text: 'Both A and B are correct' , correct: true , selected: false}
  ],
  answered : false
},
  {question: 'Which of the following diseases are related to coronavirus?',
  answers:[
    { text: 'MERS' , correct: false , selected: false},
    { text: 'SARS' , correct: false , selected: false},
    { text: 'Both A and B' , correct: true , selected: false}
  ],
  answered: false
},
  {question: 'Mild Symptoms of Novel coronavirus are:',
  answers:[
    { text: 'Fever and Cough' , correct: false , selected: false},
    { text: 'Shortness of breath' , correct: false , selected: false},
    { text: 'All of the above' , correct: true , selected: false}
  ],
  answered: false
},
  {question: 'From where coronavirus got its name?',
  answers:[
    { text: 'Due to their crown-like projections.' , correct: true , selected: false},
    { text: 'Due to their leaf-like projections.' , correct: false , selected: false},
    { text: 'Due to their surface structure of bricks.' , correct: false , selected: false}
  ],
  answered: false
},
  {question: 'What are the precautions that need to be taken to protect from the coronavirus?',
  answers:[
    { text: 'Cover your nose and mouth when sneezing.' , correct: true, selected: false},
    { text: 'Add more garlic into your diet.' , correct: false , selected: false},
    { text: 'Visit your doctor for antibiotics treatment' , correct: false , selected: false}
  ],
  answered: false
}



]
