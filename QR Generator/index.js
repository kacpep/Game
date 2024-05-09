const form = document.getElementById("qr-form-initial");
const qrCodeContainerInitail = document.getElementById("qr-code-initial");

const formQuestion = document.getElementById("qr-form-question");
const qrCodeContainer = document.getElementById("qr-code-question");

let numberQuestion = 1;
let currentQuestion = 1;

let gameId = "";

form.addEventListener("submit", function (event) {
	event.preventDefault();

	const gameName = document.getElementById("gameName").value.trim();
	const NumberOfQuestions = document.getElementById("NumberOfQuestions").value.trim();
	const FirstLocationName = document.getElementById("FirstLocationName").value.trim();
	const Coordinates = document.getElementById("Coordinates").value.trim().split(",");

	function generateUUID() {
		return "xxxxxx".replace(/[xy]/g, function (c) {
			var r = (Math.random() * 16) | 0,
				v = c == "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}

	if (gameName === "" || NumberOfQuestions === "" || FirstLocationName === "" || Coordinates === "") {
		alert("Fill in all fields!!");
		return;
	}
	if (!confirm("If you have any questions generated now, they will be deleted!!!")) {
		return;
	}
	gameId = generateUUID();

	numberQuestion = NumberOfQuestions;

	const data = {
		gameId: gameId,
		gameName: gameName,
		NumberOfQuestions: NumberOfQuestions,
		name: FirstLocationName,
		lat: Coordinates[0],
		lng: Coordinates[1],
	}; 
	let encryptedDataText = encrypt(JSON.stringify(data), 5).toString();
    
	generateQRCodeInitial(encryptedDataText);
});

function generateQRCodeInitial(data) {
	const qrCodeText = data;

	qrCodeContainerInitail.innerHTML = "";
	new QRCode(qrCodeContainerInitail, qrCodeText);
	qrCodeContainer.innerHTML = "";
	numberQuestion++;
}

formQuestion.addEventListener("submit", function (event) {
	event.preventDefault();

	if (numberQuestion == currentQuestion) {
		alert("In initail is no more questions!");
		return;
	}

	const nameLocation = document.getElementById("nameLocation").value;
	const questionName = document.getElementById("questionName").value.trim();
	const Coordinates = document.getElementById("Coordinates-question").value.trim().split(",");
	const answerA = document.querySelector("#answerA").value;
	const answerB = document.querySelector("#answerB").value;
	const answerC = document.querySelector("#answerC").value;
	const answerD = document.querySelector("#answerD").value;

	const correctAnswer = document.querySelectorAll(".answerCorrect");
	let answerCorrect = "A";

	if (nameLocation == "" || questionName == "" || Coordinates == "" || answerA == "" || answerB == "" || answerC == "" || answerD == "") {
		alert("Fill in all fields!!");
		return;
	}

	correctAnswer.forEach((answer) => {
		if (answer.checked) {
			console.log(answer.id);
			switch (answer.id) {
				case "correctA":
					answerCorrect = "A";
					break;
				case "correctB":
					answerCorrect = "B";
					break;
				case "correctC":
					answerCorrect = "C";
					break;
				case "correctD":
					answerCorrect = "D";
					break;
			}
		}
	});

	const data = {
		gameId: gameId,
		number: currentQuestion,
		name: nameLocation,
		question: questionName,
		answers: {
			a: answerA,
			b: answerB,
			c: answerC,
			d: answerD,
		},
		correct_answer: answerCorrect,
		lat: Coordinates[0],
		lng: Coordinates[1],
	};
	let encryptedDataText = encrypt(JSON.stringify(data), 5);
    
	generateQRCode(encryptedDataText);
	currentQuestion++;

});

function generateQRCode(data) {
	const qrCodeText = data;
    console.log(data)
	// qrCodeContainer.innerHTML += `<h3>Question number: ${currentQuestion}</h3>`;
	new QRCode(qrCodeContainer, qrCodeText);
}
document.querySelector("#printButton").addEventListener("click", () => {
	form.classList.add("hidden");
	formQuestion.classList.add("hidden");
    print()
    
});

document.querySelector("#viewButton").addEventListener("click", () => {
	form.classList.remove("hidden");
	formQuestion.classList.remove("hidden");
});


function encrypt(inputString, shift) {
	let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	let alphabet2 = "abcdefghijklmnopqrstuvwxyz".split("");
	let numbers = "0123456789".split("");

	function shiftChar(char, shiftAmount, arr) {
		let index = arr.indexOf(char);
		if (index !== -1) {
			let newIndex = (index + shiftAmount) % arr.length;
			if (newIndex < 0) newIndex += arr.length;
			return arr[newIndex];
		}
		return char;
	}

	let result = "";
	for (let i = 0; i < inputString.length; i++) {
		let char = inputString[i];
		if (alphabet.includes(char)) {
			result += shiftChar(char, shift, alphabet);
		} else if (alphabet2.includes(char)) {
			result += shiftChar(char, shift, alphabet2);
		} else if (numbers.includes(char)) {
			result += shiftChar(char, shift, numbers);
		} else {
			result += char;
		}
	}
	return result;
}