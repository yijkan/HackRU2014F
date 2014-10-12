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
				head = Math.floor((3 - head) * Math.random()) + 1;
				$('.head').replaceWith("<img class='head' src='head" + head + ".png'>");
				// TODO
				sendMsg("Head injury!");
				break;
			case 1:
				if (leftA === 3) {
					gameEnd();
				}
				leftA = Math.floor((3 - leftA) * Math.random()) + 1;
				$('.leftA').replaceWith("<img class='leftA' src='leftA" + leftA + ".png'>");
				// TODO
				sendMsg("Left arm injury!");
				break;
			case 2:
				if (rightA === 3) {
					gameEnd();
				}
				rightA = Math.floor((3 - rightA) * Math.random()) + 1;
				$('.rightA').replaceWith("<img class='rightA' src='rightA" + rightA + ".png'>");
				// TODO
				sendMsg("Right arm injury!");
				break;
			case 3:
				if (torso === 3) {
					gameEnd();
				}
				torso = Math.floor((3 - torso) * Math.random()) + 1;
				$('.torso').replaceWith("<img class='torso' src='torso" + torso + ".png'>");
				// TODO
				sendMsg("Torso injury!");
				break;
			case 4:
				if (leftL === 3) {
					gameEnd();
				}
				leftL = Math.floor((3 - leftL) * Math.random()) + 1;
				$('.leftL').replaceWith("<img class='leftL' src='leftL" + leftL + ".png'>");
				// TODO
				sendMsg("Left leg injury!");
				break;
			case 5:
				if (rightL === 3) {
					gameEnd();
				}
				rightL = Math.floor((3 - rightL) * Math.random()) + 1;
				$('.rightL').replaceWith("<img class='rightL' src='rightL" + rightL + ".png'>");
				// TODO
				sendMsg("Right leg injury!");
				break;
		}
		//TODO: manipulate delayInjury here?
		delayInjury = Math.floor(6*Math.random()) + 6;
		setTimeout(function() { createInjury }, delayInjury);
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
			
			if (heals > 0) {
				heals--;
				head--;
				$('.head').replaceWith("<img class='head' src='head" + head + ".png'>");
			} else {
				sendMsg("Need more heals!");
			}f
		}
	});
	$('.leftA').click(function() {
		if(gameContinuing) {
			if (heals > 0) {
				heals--;
				leftA--;
				$('.leftA').replaceWith("<img class='leftA' src='leftA" + leftA + ".png'>");
			} else {
				sendMsg("Need more heals!");
			}
		}
	});
	$('.rightA').click(function() {
		if(gameContinuing) {
			if (heals > 0) {
				heals--;
				rightA--;
				$('.rightA').replaceWith("<img class='rightA' src='rightA" + rightA + ".png'>");
			} else {
				sendMsg("Need more heals!");
			}
		}
	});
	$('.leftL').click(function() {
		if(gameContinuing) {
			if (heals > 0) {
				heals--;
				leftL--;
				$('.leftL').replaceWith("<img class='leftL' src='leftL" + leftL + ".png'>");
			} else {
				sendMsg("Need more heals!");
			}
		}
	});
	$('.rightL').click(function() {
		if(gameContinuing) {
			if (heals > 0) {
				heals--;
				head--;
				$('.rightL').replaceWith("<img class='rightL' src='rightL" + rightL + ".png'>");
			} else {
				sendMsg("Need more heals!");
			}
		}
	});
	$('.torso').click(function() {
		if(gameContinuing) {
			if (heals > 0) {
				heals--;
				torso--;
				$('.torso').replaceWith("<img class='torso' src='torso" + torso + ".png'>");
			} else {
				sendMsg("Need more heals!");
			}
		}
	});
});
