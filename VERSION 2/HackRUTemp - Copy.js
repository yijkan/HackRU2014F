/* to represent score (seconds elapsed) */
var startTime;
var currentTime;
var gameContinuing = false;
var timeElapsed = 0;
var untilHeal = 10000;

/* these represent how many heals left until the body part is healthy */
var head=0;
var leftA=0;
var rightA=0;
var torso=0;
var leftL=0;
var rightL=0;

/* how many heals the user has left */
var heals=3;

/* how many milliseconds between everything */
var delayInjury=12000;
var delayHeal=10000;

/* how many messages have shown up -- needed to delete them sequentially */
var msgNo = 1;

// the pics of corresponding body part
var pHead = "'img/head" + head + ".png'";
var pLeftA = "'img/leftA" + leftA + ".png'";
var pRightA = "'img/rightA" + rightA + ".png'";
var pTorso = "'img/torso" + torso + ".png'";
var pLeftL = "'img/leftL" + leftL + ".png'";
var pRightL = "'img/rightL" + rightL + ".png'";

/* the function that creates the injuries */
var createInjury = function() {
	if (gameContinuing) {
		console.log("Injury created");
		/* choose a random body part and increase it by one */
		var bodyChoice = Math.floor(6 * Math.random());
		switch(bodyChoice) {
			case 0:
				if (head === 3) {
					gameEnd();
				}
				// head = Math.floor((3 - head) * Math.random()) + 1;
				else {
					head+=1;
					$('.head').attr("src", pHead);
					// TODO
					sendMsg("Head injury!");
				}
				break;
			case 1:
				if (leftA === 3) {
					gameEnd();
				}
				// leftA = Math.floor((3 - leftA) * Math.random()) + 1;
				else {
					leftA+=1;
					$('.leftA').attr("src", pLeftA);
					// TODO
					sendMsg("Left arm injury!");
				}
				
				break;
			case 2:
				if (rightA === 3) {
					gameEnd();
				}
				// rightA = Math.floor((3 - rightA) * Math.random()) + 1;
				else {
					rightA+=1
					$('.rightA').attr("src", pRightA);
					// TODO
					sendMsg("Right arm injury!");
				}
				break;
			case 3:
				if (torso === 3) {
					gameEnd();
				}
				else {
					torso+=1;
					$('.torso').attr("src", pTorso);
					// TODO
					sendMsg("Torso injury!");
				}
				// torso = Math.floor((3 - torso) * Math.random()) + 1;
				
				break;
			case 4:
				if (leftL === 3) {
					gameEnd();
				}
				else {
					leftL+=1;
					$('.leftL').attr("src", pLeftL);
					// TODO
					sendMsg("Left leg injury!");
				}
				// leftL = Math.floor((3 - leftL) * Math.random()) + 1;

				break;
			case 5:
				if (rightL === 3) {
					gameEnd();
				}
				// rightL = Math.floor((3 - rightL) * Math.random()) + 1;
				else {
					rightL+=1;
					$('.rightL').attr("src", pRightL);
					// TODO
					sendMsg("Right leg injury!");
				}
				
				break;
		}
		//Manipulate delayInjury here?
		delayInjury = (Math.floor(6*Math.random())*1 + 6)*1000;
		setTimeout(function() { createInjury() }, delayInjury);
	}
}

/* the function that creates a heal */
var createHeal = function() {
	if(gameContinuing) {
		console.log("Heal created");
		var date = new Date();
		untilHeal = 10000;
		heals++;
		//TODO: manipulate delayHeal here?
	}
}

var sendMsg = function(message) {
	var temp = msgNo;
	msgNo++;
	$('.messageBar').append("<p id='" + temp + "'>"+ message + "</p>");
	setTimeout(function() {$('#' + temp).remove();}, 3000); // messages will disappear after 3 seconds
};

var gameHTML = [
	// TODO: HTML of initial game goes here
	'<img src="img/head0.png" alt="" class="head">',
	'<img src="img/rightA0.png" alt="" class="rightA">',
	'<img src="img/leftA0.png" alt="" class="leftA">',
	'<img src="img/torso0.png" alt="" class="torso">',
	'<img src="img/rightL0.png" alt="" class="rightL">',
	'<img src="img/leftL0.png" alt="" class="leftL">',

	'<div class="timeElapsed"></div>',
	'<div class="numHeals"></div>',
	'<div class="untilHeal"></div>'
];

/* Updating the text in the game */
var updates = function() {
	if (gameContinuing) {
		console.log("update");
		timeElapsed += 100;
		$('.timeElapsed').empty();
		$('.timeElapsed').append("Time elapsed: " + Math.floor(timeElapsed/1000) + "s");

		$('.numHeals').empty();
		$('.numHeals').append(heals + " heals left");

		untilHeal -= 100;
		$('.untilHeal').empty();
		$('.untilHeal').append("Next heal: " + Math.floor(untilHeal/1000) + "s");
	}
}

var gameEnd = function() {
	gameContinuing = false;
	clearInterval(healCreation);
	clearInterval(continuous);
	$('.game').empty();
	$('.game').append("Game Over.");
}

$(document).ready(function() {
	console.log(gameContinuing);

	$('.play').click(function() {
		console.log("clicked");
		$('.game').empty();
		$('.game').append(gameHTML.join(''));

		var date = new Date;
		startTime = date.getTime();
		gameContinuing = true;

		console.log("head: " + head);
		console.log("heals: " + heals);
		console.log(gameContinuing);

		/* To keep creating heals */
		setTimeout(createInjury, delayInjury); 	// not done by interval because it varies
												// var injuryCreation = setInterval(createInjury, delayInjury);
		var healCreation = setInterval(createHeal, delayHeal);
		var continuous = setInterval(updates, 100);

		console.log("created");
	});

	$('img').click(function () {
		console.log("img clicked");
	});

	$('.mid').mouseleave(function() { 
		if (gameContinuing) { 
			gameContinuing = false; 
			$('.game').append("<div class='pause'>GAME PAUSED</div>");
		} 
	});
	$('.mid').mouseenter(function() { 
		gameContinuing = true; 
		$('.pause').remove(); 
	});

	/* when the player clicks on a body, the game will heal it if there are enough heals */
	$('.head').click(function() {
		console.log("head clicked");
		if(gameContinuing) {
			
			if (heals > 0 && head > 1) {
				heals--;
				head--;
				$('.head').attr("src", pHead);
			} else {
				sendMsg("Need more heals!");
			}
		}
	});
	$('.leftA').click(function() {
		if(gameContinuing) {
			if (heals > 0 && leftA > 1) {
				heals--;
				leftA--;
				$('.leftA').attr("src", pLeftA);
			} else {
				sendMsg("Need more heals!");
			}
		}
	});
	$('.rightA').click(function() {
		if(gameContinuing) {
			if (heals > 0 && rightA > 1) {
				heals--;
				rightA--;
				$('.rightA').attr("src", pRightA);
			} else {
				sendMsg("Need more heals!");
			}
		}
	});
	$('.leftL').click(function() {
		if(gameContinuing) {
			if (heals > 0 && leftL > 1) {
				heals--;
				leftL--;
				$('.leftL').attr("src", pLeftL);
			} else {
				sendMsg("Need more heals!");
			}
		}
	});
	$('.rightL').click(function() {
		if(gameContinuing) {
			if (heals > 0 && rightL > 1) {
				heals--;
				head--;
				$('.rightL').attr("src", pRightL);
			} else {
				sendMsg("Need more heals!");
			}
		}
	});
	$('.torso').click(function() {
		if(gameContinuing) {
			if (heals > 0 && torso > 1) {
				heals--;
				torso--;
				$('.torso').attr("src", pTorso);
			} else {
				sendMsg("Need more heals!");
			}
		}
	});
});
