const form = document.getElementById("qr-form");
const qrCodeContainer = document.getElementById("qr-code");
let numberQuestion = 1;
form.addEventListener("submit", function (event) {
	event.preventDefault();

	const nameLocation = document.getElementById("nameLocation").value;
	const questionName = document.getElementById("questionName").value.trim();
	const Coordinates = document.getElementById("Coordinates").value.trim().split(",");
	const answerA = document.querySelector("#answerA").value;
	const answerB = document.querySelector("#answerB").value;
	const answerC = document.querySelector("#answerC").value;
	const answerD = document.querySelector("#answerD").value;

	const correctAnswer = document.querySelectorAll(".answerCorrect");
	    let answerCorrect = "A";

	correctAnswer.forEach((answer) => {

        console.log(answer.checked)
		if (answer.checked) {
            console.log(answer.id)
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
    console.log(answerCorrect)


	const data = {
		gameId: "gameId",
		number: numberQuestion,
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

	generateQRCode(data);
    numberQuestion++;

});

function generateQRCode(data) {
	const qrCodeText = JSON.stringify(data);
	qrCodeContainer.innerHTML += `<h3>Question number: ${numberQuestion}</h3>`;
	new QRCode(qrCodeContainer, qrCodeText);
}
