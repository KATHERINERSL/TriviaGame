
//Advanced Trivia Game
//1. Home Page
//start Game
//2. Timer - 30 seconds
//when page loads, first, the timer, questions and summary must be hidden.
//3. 8 Questions - Object/Array - 4 mulitple choice answers
//1 correct answer
//Correct Answer: Win
//Wrong Answer: Lose
//Unanswered: Lose
//Out of Time: Lose
//video image populates
//Delay 3 seconds before next question
//4. End of 8 questions:
//Score:
//Correct Answers:
//Incorrect Answers:
//Unanswered:
//5. Prompt: Do you want to play again?
//If user chooses correct answer -- correct answer is true.
//Player wins.
//Prompt displays "You Win: Correct Answer Displayed - above image or video image"
//for next random question, there is a 3 second delay before next question is displayed.
//if the player runs out of time, a prompt will be displayed "You ran out of time!  - display correct answer above picture".
// If the player chooses the wrong answer, a prompt will be displayed "Wrong Answer! - display correct answer above picture"
//There is a timer, 3 types of scores and 2 types of resets.
//timer is 30 seconds
// 3 types of scores -- final page: Correct Answers, Incorrect Answers, Unanswered.
//Final page prompts  - displays: All done! Here's how you did!
//Final page - reset - start over onlclick buttoner stops.


//IMPORTANT!
$(document).ready(function(){


    
        //Define all global variables and objects
        var currentQuestion; 
        var correctAnswer; 
        var incorrectAnswer; 
        var unanswered; 
        var seconds; 
        var time; 
        var answered; 
        var userSelect;
        var messages = {
            correct: "Congratulations You are correct!!",
            incorrect: "That's not the right answer." + "<br>" + '"No. No. It Okay. Don\'t Be Cry"',
            endTime: "Looks like you ran out of time!" + "<br>" + "But... It's never too late, it's never too late for now!",
            finished: "So, how'd you do?"
        };
    
        //All questions inside an array of objects
        var triviaQuestions = [
            {	question: "What are the names of Ursula's eels??",
                answerList: ["sparkam and Ricksam","sparky and homie","Flotsam and Jetsam","fletcher and Ketsel"],
                answer: 2,
                image: "assets/images/the little mermaid eels_gif",
                answerText: "There are over 400 species of eel."
            },
    
            {	question: "What's Simba's mother's name?",
                answerList: ["Nala", "Sarabi","Kumba","Thelma"],
                answer: 1,
                image: "assets/images/LKgiphy.gif",
                answerText: "Female lions do the hunting (together in groups) while male lions stay home to protect the pride."
            },
    
            {	question: "What animal was Tarzan raised by?",
                answerList: ["Wolves","Bears","Swans","Gorillas"],
                answer: 3,
                image: "assets/images/TZgiphy.gif",
                answerText: "Gorillas live around 35 years."
            },
    
            {	question: "What's the name of Snow White's prince?",
                answerList: [	"Prince Phillip:, "Prince Florean","Prince charming","Prince charles"],
                answer: 0,
                image: "assets/images/SWgiphy.gif",
                answerText: "Prince Phillip is the first Disney prince to have a name"
            },
    
            {	question: "How long was the Genie stuck in the lamp before Aladdin released him?",
                answerList: ["10,000 years","400 years","100 years","1000 years"],
                answer: 0,
                image: "assets/images/Geniegiphy.gif",
                answerText: "The Anglicized form genie is a borrowing of the French génie, from the Latin genius, a guardian spirit of people and places in Roman religion."
            },
    
            {	question: "Who was the first Disney princess?",
                answerList: ["Snow White","Sleeping beauty","Cinderella","Repunzel",],
                answer: 0,
                image: "assets/images/SWgiphy.gif",
                answerText: "'Snow white and the seven dwarfs' was realesed in 1937 December 21st."
            },
    
            {	question: "What do Aladdin and his monkey Abu steal from the marketplace when you’re first introduced to them in the movie?",
                answerList: ["Orange","Pear","apple","Loaf of Bread",],
                answer: 3,
                image: "assets/images/ALMgiphy.gif",
                answerText: "It takes 9 seconds for a combine to harvest enough wheat to make about 70 loaves of bread."
            },		
    
            {	question: "Which princess is based on a real person??",
                answerList: [	"Pocahontas","Cinderala","Elsa","Arora"],
                answer: 0,
                image: "assets/images/pcgiphy.gif",
                answerText: "Before marrying John Rolfe, Pocahontas was baptized and took the Christian name Rebecca."
            },		
    
        ];
    
    
    // FUNCTIONS
    // =========
    
        //This hides the game area on page load
        $("#gameCol").hide();
        
        //This captures user click on start button to create a new game
        $("#startBtn").on("click", function(){
            $(this).hide();
            newGame();
        });
    
        //This captures the user's click on the reset button to create a new game
        $("#startOverBtn").on("click", function(){
            $(this).hide();
            newGame();
        });
    
        //This function sets up the page for a new game emptying all areas and showing game area
        function newGame(){
            $("#gameCol").show();
            $("#finalMessage").empty();
            $("#correctAnswers").empty();
            $("#incorrectAnswers").empty();
            $("#unanswered").empty();
            $("#gif").hide();
            $("#gifCaption").hide();
            currentQuestion = 0;
            correctAnswer = 0;
            incorrectAnswer = 0;
            unanswered = 0;
            newQuestion();
        }
    
        //This function displays the next question
        function newQuestion(){
            $("#message").empty();
            $("#correctedAnswer").empty();
            $("#gif").hide();
            $("#gifCaption").hide();
            answered = true;
            
            //This function displays the new question
            $("#currentQuestion").html("Question " + (currentQuestion+1) + " of " + triviaQuestions.length);
            $(".question").html(triviaQuestions[currentQuestion].question);
    
            //This function displays the new questions's answer options in multiple choice type
            for(var i = 0; i <= 5; i++){
    
                var choices = $("<div>");
                choices.text(triviaQuestions[currentQuestion].answerList[i]);
                choices.attr({"data-index": i });
                choices.addClass("thisChoice");
                $(".answerList").append(choices);
            }
    
            //This sets the timer
            countdown();
    
            //When user clicks on n answer this will pause the time and display the correct answer to the question 
            $(".thisChoice").on("click",function(){
                    userSelect = $(this).data("index");
                    clearInterval(time);
                    answerPage();
                });
            }
    
        //This function is for the timer countdown
        function countdown(){
            seconds = 15;
            $("#timeLeft").html("00:" + seconds);
            answered = true;
            //Sets a delay of one second before the timer starts
            time = setInterval(showCountdown, 1000);
        }
    
        //This function displays the countdown
        function showCountdown(){
            seconds--;
    
            if(seconds < 10) {
                $("#timeLeft").html("00:0" + seconds);	
            } else {
                $("#timeLeft").html("00:" + seconds);	
            }
            
            if(seconds < 1){
                clearInterval(time);
                answered = false;
                answerPage();
            }
        }
    
        //This function takes the user to the answer page after the user selects an answer or timer runs out
        function answerPage(){
            $("#currentQuestion").empty();
            $(".thisChoice").empty(); //Clears question page
            $(".question").empty();
            $("#gif").show();
            $("#gifCaption").show();
    
            var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
            var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    
            //This adds the gif that corresponds to this quesiton
            var gifImageLink = triviaQuestions[currentQuestion].image;
            var newGif = $("<img>");
            newGif.attr("src", gifImageLink);
            newGif.addClass("gifImg");
            $("#gif").html(newGif);
    
            //STILL TO DO
            //This adds a line of text below the gif that talks about why the answer is correct.
            var gifCaption = triviaQuestions[currentQuestion].answerText;
                newCaption = $("<div>");
                newCaption.html(gifCaption);
                newCaption.addClass("gifCaption");
                $("#gifCaption").html(newCaption);
            
            //This checks to see if user choice is correct, incorrect, or unanswered
            if((userSelect == rightAnswerIndex) && (answered === true)){
                correctAnswer++;
                $('#message').html(messages.correct);
            } else if((userSelect != rightAnswerIndex) && (answered === true)){
                incorrectAnswer++;
                $('#message').html(messages.incorrect);
                $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            } else{
                unanswered++;
                $('#message').html(messages.endTime);
                $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
                answered = true;
            }
            
            if(currentQuestion == (triviaQuestions.length-1)){
                setTimeout(scoreboard, 6000);
            } else{
                currentQuestion++;
                setTimeout(newQuestion, 6000);
            }	
        }
    
        //This fucntion displays all the game stats
        function scoreboard(){
            $('#timeLeft').empty();
            $('#message').empty();
            $('#correctedAnswer').empty();
            $('#gif').hide();
            $("#gifCaption").hide();
    
            $('#finalMessage').html(messages.finished);
            $('#correctAnswers').html("Correct Answers: " + correctAnswer);
            $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
            $('#unanswered').html("Unanswered: " + unanswered);
            $('#startOverBtn').addClass('reset');
            $('#startOverBtn').show();
            $('#startOverBtn').html("PLAY AGAIN");
        }
    
    }); //IMPORTANT!