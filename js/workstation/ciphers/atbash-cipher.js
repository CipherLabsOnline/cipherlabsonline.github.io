import { AlphabetTable } from '../alphabet-table.js';
import { AlphabetSelector } from '../alphabet-selector.js';

const plaintextTextArea = document.getElementById("plaintextTextArea");
const ciphertextTextArea = document.getElementById("ciphertextTextArea");

let isPlaintextTextAreaBeingUsed = true;

function getAlphabetTextboxValue() {
    return AlphabetSelector.alphabetTextbox.value;
}

function encryptOrDecrypt() {
    const alphabet = getAlphabetTextboxValue();
    return isPlaintextTextAreaBeingUsed ? ciphertextTextArea.value = encrypt(plaintextTextArea.value, alphabet) : plaintextTextArea.value = AtbashCipher.encrypt(ciphertextTextArea.value, alphabet);
}

function encrypt(plaintext, customAlphabet) {
    const reversedAlphabet = customAlphabet.split('').reverse().join('');
    const outOfIndexPosition = -1;
    let result = "";
    for (let i = 0; i < plaintext.length; i++) {
        const character = plaintext[i];
        const characterCurrentIndex = customAlphabet.indexOf(character);
        if (characterCurrentIndex !== outOfIndexPosition) {
            result += reversedAlphabet[characterCurrentIndex];
        } else {
            result += character;
        }
    }

    return result;
}

function decrypt(ciphertext, customAlphabet) {
    return this.encrypt(ciphertext, customAlphabet.split('').reverse().join(''));
}

function updateAlphabetTextBox() {
    AlphabetSelector.updateAlphabetTextBox(encryptOrDecrypt, updateAlphabetTable);
}

function updateAlphabetTable() {
    let orderedAlphabet = AlphabetSelector.alphabetTextbox.value;
    let reversedAlphabet = orderedAlphabet.split('').reverse().join('');
    AlphabetTable.updateAlphabetTable(orderedAlphabet, reversedAlphabet);
}

plaintextTextArea.addEventListener('input', () => {
    isPlaintextTextAreaBeingUsed = true;
    encryptOrDecrypt();
});

ciphertextTextArea.addEventListener('input', () => {
    isPlaintextTextAreaBeingUsed = false;
    encryptOrDecrypt();
});

AlphabetSelector.onAlphabetTextboxInputEvent(encryptOrDecrypt, updateAlphabetTable);
AlphabetSelector.onCheckboxChangeEvent(encryptOrDecrypt, updateAlphabetTable, updateAlphabetTextBox);

window.addEventListener('DOMContentLoaded', () => {
    AlphabetSelector.uppercaseCheckbox.checked = true;
    updateAlphabetTextBox();
    updateAlphabetTable();
});





