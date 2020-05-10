$(document).ready(function () {
    //event listeners
    $("#remaining-time").hide();
    $("#start").on("click", trivia.startGame);
    $(document).on("click", ".option", trivia.guessChecker);
})
var trivia = {
    //trvia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    time: 10,
    timerOn: false,
    timerId: "",
    // questions options and answers data
    questions: {
        q1: "Which princess is based on a real person?",
        q2: "What's Simba's mother's name?",
        q3: "What animal was Tarzan raised by?",
        q4: "What's the name of Snow White's prince?",
        q5: "How long was the Genie stuck in the lamp before Aladdin released him?",
        q6: "Who was the first Disney princess?",
        q7: "What do Aladdin and his monkey Abu steal from the marketplace when you’re first introduced to them in the movie?",
        q8: "Who was the only Disney main character who didn’t talk throughout the entire film?",
        q9: "What was the name of Maleficent’s pet raven?"
    },
    options: {
        q1: ["Pocahontas","Cinderella","Elsa","Aurora"],
        q2: ["Nala", "Sarabi","Kumba","Thelma"],
        q3: ["Wolves","Bears","Swans","Gorillas"],
        q4: ["Phillip","Florean","Charming","Ferdinand"],
        q5: ["10,000 years","8000 years","9000 years","1000 years"],
        q6: ["Snow White","Sleeping beauty","Cinderella","Repunzel"],
        q7: ["Orange","Pear","apple","Loaf of Bread"],
        q8: ["Dumbo","Ariel","Tarzan","TinkerBell"],
        q9: ["Zazu","Diablo","Lafou","Yzma"]

    },
    answers: {
        q1:"Pocahontas", 
        q2: "Sarabi",
        q3: "Gorillas",
        q4: "Ferdinand",
        q5: "10,000 years",
        q6: "Snow White",
        q7: "Loaf of Bread",
        q8: "Dumbo",
        q9: "Diablo"
    },
   
    //trivia methods
    //method to initialize game
    startGame: function(){
        //restarting game results
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);
        //show game section
        $("#game").show();
        //empty last results
        $("#results").html("");
        //show timer
        $("#timer").text(trivia.timer);
        //remove start button
        $("#start").hide();
        $("#remaining-time").show();
        //ask first question
        trivia.nextQuestion();
    },
    //method to loop through and display questions and options
    nextQuestion: function () {
        //set timer to 10 seconds each question
        trivia.timer = 10;
        $("#timer").removeClass("last-seconds");
        $("#timer").text(trivia.timer);
        //to prevent timer speed up
        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }
        //gets all the questions then indexes the current questions
        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $("#question").text(questionContent);
        //an array of all the user options for the current question
        var questionOptions = Object.values(trivia.options)[trivia.currentSet];
        //creates all the trivia guess options in the html
        $.each(questionOptions, function (index, key) {
            $("#options").append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })
    },
    //method to decrement counter and count unanswered if timer runs out
    timerRunning: function() {
        //if timer still has time left and there are still questions left to ask
        if (trivia.timer> -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $("#timer").text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $("#timer").addClass("last-seconds");
            }
        }
        //the time has run out and increment unanswered, run result
        else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $("#results").html("<h3>Times Up! The answer was " + Object.values(trivia.answers)[trivia.currentSet] + "</h3>");
        }
        //if all the questions have been shown end the game, show results
        else if (trivia.currentSet === Object.keys(trivia.questions).length) {
            //adds results of game (correct, incorrect, unanswered) to the page
            $("#results")
            .html("<h3>Thank you for playing!</h3>" +
                "<h6>Correct: " + trivia.correct + "</h6>" +
                "<h6>Incorrect: " + trivia.incorrect + "</h6>" +
                "<h6>Unanswered: " + trivia.unanswered + "</h6>"+
                "<h4>Do you want to play again?</h4>");
                //hide game section
                $("#game").hide();
                //show start button to begin a new game
                $("#start").show();
        }
    },
    //method to evaluate the option clicked
    guessChecker: function() {
        //time ID for gameResult setTimeout
        var resultId;
        //the answer to the current question being asked
        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
        //if the text of the option picked matches the answer of the current question, increment correct
        if ($(this).text() === currentAnswer) {
            //turn button green for correct
            $(this).addClass("btn-success").removeClass("btn-info");
            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $("#results").html("<h3>Brilliant! Correct!</h3>");
        }

        //else the user picked the wrong option, increment incorrect
        else {
            //turn button clicked red for incorrect
            $(this).addClass("btn-danger").removeClass("btn-info");
            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $("#results").html("<h3>Don't be sad! You'll get it next time!" + currentAnswer + "</h3>");
        }

    },
    //method to remove previous question results and options
    guessResult: function () {
        //increment to next question set
        trivia.currentSet++;
        //remove the options and results
        $(".option").remove();
        $("#results h3").remove();
        //begin next question
        trivia.nextQuestion();
    }
}