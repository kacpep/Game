const form = document.getElementById("qr-form");
const qrCodeContainer = document.getElementById("qr-code");

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

	// if (question === '' || location === '') {
	//     alert('Proszę wypełnić wszystkie pola!');
	//     return;
	// }

	const data = {
		gameId: "gameId",
		name: nameLocation,
		question: questionName,
		answers: {
			a: answerA,
			b: answerB,
			c: answerC,
			d: answerD,
		},
		correct_answer: answerCorrect,
		Coordinates: Coordinates,
	};

	generateQRCode(data);
});

function generateQRCode(data) {
	const qrCodeText = JSON.stringify(data);
	qrCodeContainer.innerHTML = "";
	new QRCode(qrCodeContainer, qrCodeText);
}
