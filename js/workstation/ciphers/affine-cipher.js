import { Alphabets } from '../../alphabets.js';
import { MathUtils } from '../../math-utils.js';
import { AlphabetSelector } from '../alphabet-selector.js';
import { SubstitutionTable } from '../substitution-table.js';

const plaintextTextArea = document.getElementById("plaintextTextArea");
const ciphertextTextArea = document.getElementById("ciphertextTextArea");
const keyATextbox = document.getElementById("key-a-textbox");
const keyBTextbox = document.getElementById("key-b-textbox");
let isPlaintextTextAreaBeingUsed = true;

function getAlphabetTextboxValue() {
    return AlphabetSelector.alphabetTextbox.value;
}


function encrypt(plaintext, customAlphabet) {
    let ciphertextResult = "";
    let a = parseInt(keyATextbox.value);
    let b = parseInt(keyBTextbox.value);
    const outOfIndexPosition = -1;
    for (let i = 0; i < plaintext.length; i++) {
        const character = plaintext[i];
        const characterCurrentIndex = customAlphabet.indexOf(character);
        if (characterCurrentIndex !== outOfIndexPosition) {
            const encryptedCharacterIndex = (a * characterCurrentIndex + b) % customAlphabet.length;
            ciphertextResult += customAlphabet[encryptedCharacterIndex];
        } else {
            ciphertextResult += character;
        }
    }

    return ciphertextResult;
}


function decrypt(ciphertext, customAlphabet) {
    let plaintextResult = "";
    let a = parseInt(keyATextbox.value);
    let b = parseInt(keyBTextbox.value);
    const outOfIndexPosition = -1;
    const alphabetLength = customAlphabet.length;
    let aInverse = -1;
    let flag = 0;
    for (let i = 0; i < alphabetLength; i++) {
        flag = (a * i) % alphabetLength;
        if (flag == 1) {
            aInverse = i;
            break;
        }
    }

    if (aInverse === -1) {
        return ciphertext;
    }

    for (let i = 0; i < ciphertext.length; i++) {
        const character = ciphertext[i];
        const characterCurrentIndex = customAlphabet.indexOf(character);
        if (characterCurrentIndex !== outOfIndexPosition) {
            let decryptedCharacterIndex = (aInverse * (characterCurrentIndex - b)) % alphabetLength;
            plaintextResult += customAlphabet[decryptedCharacterIndex < 0 ? decryptedCharacterIndex + alphabetLength : decryptedCharacterIndex];
        } else {
            plaintextResult += character;
        }
    }

    return plaintextResult;
}

function encryptOrDecrypt() {
    const alphabet = getAlphabetTextboxValue();
    return isPlaintextTextAreaBeingUsed ? ciphertextTextArea.value = encrypt(plaintextTextArea.value, alphabet) : plaintextTextArea.value = decrypt(ciphertextTextArea.value, alphabet);
}

function updateAlphabetTextBox() {
    AlphabetSelector.updateAlphabetTextBox(encryptOrDecrypt, updateSubstitutionTable);
}

function updateSubstitutionTable() {
    let orderedAlphabet = AlphabetSelector.alphabetTextbox.value;
    let shiftedAlphabet = "";
    for (let i = 0; i < orderedAlphabet.length; i++) {
        let totalShift = (parseInt(keyATextbox.value) * i + parseInt(keyBTextbox.value)) % orderedAlphabet.length;
        shiftedAlphabet += orderedAlphabet[totalShift < 0 ? totalShift + orderedAlphabet.length : totalShift];
    }

    SubstitutionTable.updateSubstitutionTable(orderedAlphabet, shiftedAlphabet);
}

function validateKeyB(alphabetLength) {
    let keyBValue = +keyBTextbox.value;

    if (keyBValue > alphabetLength) {
        keyBValue = alphabetLength;
        keyBTextbox.value = keyBValue;
    }

    lastValidKeyB = keyBValue;
    return keyBValue;
}

function validateKeyA(alphabetLength) {
    let keyAValue = +keyATextbox.value;

    while (MathUtils.gcd(keyAValue, alphabetLength) !== 1) {
        keyAValue++;
    }

    keyATextbox.value = keyAValue;
    lastValidKeyA = keyAValue;
    return keyAValue;
}


plaintextTextArea.addEventListener('input', () => {
    isPlaintextTextAreaBeingUsed = true;
    encryptOrDecrypt();
});

ciphertextTextArea.addEventListener('input', () => {
    isPlaintextTextAreaBeingUsed = false;
    encryptOrDecrypt();
});

AlphabetSelector.onCustomCheckBoxEvent(encryptOrDecrypt, updateSubstitutionTable);
AlphabetSelector.onCheckboxChangeEvent(encryptOrDecrypt, updateSubstitutionTable, updateAlphabetTextBox);

window.addEventListener('DOMContentLoaded', () => {
    AlphabetSelector.uppercaseCheckbox.checked = true;
    updateAlphabetTextBox();
    updateSubstitutionTable();
});


let keyTextboxArray = [keyATextbox, keyBTextbox];

let lastValidKeyA = keyATextbox.value;
let lastValidKeyB = keyBTextbox.value;

AlphabetSelector.checkboxArray.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        let currentText = AlphabetSelector.alphabetTextbox.value;
        let alphabetLength = currentText.length;
        validateKeyB(alphabetLength);
        validateKeyA(alphabetLength)
    })
})

AlphabetSelector.alphabetTextbox.addEventListener('input', (e) => {
    let alphabetLength =  AlphabetSelector.applyDefaultAlphabetSelection(updateAlphabetTextBox, updateSubstitutionTable);
    validateKeyB(alphabetLength);
    validateKeyA(alphabetLength)
});


keyTextboxArray.forEach(keyTextbox => {
    keyTextbox.addEventListener('input', (e) => {
        if (keyATextbox.value == '' || keyBTextbox.value == '') {
            return;
        }

        const alphabetLength = getAlphabetTextboxValue().length;

        const b = parseInt(keyBTextbox.value);
        if (b > alphabetLength) {
            alert("The value of Key B must be less than your alphabet length");
            e.preventDefault();
            keyBTextbox.value = lastValidKeyB;
        }

        const a = parseInt(keyATextbox.value);
        if (!MathUtils.isCoprime(a, alphabetLength)) {
            alert("The value of Key A must be coprime to the length of the custom alphabet!");
            e.preventDefault();
            keyATextbox.value = lastValidKeyA;
            return;
        }
        lastValidKeyB = keyBTextbox.value;
        lastValidKeyA = keyATextbox.value;
        encryptOrDecrypt();
        updateSubstitutionTable();
    });
});