let submitBtn = document.getElementById("submit-form-btn");
let a, b, c, d;
let matrixA = [],
	matrixB = [];
let scalar = 0;

let isAdd = false,
	isSub = false,
	isDiv = false,
	isMul = false,
	isInv = false,
	isTrans = false;

submitBtn.addEventListener("click", handleSubmitFormClick);
function handleSubmitFormClick() {
	matrixA = [];
	matrixB = [];
	scalar = 0;
	console.log("clicked");
	let matrixRowA = Number(document.getElementById("row-input-a").value);
	let matrixColA = Number(document.getElementById("col-input-a").value);
	let matrixRowB = Number(document.getElementById("row-input-b").value);
	let matrixColB = Number(document.getElementById("col-input-b").value);
	a = matrixRowA;
	b = matrixColA;
	c = matrixRowB;
	d = matrixColB;
	let stringA = document.getElementById("matrix-input-a").value;
	let stringB = document.getElementById("matrix-input-b").value;

	scalar = Number(document.getElementById("scalar-input").value);

	console.log(stringA);
	console.log(stringB);

	if (
		matrixColA == NaN ||
		matrixColB == NaN ||
		matrixRowA == NaN ||
		matrixRowB == NaN
	) {
		console.log(Error);
		return;
	}

	if (
		(matrixColB == 0 && matrixRowB != 0) ||
		(matrixColB != 0 && matrixRowB == 0)
	) {
		console.log("Error");
		return;
	}

	let rowA = [];
	let val = stringA.split(" ");
	if (val[val.length - 1] == "") val.pop();

	if (val.length != matrixColA * matrixRowA) {
		console.log(val);
		console.log(matrixRowA);
		console.log(matrixColA);
		console.log("Error");
		return;
	}

	let cur = 0;
	for (let i = 0; i < matrixRowA; i++) {
		rowA = val.slice(cur, cur + matrixColA);
		matrixA.push(rowA);
		cur += matrixColA;
	}
	for (let i = 0; i < matrixRowA; i++) {
		for (let j = 0; j < matrixColA; j++) {
			matrixA[i][j] = Number(matrixA[i][j]);
		}
	}
	// console.log(matrixA);

	if (matrixColB != 0 && matrixRowB != 0) {
		let rowB = [];
		let valB = stringB.split(" ");

		if (valB.length != matrixColB * matrixRowB) {
			console.log("Error");
			return;
		}

		let curB = 0;
		for (let i = 0; i < matrixRowB; i++) {
			rowB = valB.slice(curB, curB + matrixColB);
			matrixB.push(rowB);
			curB += matrixColB;
		}
		for (let i = 0; i < matrixRowB; i++) {
			for (let j = 0; j < matrixColB; j++) {
				matrixB[i][j] = Number(matrixB[i][j]);
			}
		}
	}
	console.log(a, b, c, d, matrixA, matrixB);
}

document
	.getElementById("addition")
	.addEventListener("click", handleAdditionClick);
function handleAdditionClick() {
	if (isAdd) {
		document
			.getElementById("addition")
			.removeChild(document.getElementById("addition").lastChild);
	}
	console.log("clicked");
	isAdd = true;
	if (matrixA.length == 0 || (matrixB.length == 0 && scalar == 0)) {
		console.log("Can't perform the operation");
		alert("Can't perform the operation");
		return;
	}

	let matrixA1 = math.matrix(matrixA);
	let matrixB1;
	if (matrixB.length > 0) {
		matrixB1 = math.matrix(matrixB);
	}

	let matrixC = [];
	try {
		if (matrixB.length > 0) {
			matrixC = math.add(matrixA1, matrixB1);
			insertDiv("addition", false, matrixC._data);
		} else {
			matrixC = math.add(matrixA1, scalar);
			insertDiv("addition", true, matrixC._data);
		}

		console.log(matrixC);
	} catch (err) {
		console.log(err);
		alert("Wrong input");
	}
}

document
	.getElementById("subtraction")
	.addEventListener("click", handleSubtractionClick);
function handleSubtractionClick() {
	console.log("clicked");
	if (isSub) {
		document
			.getElementById("subtraction")
			.removeChild(document.getElementById("subtraction").lastChild);
	}
	isSub = true;
	if (matrixA.length == 0 || (matrixB.length == 0 && scalar == 0)) {
		console.log("Can't perform the operation");
		alert("Can't perform the operation");
		return;
	}

	let matrixA1 = math.matrix(matrixA);
	let matrixB1;
	if (matrixB.length > 0) {
		matrixB1 = math.matrix(matrixB);
	}

	let matrixC = [];
	try {
		if (matrixB.length > 0) {
			matrixC = math.subtract(matrixA1, matrixB1);
			console.log(matrixC);
			insertDiv("subtraction", false, matrixC._data);
		} else {
			matrixC = math.subtract(matrixA, scalar);
			console.log(matrixC);
			insertDiv("subtraction", true, matrixC);
		}
		console.log(matrixC);
	} catch (err) {
		console.log(err);
		alert("Wrong input");
	}
}

document
	.getElementById("division")
	.addEventListener("click", handleDivisionClick);
function handleDivisionClick() {
	console.log("clicked");
	if (isDiv) {
		document
			.getElementById("division")
			.removeChild(document.getElementById("division").lastChild);
	}
	isDiv = true;
	if (matrixA.length == 0 || (matrixB.length == 0 && scalar == 0)) {
		console.log("Can't perform the operation");
		alert("Can't perform the operation");
		return;
	}

	let matrixA1 = math.matrix(matrixA);
	let matrixB1;
	if (matrixB.length > 0) {
		matrixB1 = math.matrix(matrixB);
	}

	let matrixC = [];
	try {
		if (matrixB.length > 0) {
			matrixC = math.divide(matrixA1, matrixB1);
			insertDiv("division", false, matrixC._data);
		} else {
			matrixC = math.divide(matrixA1, scalar);
			insertDiv("division", true, matrixC._data);
		}

		console.log(matrixC);
	} catch (err) {
		console.log(err);
		alert("Wrong input");
	}
}

document
	.getElementById("multiplication")
	.addEventListener("click", handleMultiplicationClick);
function handleMultiplicationClick() {
	console.log("clicked");
	if (isMul) {
		document
			.getElementById("multiplication")
			.removeChild(document.getElementById("multiplication").lastChild);
	}
	isMul = true;
	if (matrixA.length == 0 || (matrixB.length == 0 && scalar == 0)) {
		console.log("Can't perform the operation");
		alert("Can't perform the operation");
		return;
	}

	let matrixA1 = math.matrix(matrixA);
	let matrixB1;
	if (matrixB.length > 0) {
		matrixB1 = math.matrix(matrixB);
	}

	let matrixC = [];
	try {
		if (matrixB.length > 0) {
			matrixC = math.multiply(matrixA1, matrixB1);
			insertDiv("multiplication", false, matrixC._data);
		} else {
			matrixC = math.multiply(matrixA1, scalar);
			insertDiv("multiplication", true, matrixC._data);
		}

		console.log(matrixC);
	} catch (err) {
		console.log(err);
		alert("Wrong input");
	}
}

document
	.getElementById("inverse")
	.addEventListener("click", handleInverseClick);
function handleInverseClick() {
	console.log("clicked");
	if (isInv) {
		document
			.getElementById("inverse")
			.removeChild(document.getElementById("inverse").lastChild);
	}
	isInv = true;
	if (matrixA.length == 0) {
		console.log("Can't perform the operation");
		alert("Can't perform the operation");
		return;
	}

	let matrixA1 = math.matrix(matrixA);

	let matrixC = [];
	try {
		matrixC = math.inv(matrixA1);
		insertDiv("inverse", false, matrixC._data);
		console.log(matrixC);
	} catch (err) {
		console.log(err);
		alert("Wrong input");
	}
}

document
	.getElementById("transpose")
	.addEventListener("click", handleTransposeClick);
function handleTransposeClick() {
	console.log("clicked");
	if (isTrans) {
		document
			.getElementById("transpose")
			.removeChild(document.getElementById("transpose").lastChild);
	}
	isTrans = true;
	if (matrixA.length == 0) {
		console.log("Can't perform the operation");
		alert("Can't perform the operation");
		return;
	}

	let matrixA1 = math.matrix(matrixA);

	let matrixC = [];
	try {
		matrixC = math.transpose(matrixA1);
		console.log(matrixC);
		insertDiv("transpose", false, matrixC._data);
	} catch (err) {
		console.log(err);
		alert("Wrong input");
	}
}

function insertDiv(id, isScalar, res) {
	console.log(matrixA);
	console.log(matrixB);
	let container = document.createElement("div");
	container.classList.add("container");
	let matA = document.createElement("table");
	matA.classList.add("matrix");
	for (let i = 0; i < a; i++) {
		let row = document.createElement("tr");
		for (let j = 0; j < b; j++) {
			let col = document.createElement("td");
			col.classList.add("cell");
			col.textContent = matrixA[i][j];
			row.appendChild(col);
		}
		matA.appendChild(row);
	}

	if (id == "inverse" || id == "transpose") {
		let sign = document.createElement("sup");
		sign.innerText = id == "inverse" ? "-1" : "T";

		let equals = document.createElement("div");
		equals.innerText = "=";
		equals.classList.add("text-2xl");

		let matC = document.createElement("table");
		matC.classList.add("matrix");
		for (let i = 0; i < b; i++) {
			let row = document.createElement("tr");
			for (let j = 0; j < a; j++) {
				let col = document.createElement("td");
				col.classList.add("cell");
				col.textContent = res[i][j];
				row.appendChild(col);
			}
			matC.appendChild(row);
		}
		container.appendChild(matA);
		container.appendChild(sign);
		container.appendChild(equals);
		container.appendChild(matC);
	} else {
		let sign = document.createElement("div");
		if (id == "addition") sign.innerText = "+";
		else if (id == "subtraction") sign.innerText = "-";
		else if (id == "multiplication") sign.innerText = "X";
		else sign.innerText = "/";
		sign.classList.add("text-3xl");

		let equals = document.createElement("div");
		equals.innerText = "=";
		equals.classList.add("text-3xl");

		let matB;

		if (!isScalar) {
			matB = document.createElement("table");
			matB.classList.add("matrix");
			for (let i = 0; i < c; i++) {
				let row = document.createElement("tr");
				for (let j = 0; j < d; j++) {
					let col = document.createElement("td");
					col.classList.add("cell");
					col.textContent = matrixB[i][j];
					row.appendChild(col);
				}
				matB.appendChild(row);
			}
		} else {
			matB = document.createElement("table");
			matB.classList.add("matrix");
			for (let i = 0; i < a; i++) {
				let row = document.createElement("tr");
				for (let j = 0; j < b; j++) {
					let col = document.createElement("td");
					col.classList.add("cell");
					col.textContent = scalar;
					row.appendChild(col);
				}
				matB.appendChild(row);
			}
		}

		let matC = document.createElement("table");
		matC.classList.add("matrix");
		for (let i = 0; i < res.length; i++) {
			let row = document.createElement("tr");
			for (let j = 0; j < res[0].length; j++) {
				let col = document.createElement("td");
				col.classList.add("cell");
				col.textContent = res[i][j];
				row.appendChild(col);
			}
			matC.appendChild(row);
		}

		container.appendChild(matA);
		container.appendChild(sign);
		container.appendChild(matB);
		container.appendChild(equals);
		container.appendChild(matC);
	}

	document.getElementById(id).appendChild(container);
}
