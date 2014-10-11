// to represent score (seconds elapsed)
var time;

// these represent how many heals left until the body part is healthy
var head=0;
var leftA=0;
var rightA=0;
var torso=0;
var leftL=0;
var rightL=0;

// how many heals the user has left
var heals=3;
// how many milliseconds between everything
var delayInjury;
var delayHeal;

//how many messages have shown up -- needed to delete them sequentially
var msgNo = 1;

// the function that actually creates an injury
var createInjury = function() {
	// choose a random body part and increase it by one
	var bodyChoice = Math.floor(6 * Math.random());
	switch(bodyChoice) {
		case 0:
			if (head === 3) {
				createInjury();
			}
			head = Math.floor((3 - head) * Math.random()) + 1;
			$('.head').replaceWith("<img class='head' src='head" + head + "'>");
			break;
		case 1:
			if (leftA === 3) {
				createInjury();
			}
			leftA = Math.floor((3 - leftA) * Math.random()) + 1;
			$('.leftA').replaceWith("<img class='leftA' src='leftA" + leftA + "'>");
			break;
		case 2:
			if (rightA === 3) {
				createInjury();
			}
			rightA = Math.floor((3 - rightA) * Math.random()) + 1;
			$('.rightA').replaceWith("<img class='rightA' src='rightA" + rightA + "'>");
			break;
		case 3:
			if (torso === 3) {
				createInjury();
			}
			torso = Math.floor((3 - torso) * Math.random()) + 1;
			$('.torso').replaceWith("<img class='torso' src='torso" + torso + "'>");
			break;
		case 4:
			if (leftL === 3) {
				createInjury();
			}
			leftL = Math.floor((3 - leftL) * Math.random()) + 1;
			$('.leftL').replaceWith("<img class='leftL' src='leftL" + leftL + "'>");
			break;
		case 5:
			if (rightL === 3) {
				createInjury();
			}
			rightL = Math.floor((3 - rightL) * Math.random()) + 1;
			$('.rightL').replaceWith("<img class='rightL' src='rightL" + rightL + "'>");
			break;
	}
}

// the function that creates a heal
var createHeal = function() {
	heal++;
}

var tryHeal = function() {
	$('.head').click(function() {
			if (heals > 0) {
				heals--;
				head--;
				$('.head').replaceWith("<img class='head' src='head" + head + "'>");
			} else {
				sendMsg("Need more heals!");
			}
	});
	$('.leftA').click(function() {
			if (heals > 0) {
				heals--;
				leftA--;
				$('.leftA').replaceWith("<img class='leftA' src='leftA" + leftA + "'>");
			} else {
				sendMsg("Need more heals!");
			}
	});
	$('.rightA').click(function() {
			if (heals > 0) {
				heals--;
				rightA--;
				$('.rightA').replaceWith("<img class='rightA' src='rightA" + rightA + "'>");
			} else {
				sendMsg("Need more heals!");
			}
	});
	$('.leftL').click(function() {
			if (heals > 0) {
				heals--;
				leftL--;
				$('.leftL').replaceWith("<img class='leftL' src='leftL" + leftL + "'>");
			} else {
				sendMsg("Need more heals!");
			}
	});
	$('.rightL').click(function() {
			if (heals > 0) {
				heals--;
				head--;
				$('.rightL').replaceWith("<img class='rightL' src='rightL" + rightL + "'>");
			} else {
				sendMsg("Need more heals!");
			}
	});
	$('.torso').click(function() {
			if (heals > 0) {
				heals--;
				torso--;
				$('.torso').replaceWith("<img class='torso' src='torso" + torso + "'>");
			} else {
				sendMsg("Need more heals!");
			}
	});
}

var sendMsg = function(message) {
	var temp = msgNo;
	msgNo++;
	$('.messageBar').append("<p id='" + temp + "'>"+ message + "</p>");
	setTimeout(function() {$('#' + temp).remove();}, 10000); // messages will disappear after 10 seconds
};

var gameHTML = [
	//TODO
	"HTML of initial game goes here",
	"btw this is an array of strings that will be joined together when updating the page with jquery",
	'<img src="img/head0.jpg" alt="" class="head">',
	'<img src="img/rightA0.jpg" alt="" class="rightA">',
	'<img src="img/leftA0.jpg" alt="" class="leftA">',
	'<img src="img/torsoA0.jpg" alt="" class="torso">',
	'<img src="img/hrightL0.jpg" alt="" class="rightL">',
	'<img src="img/leftL0.jpg" alt="" class="leftL">'
];

var gameEnd = function() {
	$('.game').empty();
	$('.game').append("Game Over.<br>Your score is " + score);
}

$(document).ready(function() {
	$('.play').click(function() {
		$('.game').empty();
		$('.game').append(gameHTML.join(''));

		date = new Date;
		time = date.getTime();

		setTimeout(createInjury, delayInjury); // TODO: put this in some kind of for loop 
		setTimeout(createHeal, delayHeal);
	});
});
