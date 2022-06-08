/* The words "screen" and "calculator screen" are used synonymously */

/* All numbers */
let numbers = [...document.getElementsByClassName("num")];

/* All arithmetical operators */
let arithmeticOperators = [
	...document.getElementsByClassName("arith-operator"),
];

/* All trignometrical operators */
let trignometricOperators = [
	...document.getElementsByClassName("trig-operator"),
];

/* All extra operators */
let extraOperators = [...document.getElementsByClassName("extra-operators")];

/* Constants */
let pi = document.getElementById("pi");
let eulerConst = document.getElementById("euler-constant");

/* Brackets */
let openBracket = document.getElementById("open-bracket");
let closeBracket = document.getElementById("close-bracket");

/* Screen */
let screen = document.getElementById("screen");

/* History Container */
let historyContainer = document.getElementById("history-container");

/* Grouping all the elements contributing to main expression together */
const stringMakers = [
	...arithmeticOperators,
	...numbers,
	...trignometricOperators,
	pi,
	eulerConst,
	openBracket,
	closeBracket,
];

/* A counter variable to keep track whether the text displayed on "screen" is the expression or the result. If the result is 	being shown then pressing the clear button will clear the display screen othewise it will delete one character */
let isResultBeingShown = false;

/* Switching between radians and degrees */
let onDeg = false;
document.getElementById("rad").addEventListener("click", handleRadClick);
document.getElementById("deg").addEventListener("click", handleDegClick);

function handleDegClick() {
	if (!onDeg) {
		document.getElementById("deg").style.background =
			"linear-gradient(to right, rgba(0, 255, 0, 0.4), rgba(0, 255, 0, 1),rgba(0, 255, 0, 0.4))";
		document.getElementById("deg").style.color = "white";
		document.getElementById("rad").style.background =
			"linear-gradient(to right, rgba(255, 0, 0, 0.4), rgba(255, 0, 0, 1), rgba(255, 0, 0, 0.4))";
		document.getElementById("rad").style.color = "black";
		onDeg = true;
	}
}

function handleRadClick() {
	if (onDeg) {
		document.getElementById("rad").style.background =
			"linear-gradient(to right, rgba(0, 255, 0, 0.4), rgba(0, 255, 0, 1),rgba(0, 255, 0, 0.4))";
		document.getElementById("rad").style.color = "white";
		document.getElementById("deg").style.background =
			"linear-gradient(to right, rgba(255, 0, 0, 0.4), rgba(255, 0, 0, 1), rgba(255, 0, 0, 0.4))";
		document.getElementById("deg").style.color = "black";

		onDeg = false;
	}
}

/* Switching between inverse and normal */
let isInv = false;

document
	.getElementById("inverse")
	.addEventListener("click", handleInverseClick);

function handleInverseClick() {
	if (isInv) {
		document.getElementById("inverse").style.color = "black";
		trignometricOperators.forEach((element) => {
			element.innerText = `${element.id}`;
		});
	} else {
		document.getElementById("inverse").style.color = "white";
		trignometricOperators.forEach((element) => {
			if (dark == false) {
				element.innerHTML += "<sup class='super-script'> -1</sup > ";
			} else {
				element.innerHTML += "<sup class='super-script dark-sup'> -1</sup > ";
			}
		});
	}
	isInv = !isInv;
}

// Functionality //

/* Storing the values of pi and euler's constant */
const PI = Math.PI;
const EU = Math.E;

/* If the value entered is in degrees, multiplying by extraStr will convert the value to radians */
let extraStr = "((PI/180)*";

/* A variable to store what will be displayed on the calculator screen */
let expression = "";

/* A variable to store a intermediary string which will produce a formatted string to be proceessed by "eval"*/
let calculatorString = "";

/* A counter variable to deal with brackets */
let o2 = 0;

/* An array to keep track of number of places the user has entered the angle in degrees. We'll later use it to edit our final string */
let degAngle = [];

/* Adding a mouse-click event listener to each element of stringMakers */
stringMakers.forEach((element) => {
	element.addEventListener("click", handleClick);

	function handleClick() {
		/* Since the user is entering the data, there is no way it is the result */
		isResultBeingShown = false;

		expression += element.innerText;

		/* Dealing with calculatorString */

		/* in case of "sin-1", we put "asin" in our calculatorString, "*" in place of "x", and "/" in place of "÷" */
		if (element.classList.contains("trig-operator") && isInv == true) {
			calculatorString += "a";
			let p = element.innerText;
			p = p.slice(0, 3);
			calculatorString += p;
		} else if (element.innerText == "x") {
			calculatorString += "*";
		} else if (element.innerText == "÷") {
			calculatorString += "/";
		} else {
			calculatorString += element.innerText;
		}

		/* If user wants to enter the element in degrees, we save in in our "degAngle" array */
		if (
			element.classList.contains("trig-operator") &&
			onDeg == true &&
			isInv == false
		) {
			degAngle.push(calculatorString.length - 3);
		}

		/* We just show the expression on the calculator screen */
		screen.innerText = expression;
	}
});

/* Single click on "CE" will delete one character for the expression */
document.getElementById("clear-all").addEventListener("click", clearText);
function clearText() {
	let p = screen.innerText;
	let n = p.length;

	/* dealing with operators like sin, atan, log etc which have length more than 1 */
	if (
		p[n - 1] == "s" &&
		p[n - 2] == "o" &&
		p[n - 3] == "c" &&
		p[n - 4] == "a"
	) {
		p = p.slice(0, -4);
	} else if (
		p[n - 1] == "n" &&
		p[n - 2] == "i" &&
		p[n - 3] == "s" &&
		p[n - 4] == "a"
	) {
		p = p.slice(0, -4);
	} else if (
		p[n - 1] == "n" &&
		p[n - 2] == "a" &&
		p[n - 3] == "t" &&
		p[n - 4] == "a"
	) {
		p = p.slice(0, -4);
	} else if (p[n - 1] == "s" && p[n - 2] == "o" && p[n - 3] == "c") {
		p = p.slice(0, -3);
	} else if (p[n - 1] == "n" && p[n - 2] == "i" && p[n - 3] == "s") {
		p = p.slice(0, -3);
	} else if (p[n - 1] == "n" && p[n - 2] == "a" && p[n - 3] == "t") {
		p = p.slice(0, -3);
	} else {
		p = p.slice(0, -1);
	}
	screen.innerText = p;
	expression = p;
	calculatorString = calculatorString.slice(0, -1);

	if (isResultBeingShown) {
		screen.innerText = "";
		expression = "";
		calculatorString = "";
	}
}

/* While double click will clear the entire screen */
document.getElementById("clear-all").addEventListener("dblclick", clearDisplay);
function clearDisplay() {
	screen.innerText = "";
	expression = "";
	calculatorString = "";
}

/* An array to keep record of all the previous calculations */
let history = [];

/* This will store the innerHTML for history div */
let historyElement;

historyElement =
	"<h1 class='history-heading w-100 text-capitalize text-center text-white bg-info'>History of Your Previous calculations</h1>";

/* Adding an event listener to "History" button which shows and hides the history div(div which shows history of previous calculations) */
document
	.getElementById("history")
	.addEventListener("click", handleHistoryClick);

function handleHistoryClick() {
	console.log(history);

	if (historyContainer.classList.contains("hide")) {
		historyContainer.classList.remove("hide");
		historyContainer.style.display = "block";
	} else {
		historyContainer.classList.add("hide");
		historyContainer.style.display = "none";
	}
}

/* Addng an event listener to "=" button */
document.getElementById("equals").addEventListener("click", showResult);
function showResult() {
	calculateExpression();
}

function calculateExpression() {
	/* Final string which will be processed by "eval" */
	let s = "";

	/* This will be storing number of sqrts, cbrts, ln, log, ! and ^. */
	let cntOdds = 0;

	/* Generating s from calculatorString */
	for (let i = 0; i < calculatorString.length; i++) {
		/* If in calculatorString, it is sin, change it to Math.sin(. Moreover if it is in degrees, multiply pi / 180 to the operand. This method was just to check if it works or not. But since it worked, I didn't remove it. A nicer way is shown below where the  sqrts, cbrts, ln, log, ! and ^ are calculated. */
		if (calculatorString[i] == "s") {
			s += "Math.sin(";
			i += 2;
			o2++;

			if (degAngle.includes(i - 2)) {
				s += "((PI/180)*";
				o2++;
			}
		} else if (calculatorString[i] == "c") {
			/* Same for cos */
			s += "Math.cos(";
			i += 2;
			o2++;
			if (degAngle.includes(i - 2)) {
				s += "((PI/180)*";
				o2++;
			}
		} else if (calculatorString[i] == "t") {
			/* For tan */
			s += "Math.tan(";
			i += 2;
			o2++;
			if (degAngle.includes(i - 2)) {
				s += "((PI/180)*";
				o2++;
			}
		} else if (calculatorString[i] == "a" && calculatorString[i + 1] == "s") {
			/* For asin */
			s += "Math.asin(";
			i += 3;
			o2++;
		} else if (calculatorString[i] == "a" && calculatorString[i + 1] == "c") {
			/* For acos */
			s += "Math.acos(";
			i += 3;
			o2++;
		} else if (calculatorString[i] == "a" && calculatorString[i + 1] == "t") {
			/* For atan. the rest is simple, nothing too complex */
			s += "Math.atan(";
			i += 3;
			o2++;
		} else if (
			calculatorString[i] == "+" ||
			calculatorString[i] == "-" ||
			calculatorString[i] == "*" ||
			calculatorString[i] == "/" ||
			calculatorString[i] == "%" ||
			calculatorString[i] == "^"
		) {
			if (calculatorString[i] == "^") {
				cntOdds += 1;
			}
			for (let j = 0; j < o2; j++) {
				s += ")";
			}
			o2 = 0;
			s += calculatorString[i];
		} else if (calculatorString[i] == "π") {
			s += "PI";
		} else if (calculatorString[i] == "e") {
			s += "EU";
		} else if (calculatorString[i] == "√") {
			cntOdds += 1;
			s += calculatorString[i];
		} else if (calculatorString[i] == "∛") {
			cntOdds += 1;
			s += calculatorString[i];
		} else if (calculatorString[i] == "l" && calculatorString[i + 1] == "n") {
			cntOdds += 1;
			s += calculatorString[i];
			i += 1;
		} else if (calculatorString[i] == "!") {
			cntOdds += 1;
			s += calculatorString[i];
		} else if (
			calculatorString[i] == "l" &&
			calculatorString[i + 1] == "o" &&
			calculatorString[i + 2] == "g"
		) {
			cntOdds += 1;
			s += calculatorString[i];
			i += 2;
		} else {
			s += calculatorString[i];
		}
	}

	/* When the string has ended, close all the remaining opening brackets */
	for (let j = 0; j < o2; j++) s += ")";
	o2 = 0;

	/* In this method, we use a function to calculate operand before and after for us */
	for (let i = 0; i < cntOdds; i++) {
		for (let j = 0; j < s.length; j++) {
			if (s[j] == "√") {
				let [x, y] = getOperandAfter(s, j);
				s = s.slice(0, j) + `Math.sqrt(${y})` + s.slice(x);
				break;
			}
			if (s[j] == "∛") {
				let [x, y] = getOperandAfter(s, j);
				s = s.slice(0, j) + `Math.cbrt(${y})` + s.slice(x);
				break;
			}
			if (s[j] == "l" && s[j + 1] == "n") {
				let [x, y] = getOperandAfter(s, j + 1);
				s = s.slice(0, j) + `Math.log(${y})` + s.slice(x);
				break;
			}
			if (
				calculatorString[j] == "l" &&
				calculatorString[j + 1] == "o" &&
				calculatorString[j + 2] == "g"
			) {
				let [x, y] = getOperandAfter(s, j + 2);
				s = s.slice(0, j) + `Math.log10(${y})` + s.slice(x);
				break;
			}
			if (s[j] == "^") {
				let [x, y] = getOperandBefore(s, j);
				let [u, v] = getOperandAfter(s, j);
				s = s.slice(0, x) + `Math.pow(${y}, ${v})` + s.slice(u);
				break;
			}
			if (s[j] == "!") {
				let [x, y] = getOperandBefore(s, j);
				let value = eval(y);
				if (Number.isInteger(value)) {
					s = s.slice(0, x) + `fact(${value})` + s.slice(j + 1);
				}
			}
		}
	}

	/* Calculate the result */
	let result;

	try {
		result = eval(s);
	} catch (err) {
		result = "Wrong Syntax";
	}

	/* Push the calculation and result to our history array */
	history.push({
		calculation: expression,
		answer: result,
	});

	/* Update historyElement */
	historyElement += `<ul class='history-list w-100'><li><span class='font-weight-bold'>Calculation: </span><span>${
		history[history.length - 1].calculation
	}</span></li><li><span class='font-weight-bold'>Answer: </span><span>${
		history[history.length - 1].answer
	}</span></li><hr /></ul>`;

	historyContainer.innerHTML = historyElement;

	/* Show the result and set result counter variable to true */
	screen.innerText = result;
	isResultBeingShown = true;
}

function fact(n) {
	let res = 1;
	for (let i = 2; i <= n; i++) {
		res *= i;
	}
	return res;
}

/* Function to return operand before */
function getOperandBefore(s, p) {
	if (s[p - 1] != ")") {
		let tmp = "";
		let j = -1;
		for (j = p - 1; j >= 0; j--) {
			if (
				s[j] != "+" &&
				s[j] != "-" &&
				s[j] != "*" &&
				s[j] != "/" &&
				s[j] != "%" &&
				s[j] != "^" &&
				s[j] != "("
			) {
				tmp += s[j];
			} else break;
		}
		tmp = reverseString(tmp);
		return [j + 1, tmp];
	} else {
		let cnt = 0;
		let tmp = "";
		let j;
		for (j = p - 2; j >= 0; j--) {
			if (s[j] == ")") {
				cnt++;
			}
			if (s[j] == "(") {
				if (cnt == 0) {
					tmp = reverseString(tmp);
					return [j, tmp];
				} else {
					cnt--;
				}
			}
			tmp += s[j];
		}
		tmp = reverseString(tmp);
		return [j, tmp];
	}
}

function reverseString(str) {
	var splitString = str.split("");
	var reverseArray = splitString.reverse();
	var joinArray = reverseArray.join("");
	return joinArray;
}

/* Function to return operand after */
function getOperandAfter(s, p) {
	if (s[p + 1] != "(") {
		let tmp = "";
		let j;
		for (j = p + 1; j < s.length; j++) {
			if (
				s[j] != "+" &&
				s[j] != "-" &&
				s[j] != "*" &&
				s[j] != "/" &&
				s[j] != "%" &&
				s[j] != "^" &&
				s[j] != ")"
			) {
				tmp += s[j];
			} else break;
		}
		return [j, tmp];
	} else {
		let cnt = 0;
		let tmp = "";
		let j;
		for (j = p + 2; j < s.length; j++) {
			if (s[j] == "(") {
				cnt++;
			}
			if (s[j] == ")") {
				if (cnt == 0) {
					return [j + 1, tmp];
				} else {
					cnt--;
				}
			}
			tmp += s[j];
		}
		return [j, tmp];
	}
}

/* Handling Theme */

document.getElementById("theme").addEventListener("click", handleThemeChange);
let dark = false;
function handleThemeChange() {
	if (dark == false) {
		dark = true;
		document.getElementById("theme").id = "dark-theme";

		document.body.style.backgroundColor = "#888";

		document.getElementById("screen").id = "screen-dark";

		document
			.querySelector(".container")
			.classList.remove("light-background-container");

		document
			.querySelector(".container")
			.classList.add("dark-background-container");

		[...document.getElementsByClassName("super-script")].forEach((element) => {
			element.classList.add("dark-sup");
		});

		stringMakers.forEach((element) => {
			element.classList.remove("cell");
			element.classList.add("dark-mode-cells");
		});
	} else {
		dark = false;
		document.getElementById("dark-theme").id = "theme";

		document.body.style.backgroundColor = "#fff";

		document.getElementById("screen-dark").id = "screen";

		document
			.querySelector(".container")
			.classList.add("light-background-container");
		document

			.querySelector(".container")
			.classList.remove("dark-background-container");

		[...document.getElementsByClassName("super-script")].forEach((element) => {
			element.classList.remove("dark-sup");
		});

		stringMakers.forEach((element) => {
			element.classList.add("cell");
			element.classList.remove("dark-mode-cells");
		});
	}
}
