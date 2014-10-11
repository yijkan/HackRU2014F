// these represent how many heals left until the body part is healthy
var head=0;
var leftA=0;
var rightA=0;
var torso=0;
var leftL=0;
var rightL=0;

// how many heals the user has left
var heals=3;
// how many millisecondsc between heal generation
var delay;

// the function that actually creates an injury
var createInjury = function() {
	// choose a random body part and increase it by one
}

// the function that creates a heal
var createHeal = function() {
	heal++;
}

var tryHeal = function() {
	$('.head').mouseclick(function() {
			if (heals > 0) {
				heals--;
				head--;
				$('.head').replaceWith("<img class='head' src=''>")
			} else {
				//TODO
			}
	});
}

var gameHTML = [
	//TODO
	"HTML of initial game goes here",
	"btw this is an array of strings that will be joined together when updating the page with jquery",
]

$(document).ready(function() {
	$('.play').click(function() {
		$('.game').empty();
		#('.game').append(gameHTML.join(''));

		setTimeout(createInjury, delay);
	});
});