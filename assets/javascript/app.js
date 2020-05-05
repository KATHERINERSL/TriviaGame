//Advance Trivia game!

//Game has 8 questions and each question has 4 multiple choice questions/answers.

//Once questions is answered by the selector a video image pops up announcing win or lose. The image is part of the answer

//create a function for a random pick for questions being displayed for multiple choice. answers are displayed and you have a 30 sec timer once "start"button clicked.

// will craete a container using bootstrap to place "p" and multiple choice in it. 

// after each question is completed by user, the page loads to next multiple choice question with the 30 sec timer starting over.

var time = 5;

var startButton = $('.start-button');
var quizSection = $('#quiz');
var questionSection = $('#question-section');
var timeLabel = $('#time');
var questionLabel = $('#qLabel')

startButton.click(function() {
  startButton.toggle();
  quizSection.toggle();
  showQuestion();
})

function showQuestion() {
  time = 5;
  timeLabel.html(time);



  // Pick a question
  questionLabel.html("Question...");


  var timer = setInterval(function() {
    time--;

    if(time < 0) {
      clearInterval(timer);
      showQuestion()
    }


    timeLabel.html(time);
  }, 1000)
}

