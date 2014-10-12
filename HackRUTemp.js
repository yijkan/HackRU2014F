/* to represent score (seconds elapsed) */
var startTime;
var lastHeal;
var currentTime;
var gameContinuing;
var gameLength;

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
		/* choose a random body part and increase it by one */
		var bodyChoice = Math.floor(6 * Math.random());
		switch(bodyChoice) {
			case 0:
				if (head === 3) {
					createInjury();
				}
				head = Math.floor((3 - head) * Math.random()) + 1;
				$('.head').replaceWith("<img class='head' src='head" + head + ".png'>");
				break;
			case 1:
				if (leftA === 3) {
					createInjury();
				}
				leftA = Math.floor((3 - leftA) * Math.random()) + 1;
				$('.leftA').replaceWith("<img class='leftA' src='leftA" + leftA + ".png'>");
				break;
			case 2:
				if (rightA === 3) {
					createInjury();
				}
				rightA = Math.floor((3 - rightA) * Math.random()) + 1;
				$('.rightA').replaceWith("<img class='rightA' src='rightA" + rightA + ".png'>");
				break;
			case 3:
				if (torso === 3) {
					createInjury();
				}
				torso = Math.floor((3 - torso) * Math.random()) + 1;
				$('.torso').replaceWith("<img class='torso' src='torso" + torso + ".png'>");
				break;
			case 4:
				if (leftL === 3) {
					createInjury();
				}
				leftL = Math.floor((3 - leftL) * Math.random()) + 1;
				$('.leftL').replaceWith("<img class='leftL' src='leftL" + leftL + ".png'>");
				break;
			case 5:
				if (rightL === 3) {
					createInjury();
				}
				rightL = Math.floor((3 - rightL) * Math.random()) + 1;
				$('.rightL').replaceWith("<img class='rightL' src='rightL" + rightL + ".png'>");
				break;
		}
		//TODO: manipulate delayInjury here?
		delayInjury = Math.floor(6*Math.random()) + 6;
		setTimeout(createInjury, delayInjury);
	}
}

/* the function that creates a heal */
var createHeal = function() {
	if(gameContinuing) {
		heals++;
		//TODO: manipulate delayHeal here?
	}
}

/* when the player clicks on a body, the game will heal it if there are enough heals */
var tryHeal = function() {
	if(gameContinuing) {
		$('.head').click(function() {
				if (heals > 0) {
					heals--;
					head--;
					$('.head').replaceWith("<img class='head' src='head" + head + ".png'>");
				} else {
					sendMsg("Need more heals!");
				}
		});
		$('.leftA').click(function() {
				if (heals > 0) {
					heals--;
					leftA--;
					$('.leftA').replaceWith("<img class='leftA' src='leftA" + leftA + ".png'>");
				} else {
					sendMsg("Need more heals!");
				}
		});
		$('.rightA').click(function() {
				if (heals > 0) {
					heals--;
					rightA--;
					$('.rightA').replaceWith("<img class='rightA' src='rightA" + rightA + ".png'>");
				} else {
					sendMsg("Need more heals!");
				}
		});
		$('.leftL').click(function() {
				if (heals > 0) {
					heals--;
					leftL--;
					$('.leftL').replaceWith("<img class='leftL' src='leftL" + leftL + ".png'>");
				} else {
					sendMsg("Need more heals!");
				}
		});
		$('.rightL').click(function() {
				if (heals > 0) {
					heals--;
					head--;
					$('.rightL').replaceWith("<img class='rightL' src='rightL" + rightL + ".png'>");
				} else {
					sendMsg("Need more heals!");
				}
		});
		$('.torso').click(function() {
				if (heals > 0) {
					heals--;
					torso--;
					$('.torso').replaceWith("<img class='torso' src='torso" + torso + ".png'>");
				} else {
					sendMsg("Need more heals!");
				}
		});
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
	'<img src="img/torsoA0.png" alt="" class="torso">',
	'<img src="img/rightL0.png" alt="" class="rightL">',
	'<img src="img/leftL0.png" alt="" class="leftL">'
	// TODO classes: timeElapsed, numHeals, untilHeal
];

var gameEnd = function() {
	$('.game').empty();
	$('.game').append("Game Over.");
}

$(document).ready(function() {
	$('.play').click(function() {
		$('.game').empty();
		$('.game').append(gameHTML.join(''));

		var date = new Date;
		startTime = date.getTime();
		gameContinuing = true;

		/* To keep creating heals */
		//var injuryCreation = setInterval(createInjury, delayInjury);
		var healCreation = setInterval(createHeal, delayHeal);

		setTimeout(function() {
			gameContinuing = false; 
			//clearInterval(injuryCreation); 
			clearInterval(healCreation)
		}, gameLength); // when to end game?
	});
	$('.mid').mouseleave(function() { gameContinuing = false; });
	$('.mid').mouseenter(function() { gameContinuing = true; });
});

/* Updating the text in the game */
while(gameContinuing) {
	var date = new Date;
	$('.timeElapsed').empty();
	$('.timeElapsed').append("Time elapsed: " + Math.floor((date.getTime() - startTime)/1000) + "s");

	$('.numHeals').empty();
	$('.numHeals').append(heals + " heals left");

	$('.untilHeal').empty();
	$('.untilHeal').append(); //TODO: when we figure it out
}
