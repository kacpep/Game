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
    console.log(JSON.stringify(data))
    let encryptedDataText = encrypt(JSON.stringify(data),5)
    generateQRCode(encryptedDataText);
});

function generateQRCode(data) {
    const qrCodeText = JSON.stringify(data);
    qrCodeContainer.innerHTML = ''; 
    new QRCode(qrCodeContainer, qrCodeText);
}





function encrypt(inputString, shift) {
    
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
    let alphabet2 = 'abcdefghijklmnopqrstuvwxyz'.split("");
    let numbers = '0123456789'.split("");

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