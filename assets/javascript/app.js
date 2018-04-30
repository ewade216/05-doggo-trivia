<<<<<<< HEAD
$(document).ready(function(){
	//game object
	var game = {
		qIndex: 0,
		qArray: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"],
		//questions
		q1: {
			question: "What percentage of their lives do dogs spend sleeping?",
			a1: "30%",
			a2: "50%",
			a3: "70%",
			correct: "#a2",
			correctMessage: "We've got an expert in the house.",
			wrongMessage: "Hey, now you know."
			},
		q2: {
			question: "Normal adult dogs have how many teeth?",
			a1: "28",
			a2: "34",
			a3: "42",
			correct: "#a3",
			correctMessage: "Yes! All the better to bite you with!",
			wrongMessage: "At least you didn't go snooping around in a dogs mouth to find out."
			},
		q3: {
			question: "What is the most common training command taught to dogs?",
			a1: "Sit",
			a2: "Cook me a pizza",
			a3: "Do my taxes",
			correct: "#a1",
			correctMessage: "You're a regular dog whisperer, huh?",
			wrongMessage: "If only..."
			},
		q4: {
			question: "What is a dog’s most highly developed sense?",
			a1: "Taste",
			a2: "Smell",
			a3: "Sight",
			correct: "#a2",
			correctMessage: "I smell a correct answer!",
			wrongMessage: "You've heard of 'dogs' right?"
			},
		q5: {
			question: "What is the favorite dog breed of the Queen of England?",
			a1: "Corgi",
			a2: "Poodle",
			a3: "Pomeranian",
			correct: "#a1",
			correctMessage: "Wow! Are you very close with the queen?",
			wrongMessage: "Don't beat yourself up."
			},
		q6: {
			question: "Which dog breed is the smallest of them all?",
			a1: "Dachshund",
			a2: "Shih Tzu",
			a3: "Chihuahua",
			correct: "#a3",
			correctMessage: "Yo quiero Taco Bell!",
			wrongMessage: "Close but no quiero Taco Bell!"
			},
		q7: {
			question: "Which dog breed has a black tongue?",
			a1: "Husky",
			a2: "Weimaraner",
			a3: "Chow Chow",
			correct: "#a3",
			correctMessage: "How would you know that?...",
			wrongMessage: "You learn something new every day."
			},
		q8: {
			question: "Which dog yodels instead of barks?",
			a1: "Otterhound",
			a2: "Basenji",
			a3: "Basset Hound",
			correct: "#a2",
			correctMessage: "Truly a beautiful song they sing!",
			wrongMessage: "What kinda hounds you been hangin' around??"
			},
		q9: {
			question: "How old was the world’s oldest dog, an Australian cattle hound named Bluey, in human years?",
			a1: "29",
			a2: "30",
			a3: "32",
			correct: "#a1",
			correctMessage: "That's right! He's older than me!",
			wrongMessage: "To be honest, he did look a day over 29."
			},
		q10: {
			question: "What is the most popular breed of dog, according to the American Kennel Club’s registrations?",
			a1: "Golden Retriever",
			a2: "Catdog",
			a3: "Labrador",
			correct: "#a3",
			correctMessage: "Did you major in statistics?",
			wrongMessage: "I am sorry, but that is incorrect."
			},

		//answers
		currentAnswer: "",
		correctAnswer: "",
		canGuess: false,
		//score
		score: 0,
		//timer
		time: 0,
		timeLeft: 8
	}

	//start and restart
	$(".buttonClass").click(function(){
		//reset questions and score
		game.qIndex = 0;
		game.score = 0;
		game.timeLeft = 8;
		//hide welcome screen
		$(".menu").addClass("hide");
		//hide game over screen
		$(".menu").addClass("hide");
		//display questions and answers
		$(".questionAnswers").toggleClass("hide");
		//display clock
		$(".top-middle").toggleClass("hide");
		//Remove correct answer and selected
		$(".answerArea").find(".correct").removeClass("correct");
		$(".answerArea").find(".selected").removeClass("selected");
		newQ();
	});

	//new question
	function newQ() {
		if (game.qIndex < game.qArray.length){
		//display question and answer on screen
			$("#question").text(game[game.qArray[game.qIndex]].question);
			$("#a1").text(game[game.qArray[game.qIndex]].a1);
			$("#a2").text(game[game.qArray[game.qIndex]].a2);
			$("#a3").text(game[game.qArray[game.qIndex]].a3);
			$(".timer").text(game.timeLeft);
			$("#questionNumber").text("Q" + (game.qIndex + 1));
			//start countdown
			questionTime();
			//allow guesses
			game.canGuess = true;
			//set correct answer to compare to guess
			game.correctAnswer = game[game.qArray[game.qIndex]].correct;
		}
	}

	//select answer click
	$(".answer").click(function(){
		if (game.canGuess === true){
			var button = $(this);
			//set as selected answer
			button.toggleClass("selected");
			//remove selected class from previously picked answers
			button.siblings(".selected").toggleClass("selected");
			//sets answer value
			game.currentAnswer = button.attr("value");
		};
	});

	//check answer
	function checkAnswer (){
		game.canGuess = false;
		if (game.currentAnswer === game.correctAnswer) {
			//correct
			//add to score
			game.score++;
			//display correct answer message
			$("#question").text(game[game.qArray[game.qIndex]].correctMessage)
			//display correct answer pill
			$(".right").removeClass("hide");
		} else {
			//incorrect
			//highlight correct answer
			$(game.correctAnswer).toggleClass("correct");
			//display incorrect answer message
			$("#question").text(game[game.qArray[game.qIndex]].wrongMessage)
			//display incorrect answer pill
			$(".wrong").removeClass("hide");
		}
			//remove timer
			$(".top-middle").toggleClass("hide")
			//wait for 10 seconds before restting for next question
			setTimeout(reset, 7000)
	}

	//reset for next question
	function reset() {
		// go to next question
		game.qIndex++;

		if (game.qIndex < game.qArray.length) {
			//remove classes for styling answers
			$(".answerArea").find(".correct").toggleClass("correct");
			$(".answerArea").find(".selected").toggleClass("selected");
			//reset time
			game.timeLeft = 8;
			//reset answer
			game.currentAnswer = "";
			//go to next question
			// game.qIndex++;
			//toggle clock back onto page
			$(".top-middle").toggleClass("hide")
			//hide right and wrong divs
			$(".right").addClass("hide");
			$(".wrong").addClass("hide");
			newQ();
		} else {
			gameOver()
		}
	}

	//timer stuff
	function qCount() {
		game.timeLeft--;
		$(".timer").css("font-size", "24px")
		$(".timer").text(game.timeLeft);
		$(".timer").animate({fontSize: "32px"});
		//stop at zero and check answer
		if (game.timeLeft === 1) {
			clearInterval(game.time);
			setTimeout(checkAnswer, 1200)
		}
	};

	function questionTime() {
		game.time = setInterval(qCount, 1000);
	};

	//game over
	function gameOver() {
		var message;

		if (game.score === 1) {
			message = "You Answered " + game.score + " Question Correctly!";
		} else {
			message = "You Answered " + game.score + " Questions Correctly!";
		}

		//hide questions
		$(".questionAnswers").toggleClass("hide");
		//display game over info
		$(".gameOver").removeClass("hide");
		//hide correct/incorrect pills for next game
		$(".right, .wrong").addClass("hide");
		//update message to display number of correct answers
		$("#gameOverMessage").text(message);
	}
=======
var panel = $("#quiz-area");

// Question set
var questions = [{
  question: "What was the first full length CGI movie?",
  answers: ["A Bug's Life", "Monsters Inc.", "Toy Story", "The Lion King"],
  correctAnswer: "Toy Story"
}, {
  question: "Which of these is NOT a name of one of the Spice Girls?",
  answers: ["Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice"],
  correctAnswer: "Fred Spice"
}, {
  question: "Which NBA team won the most titles in the 90s?",
  answers: ["New York Knicks", "Portland Trailblazers", "Los Angeles Lakers", "Chicago Bulls"],
  correctAnswer: "Chicago Bulls"
}, {
  question: "Which group released the hit song, \"Smells Like Teen Spirit\"?",
  answers: ["Nirvana", "Backstreet Boys", "The Offspring", "No Doubt"],
  correctAnswer: "Nirvana"
}, {
  question: "Which popular Disney movie featured the song, \"Circle of Life\"?",
  answers: ["Aladdin", "Hercules", "Mulan", "The Lion King"],
  correctAnswer: "The Lion King"
}, {
  question: "Finish this line from the Fresh Prince of Bel-Air theme song: \"I whistled for a cab and when it came near, the license plate said...\"",
  answers: ["Dice", "Mirror", "Fresh", "Cab"],
  correctAnswer: "Fresh"
}, {
  question: "What was Doug's best friend's name?",
  answers: ["Skeeter", "Mark", "Zach", "Cody"],
  correctAnswer: "Skeeter"
}, {
  question: "What was the name of the principal at Bayside High in Saved By The Bell?",
  answers: ["Mr.Zhou", "Mr.Driggers", "Mr.Belding", "Mr.Page"],
  correctAnswer: "Mr.Belding"
}];

// Variable that will hold the setInterval
var timer;

var game = {

  correct: 0,
  incorrect: 0,
  counter: 30,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      panel.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        panel.append("<input type='radio' name='question-" + i +
        "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    panel.append("<button id='done'>Done</button>");
  },

  done: function() {

    $.each($("input[name='question-0']:checked"), function() {
      if ($(this).val() === questions[0].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-1']:checked"), function() {
      if ($(this).val() === questions[1].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-2']:checked"), function() {
      if ($(this).val() === questions[2].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-3']:checked"), function() {
      if ($(this).val() === questions[3].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-4']:checked"), function() {
      if ($(this).val() === questions[4].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-5']:checked"), function() {
      if ($(this).val() === questions[5].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-6']:checked"), function() {
      if ($(this).val() === questions[6].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-7']:checked"), function() {
      if ($(this).val() === questions[7].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    this.result();

  },

  result: function() {

    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    panel.html("<h2>All Done!</h2>");
    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
  }
};

// CLICK EVENTS

$(document).on("click", "#start", function() {
  game.start();
});


$(document).on("click", "#done", function() {
  game.done();
>>>>>>> a804a6027b411add7b16b80cc2e46b92b51710da
});
