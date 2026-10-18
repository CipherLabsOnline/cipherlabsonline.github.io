import { AlphabetSelector } from "../alphabet-selector.js"

function vigenere(message, key, alphabet, operation) {
    const keyNumbersArray = [];
    for (let i = 0; i < message.length; i++) {
        const keyLetter = key[i % key.length];
        const keyNumber = alphabet.indexOf(keyLetter);
        keyNumbersArray.push(keyNumber);
    }

    const messageNumbersArray = [];
    for (let i = 0; i < message.length; i++) {
        const currentCharacter = alphabet.indexOf(message[i]);
        messageNumbersArray.push(currentCharacter);
    }

    return applyOperation(messageNumbersArray, keyNumbersArray, operation, alphabet);
}

function porta(message, key, alphabet) {
    const keyNumbers = [];
    for (let i = 0; i < message.length; i++) {
        const keyLetter = key[i % key.length];
        const keyNumber = alphabet.indexOf(keyLetter);
        keyNumbers.push(keyNumber);
    }

    let result = "";
    for (let [index, character] of [...message].entries()) {
        const characterNumber = alphabet.indexOf(character);
        const keyNumber = keyNumbers[index];
        if (characterNumber < 0 || keyNumber < 0) {
            result += character;
            continue;
        }

        const [firstHalf, secondHalf] = divideAlphabet(keyNumber, alphabet);

        if (firstHalf.includes(character)) {
            result += secondHalf[firstHalf.indexOf(character)];
        } else {
            result += firstHalf[secondHalf.indexOf(character)];
        }
    }

    return result;
}

function applyOperation(message /*List of ints*/, key /*List of ints*/, operation /*Callable<<Integer, Integer>>*/, alphabet /*string*/) {
    let result = "";
    for (let [characterIndex, characterNumber] of message.entries()) {
        const keyNumber = key[characterIndex % key.length];
        if (characterNumber >= 0 && keyNumber >= 0) {
            const alphabetNumber = ((operation(characterNumber, keyNumber) % alphabet.length) + alphabet.length) % alphabet.length;
            result += alphabet[alphabetNumber];
        }
    }

    return result;
}

function divideAlphabet(keyIndex, alphabet) {
    const alphabetLength = alphabet.length;
    const alphabetHalfLength = Math.ceil(alphabetLength / 2);
    const firstHalfAlphabet = alphabet.slice(0, alphabetHalfLength);
    const secondHalfAlphabet = alphabet.slice(alphabetHalfLength);
    const halfKeyIndex = Math.floor(keyIndex / 2);
    let shiftedSecondHalfAlphabet = "";
    for (let i = 0; i < secondHalfAlphabet.length; i++) {
        shiftedSecondHalfAlphabet += secondHalfAlphabet[(halfKeyIndex + i) % alphabetHalfLength];
    }

    return [firstHalfAlphabet, shiftedSecondHalfAlphabet];
}

function encrypt(message, key, alphabet, cipher) {
    if (cipher == "vigenere") {
        return vigenere(message, key, alphabet, (charactNumber, keyNumber) => charactNumber + keyNumber);
    } else if (cipher == "porta") {
        return porta(message, key, alphabet);
    } else {
        return vigenere(message, key, alphabet, (charactNumber, keyNumber) => charactNumber + keyNumber);
    }
}

function decrypt(message, key, alphabet, cipher) {
    if (cipher == "vigenere") {
        return vigenere(message, key, alphabet, (charactNumber, keyNumber) => charactNumber - keyNumber);
    } else if (cipher == "porta") {
        return porta(message, key, alphabet);
    } else {
        return vigenere(message, key, alphabet, (charactNumber, keyNumber) => charactNumber - keyNumber);
    }
}

const plaintextTextArea = document.getElementById("plaintextTextArea");
const ciphertextTextArea = document.getElementById("ciphertextTextArea");
const keyTextbox = document.getElementById("key-textbox");
let isPlaintextTextAreaBeingUsed = true;

function encryptOrDecrypt() {
    const key = keyTextbox.value;
    const alphabet = getAlphabetTextboxValue();
    if (document.title.includes("Vigenère")) {
        return isPlaintextTextAreaBeingUsed
            ? ciphertextTextArea.value = encrypt(plaintextTextArea.value, key, alphabet, "vigenere")
            : plaintextTextArea.value = decrypt(ciphertextTextArea.value, key, alphabet, "vigenere");
    } else if (document.title.includes("Porta")) {
        return isPlaintextTextAreaBeingUsed
            ? ciphertextTextArea.value = encrypt(plaintextTextArea.value, key, alphabet, "porta")
            : plaintextTextArea.value = decrypt(ciphertextTextArea.value, key, alphabet, "porta");
    }
}

function getAlphabetTextboxValue() {
    return AlphabetSelector.alphabetTextbox.value;
}

function updateAlphabetTextBox() {
    AlphabetSelector.updateAlphabetTextBox(encryptOrDecrypt);
}

keyTextbox.addEventListener('beforeinput', (e) => {
    if (e.data) {
        for (let i = 0; i < e.data.length; i++) {
            if (!getAlphabetTextboxValue().includes(e.data[i])) {
                e.preventDefault();
                return;
            }
        }
    }
});

keyTextbox.addEventListener('input', () => {
    encryptOrDecrypt();
})

plaintextTextArea.addEventListener('input', () => {
    isPlaintextTextAreaBeingUsed = true;
    encryptOrDecrypt();
});

ciphertextTextArea.addEventListener('input', () => {
    isPlaintextTextAreaBeingUsed = false;
    encryptOrDecrypt();
});

AlphabetSelector.onCustomCheckBoxEvent(encryptOrDecrypt, () => { });
AlphabetSelector.onCheckboxChangeEvent(encryptOrDecrypt, () => { }, updateAlphabetTextBox);
AlphabetSelector.onEmptyAlphabetTextboxEvent(updateAlphabetTextBox, () => { });

window.addEventListener('DOMContentLoaded', () => {
    AlphabetSelector.uppercaseCheckbox.checked = true;
    updateAlphabetTextBox();
});




