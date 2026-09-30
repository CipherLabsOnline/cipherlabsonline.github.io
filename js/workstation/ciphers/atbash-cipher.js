import { Alphabets } from '../../alphabets.js';
import { AlphabetTable } from '../alphabet-table.js';

const plaintextTextArea = document.getElementById("plaintextTextArea");
const ciphertextTextArea = document.getElementById("ciphertextTextArea");
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const digitsCheckbox = document.getElementById('digits');
const punctuationMarksCheckbox = document.getElementById('punctuation-marks');
const customCheckbox = document.getElementById('custom');
const alphabetTextbox = document.getElementById('alphabet-textbox');
const CHAR_DICTIONARY = {
    uppercase: Alphabets.ALPHABET,
    lowercase: Alphabets.ALPHABET.toLowerCase(),
    digits: "0123456789",
    punctuation_marks: ".,:;!?()"
};

const checkboxArray = [uppercaseCheckbox, lowercaseCheckbox, digitsCheckbox, punctuationMarksCheckbox];

let isPlaintextTextAreaBeingUsed = true;

function getAlphabetTextboxValue() {
    return alphabetTextbox.value;
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
    if (customCheckbox.checked) {
        for (let i = 0; i < checkboxArray.length; i++) {
            const checkbox = checkboxArray[i];
            checkbox.checked = false;
        }

        alphabetTextbox.readOnly = false;
        return;
    }

    const checkboxes = [
        { element: uppercaseCheckbox, value: CHAR_DICTIONARY.uppercase },
        { element: lowercaseCheckbox, value: CHAR_DICTIONARY.lowercase },
        { element: digitsCheckbox, value: CHAR_DICTIONARY.digits },
        { element: punctuationMarksCheckbox, value: CHAR_DICTIONARY.punctuation_marks }
    ];

    alphabetTextbox.readOnly = true;
    const selectedCharacters = checkboxes
        .filter(item => item.element.checked)
        .map(item => item.value)
        .join('');
    alphabetTextbox.value = selectedCharacters;
    encryptOrDecrypt();
    updateAlphabetTable();
}

function updateAlphabetTable() {
    let orderedAlphabet = alphabetTextbox.value;
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

alphabetTextbox.addEventListener('input', () => {
    if (customCheckbox.checked) {
        encryptOrDecrypt();
        updateAlphabetTable();
    }
});

customCheckbox.addEventListener('change', () => {
    if (customCheckbox.checked) {
        checkboxArray.forEach(checkbox => checkbox.checked = false);
        alphabetTextbox.readOnly = false;
        alphabetTextbox.focus();
        updateAlphabetTable();
        encryptOrDecrypt();
    } else {
        updateAlphabetTextBox();
    }
});

checkboxArray.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            customCheckbox.checked = false;
        }

        updateAlphabetTextBox();
        updateAlphabetTable();
    });
});

window.addEventListener('DOMContentLoaded', () => {
    uppercaseCheckbox.checked = true;
    updateAlphabetTextBox();
    updateAlphabetTable();
});





