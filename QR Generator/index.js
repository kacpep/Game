const form = document.getElementById("qr-form-initial");
const qrCodeContainerInitail = document.getElementById("qr-code-initial");

const formQuestion = document.getElementById("qr-form-question");
const qrCodeContainer = document.getElementById("qr-code-question");
const boxes = document.querySelector(".boxes")
const quest_box = document.querySelector(".box-question")
let numberQuestion = 1;
let currentQuestion = 1;

let gameId = "";

var questions = []

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
	
	gameId = generateUUID();

	numberQuestion = NumberOfQuestions;

	const data = {
		gameId: gameId,
		gameName: gameName,
		numberOfQuestions: NumberOfQuestions ,
		name: FirstLocationName,
		lat: Coordinates[0],
		lng: Coordinates[1],
	}; 

	
	questions.forEach(element => {
		element.gameId = data.gameId
		
	});
	displayQuestionQrs()
	console.log(questions)
	
	let encryptedDataText = encrypt(JSON.stringify(data), 5).toString();
    console.log(encryptedDataText)
	generateQRCodeInitial(encryptedDataText);
});

function generateQRCodeInitial(data) {
	const qrCodeText = data;

	qrCodeContainerInitail.removeAttribute("src")
	qrCodeContainerInitail.setAttribute("src",`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qrCodeText}`)
	

	

	
	numberQuestion++;
}
function displayQuestionQrs(){
	qrCodeContainer.innerHTML =""
	questions.forEach(element => {
		let encryptedData = encrypt(JSON.stringify(element), 5);
		let div = document.createElement("div")
		div.classList.add(`numb${element.number}`)
		
		let num = document.createElement("p")
		num.textContent = element.number
		
		
		generateQRCode(encryptedData,div)
		div.append(num)
		qrCodeContainer.append(div)
	});
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
					answerCorrect = "a";
					break;
				case "correctB":
					answerCorrect = "b";
					break;
				case "correctC":
					answerCorrect = "c";
					break;
				case "correctD":
					answerCorrect = "d";
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
	
	questions.push(data)
	displayQuestionQrs();
	
    
	
	currentQuestion++;

});



function generateQRCode(data, numb) {
	
    console.log(data)
	// qrCodeContainer.innerHTML += `<h3>Question number: ${currentQuestion}</h3>`;
	
	var img = document.createElement("img")
	img.removeAttribute("src")
	
	img.setAttribute("src",`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${data}`)
	
	numb.appendChild(img)
}
document.querySelector("#printButton").addEventListener("click", () => {
	form.classList.add("hidden");
	formQuestion.classList.add("hidden");
	boxes.classList.add("print-mode")
	quest_box.classList.add("box-question-enabled")
    print()
    
});

document.querySelector("#viewButton").addEventListener("click", () => {
	form.classList.remove("hidden");
	formQuestion.classList.remove("hidden");
	boxes.classList.remove("print-mode")
	quest_box.classList.remove("box-question-enabled")
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