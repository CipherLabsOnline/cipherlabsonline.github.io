import { SubstitutionTable } from "../substitution-table.js"
import { AlphabetSelector } from "../alphabet-selector.js"

const plaintextTextArea = document.getElementById("plaintextTextArea");
const ciphertextTextArea = document.getElementById("ciphertextTextArea");
const keyTextbox = document.getElementById("key-textbox");
let isPlaintextTextAreaBeingUsed = true;

function getAlphabetTextboxValue() {
    return AlphabetSelector.alphabetTextbox.value;
}

function encrypt(plaintext, customAlphabet) {
    let ciphertextResult = "";
    let shift = parseInt(keyTextbox.value);
    const outOfIndexPosition = -1;
    for (let i = 0; i < plaintext.length; i++) {
        const character = plaintext[i];
        const characterCurrentIndex = customAlphabet.indexOf(character);
        if (characterCurrentIndex !== outOfIndexPosition) {
            ciphertextResult += customAlphabet[(characterCurrentIndex + shift) % customAlphabet.length];
        } else {
            ciphertextResult += character;
        }
    }
    return ciphertextResult;
}

function decrypt(ciphertext, customAlphabet) {
    let plaintextResult = "";
    let shift = parseInt(keyTextbox.value);
    const outOfIndexPosition = -1;
    for (let i = 0; i < ciphertext.length; i++) {
        const character = plaintext[i];
        const characterCurrentIndex = customAlphabet.indexOf(character);
        if (characterCurrentIndex !== outOfIndexPosition) {
            plaintextResult += customAlphabet[(characterCurrentIndex - shift) % customAlphabet.length];
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
    const shift = parseInt(keyTextbox.value) % orderedAlphabet.length;
    let shiftedAlphabet = orderedAlphabet.slice(shift) + orderedAlphabet.slice(0, shift);
    SubstitutionTable.updateSubstitutionTable(orderedAlphabet, shiftedAlphabet);
}


plaintextTextArea.addEventListener('input', () => {
    isPlaintextTextAreaBeingUsed = true;
    encryptOrDecrypt();
});

ciphertextTextArea.addEventListener('input', () => {
    isPlaintextTextAreaBeingUsed = false;
    encryptOrDecrypt();
});

AlphabetSelector.onAlphabetTextboxInputEvent(encryptOrDecrypt, updateSubstitutionTable);
AlphabetSelector.onCheckboxChangeEvent(encryptOrDecrypt, updateSubstitutionTable, updateAlphabetTextBox);


keyTextbox.addEventListener('input', () => {
    if (keyTextbox.value == "") {
        return;
    } else {
        encryptOrDecrypt();
        updateSubstitutionTable();
    }
})

window.addEventListener('DOMContentLoaded', () => {
    AlphabetSelector.uppercaseCheckbox.checked = true;
    updateAlphabetTextBox();
    updateSubstitutionTable();
});