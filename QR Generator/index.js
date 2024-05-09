const form = document.getElementById('qr-form');
const qrCodeContainer = document.getElementById('qr-code');



form.addEventListener('submit', function(event) {
    event.preventDefault();

    const gameName = document.getElementById('gameName').value.trim();
    const NumberOfQuestions = document.getElementById('NumberOfQuestions').value.trim();
    const FirstLocationName = document.getElementById('FirstLocationName').value.trim();
    const Coordinates = document.getElementById('Coordinates').value.trim().split(",");

    function generateUUID() {
        return 'xxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const gameId = generateUUID()
    
    

    if (gameName === '' || NumberOfQuestions === ''|| FirstLocationName === ''|| Coordinates === '') {
        alert('Proszę wypełnić wszystkie pola!');
        return;
    }

    const data = {
        gameId: gameId,
        gameName: gameName,
        NumberOfQuestions: NumberOfQuestions,
        FirstLocationName:FirstLocationName,
        lat:Coordinates[0],
        lng:Coordinates[1]
    };

    generateQRCode(data);
});

function generateQRCode(data) {
    const qrCodeText = JSON.stringify(data);
    qrCodeContainer.innerHTML = ''; 
    new QRCode(qrCodeContainer, qrCodeText);
}



let generateButton = document.querySelector("generatePDF")

