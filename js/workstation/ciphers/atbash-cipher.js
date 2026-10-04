import { SubstitutionTable } from '../substitution-table.js';
import { AlphabetSelector } from '../alphabet-selector.js';

const plaintextTextArea = document.getElementById("plaintextTextArea");
const ciphertextTextArea = document.getElementById("ciphertextTextArea");

let isPlaintextTextAreaBeingUsed = true;

function getAlphabetTextboxValue() {
    return AlphabetSelector.alphabetTextbox.value;
}

function encryptOrDecrypt() {
    const alphabet = getAlphabetTextboxValue();
    return isPlaintextTextAreaBeingUsed ? ciphertextTextArea.value = encrypt(plaintextTextArea.value, alphabet) : plaintextTextArea.value = decrypt(ciphertextTextArea.value, alphabet);
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
    return encrypt(ciphertext, customAlphabet.split('').reverse().join(''));
}

function updateAlphabetTextBox() {
    AlphabetSelector.updateAlphabetTextBox(encryptOrDecrypt, updateSubstitutionTable);
}

function updateSubstitutionTable() {
    let orderedAlphabet = AlphabetSelector.alphabetTextbox.value;
    let reversedAlphabet = orderedAlphabet.split('').reverse().join('');
    SubstitutionTable.updateSubstitutionTable(orderedAlphabet, reversedAlphabet);
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
AlphabetSelector.onEmptyAlphabetTextboxEvent(updateAlphabetTextBox, updateSubstitutionTable);

window.addEventListener('DOMContentLoaded', () => {
    AlphabetSelector.uppercaseCheckbox.checked = true;
    updateAlphabetTextBox();
    updateSubstitutionTable();
});





