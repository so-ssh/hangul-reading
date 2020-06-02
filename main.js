var syllable = $("#syllable");
var randInitId, randMedId, randFinId;
var textarea = $("#input");
var showRoman = $("#show-roman");
var roman = $("#debug");

var single = [ "g", "gg", null, "n", null, null, "d", "dd", "r", null, null, null, null, null, null, null, "m", "b", "bb", null, "s", "ss", null, "j", "jj", "ch", "k", "t", "p", "h", "a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i"];

var initial = [ "g", "gg", "n", "d", "dd", "r", "m", "b", "bb", "s", "ss", "", "j", "jj", "ch", "k", "t", "p", "h" ];
var medial = [ "a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i" ];
var final = [ "", "k", "gg", null, "n", null, null, "d", "l", null, null, null, null, null, null, null, "m", "b", null, "s", "ss", "ng", "j", "ch", "kk", "t", "p", "h" ];

textarea.on("keyup", function(e) {
	if (validateInput(textarea.val())) {
		textarea.val('');
		randomSyllable();
	}
});

textarea.on("keypress", function(e) {
	if (e.keyCode == 32 || e.keyCode == 13)
		e.preventDefault();
});

function validateInput(val) {
	if (randMedId == undefined) return (single[randInitId] == val);
	return ((initial[randInitId] + medial[randMedId] + final[randFinId]) == val);
}

function getRandomInt(n, o) {
	var min = Math.ceil(n);
	var max = Math.floor(o);
	return Math.floor(Math.random() * (max - min)) + min;
};

function randomSyllable() {
	if (getRandomInt(1, 10) > 5) {
		randMedId = undefined;
		randInitId = getRandomInt(0, 51);

		while (single[randInitId] == null) {
			randInitId = getRandomInt(0, 51);
		}

    	if (showRoman.is(':checked')) roman.text(single[randInitId]);
		syllable.text(String.fromCodePoint(randInitId + 12593));
		return;
	}

	randInitId = getRandomInt(0, 19);
	randMedId = getRandomInt(0, 21);
	randFinId = getRandomInt(0, 28);
	var randInit = randInitId * 588;
    var randMed = randMedId * 28;
    if (final[randFinId] == null) randFinId = 0;
    var hangulFormula = randInit + randMed + randFinId + 44032;

  	syllable.text(String.fromCodePoint(hangulFormula));

    if (showRoman.is(':checked')) updateRoman();
}

function toggleRoman() {
	if (!showRoman.is(':checked')) {
		roman.text('');
	} else {
		updateRoman();
	}
}

function updateRoman() {
	if (randMedId == undefined) {
		roman.text(initial[randInitId]);
	} else {
		roman.text(initial[randInitId] + medial[randMedId] + final[randFinId]);
	}
}

$(window).on("keydown", function(e) {
	if(e.keyCode == 32) {
		textarea.val('');
		randomSyllable();
	}
});

$(function() {
	textarea.val('');
	textarea.focus();
	randomSyllable();
});