

// Early
const earlyBaconCodeEncryptionDictionary = {
    "A": "AAAAA", "B": "AAAAB", "C": "AAABA", "D": "AAABB",
    "E": "AABAA", "F": "AABAB", "G": "AABBA", "H": "AABBB",
    "I": "ABAAA", "J": "ABAAA", "K": "ABAAB", "L": "ABABA",
    "M": "ABABB", "N": "ABBAA", "O": "ABBAB", "P": "ABBBA",
    "Q": "ABBBB", "R": "BAAAA", "S": "BAAAB", "T": "BAABA",
    "U": "BAABB", "V": "BAABB", "W": "BABAA", "X": "BABAB",
    "Y": "BABBA", "Z": "BABBB"
};

const earlyBaconCodeDecryptionDictionary = {
    "AAAAA": "A", "AAAAB": "B", "AAABA": "C", "AAABB": "D",
    "AABAA": "E", "AABAB": "F", "AABBA": "G", "AABBB": "H",
    "ABAAA": "I", "ABAAB": "K", "ABABA": "L", "ABABB": "M",
    "ABBAA": "N", "ABBAB": "O", "ABBBA": "P", "ABBBB": "Q",
    "BAAAA": "R", "BAAAB": "S", "BAABA": "T", "BAABB": "U",
    "BABAA": "W", "BABAB": "X", "BABBA": "Y", "BABBB": "Z"
};

const earlyBaconBinaryEncryptionDictionary = {
    "A": "00000", "B": "00001", "C": "00010", "D": "00011",
    "E": "00100", "F": "00101", "G": "00110", "H": "00111",
    "I": "01000", "J": "01000", "K": "01001", "L": "01010",
    "M": "01011", "N": "01100", "O": "01101", "P": "01110",
    "Q": "01111", "R": "10000", "S": "10001", "T": "10010",
    "U": "10011", "V": "10011", "W": "10100", "X": "10101",
    "Y": "10110", "Z": "10111"
};

const earlyBaconBinaryDecryptionDictionary = {
    "00000": "A", "00001": "B", "00010": "C", "00011": "D",
    "00100": "E", "00101": "F", "00110": "G", "00111": "H",
    "01000": "I", "01001": "K", "01010": "L", "01011": "M",
    "01100": "N", "01101": "O", "01110": "P", "01111": "Q",
    "10000": "R", "10001": "S", "10010": "T", "10011": "U",
    "10100": "W", "10101": "X", "10110": "Y", "10111": "Z"
};

// Modern 

const modernBaconCodeEncryptionDictionary = {
    "A": "AAAAA", "B": "AAAAB", "C": "AAABA", "D": "AAABB",
    "E": "AABAA", "F": "AABAB", "G": "AABBA", "H": "AABBB",
    "I": "ABAAA", "J": "ABAAB", "K": "ABABA", "L": "ABABB",
    "M": "ABBAA", "N": "ABBAB", "O": "ABBBA", "P": "ABBBB",
    "Q": "BAAAA", "R": "BAAAB", "S": "BAABA", "T": "BAABB",
    "U": "BABAA", "V": "BABAB", "W": "BABBA", "X": "BABBB",
    "Y": "BBAAA", "Z": "BBAAB"
};

const modernBaconCodeDecryptionDictionary = {
    "AAAAA": "A", "AAAAB": "B", "AAABA": "C", "AAABB": "D",
    "AABAA": "E", "AABAB": "F", "AABBA": "G", "AABBB": "H",
    "ABAAA": "I", "ABAAB": "J", "ABABA": "K", "ABABB": "L",
    "ABBAA": "M", "ABBAB": "N", "ABBBA": "O", "ABBBB": "P",
    "BAAAA": "Q", "BAAAB": "R", "BAABA": "S", "BAABB": "T",
    "BABAA": "U", "BABAB": "V", "BABBA": "W", "BABBB": "X",
    "BBAAA": "Y", "BBAAB": "Z"
};

const modernBaconBinaryEncryptionDictionary = {
    "A": "00000", "B": "00001", "C": "00010", "D": "00011",
    "E": "00100", "F": "00101", "G": "00110", "H": "00111",
    "I": "01000", "J": "01001", "K": "01010", "L": "01011",
    "M": "01100", "N": "01101", "O": "01110", "P": "01111",
    "Q": "10000", "R": "10001", "S": "10010", "T": "10011",
    "U": "10100", "V": "10101", "W": "10110", "X": "10111",
    "Y": "11000", "Z": "11001"
};

const modernBaconBinaryDecryptionDictionary = {
    "00000": "A", "00001": "B", "00010": "C", "00011": "D",
    "00100": "E", "00101": "F", "00110": "G", "00111": "H",
    "01000": "I", "01001": "J", "01010": "K", "01011": "L",
    "01100": "M", "01101": "N", "01110": "O", "01111": "P",
    "10000": "Q", "10001": "R", "10010": "S", "10011": "T",
    "10100": "U", "10101": "V", "10110": "W", "10111": "X",
    "11000": "Y", "11001": "Z"
};

function encrypt(plaintext, useBinary, useEarly) {
    plaintext = plaintext.toUpperCase().replace("/[^A-Z]/g", "")
    let cipherText = "";
    const encryptionDictionary = getAppropriateEncryptionDictionary(useBinary, useEarly);
    for (let i = 0; i < plaintext.length; i++) {
        const character = plaintext.charAt(i);
        cipherText += (encryptionDictionary[character] || "") + " ";
    }

    return cipherText;
}

function decrypt(ciphertext, useBinary, useEarly) {
    ciphertext = ciphertext.toUpperCase();
    if (useBinary) {
        ciphertext = ciphertext.replaceAll(/[^01]/g, "");
    } else {
        ciphertext = ciphertext.replaceAll(/[^AB]/g, "");
    }

    let plaintext = "";
    const decryptionDictionary = getAppropriateDecryptionDictionary(useBinary, useEarly);

    for (let i = 0; i < ciphertext.length; i += 5) {
        if (i + 5 > ciphertext.length) {
            break;
        }

        const encodedText = ciphertext.substring(i, i + 5);
        const decodedChar = decryptionDictionary[encodedText];

        if (decodedChar) {
            plaintext += decodedChar;
        }
    }

    return plaintext.trimEnd();
}

function getAppropriateEncryptionDictionary(useBinary, useEarly) {
    return useBinary
        ? (useEarly ? earlyBaconBinaryEncryptionDictionary : modernBaconBinaryEncryptionDictionary)
        : (useEarly ? earlyBaconCodeEncryptionDictionary : modernBaconCodeEncryptionDictionary);
}

function getAppropriateDecryptionDictionary(useBinary, useEarly) {
    return useBinary
        ? (useEarly ? earlyBaconBinaryDecryptionDictionary : modernBaconBinaryDecryptionDictionary)
        : (useEarly ? earlyBaconCodeDecryptionDictionary : modernBaconCodeDecryptionDictionary);
}

const plaintextTextArea = document.getElementById("plaintextTextArea");
const encodedTextArea = document.getElementById("encodedTextArea");
const encodingEra = document.getElementById("era");
const encodingType = document.getElementById("encodingType");

let wasLastSourcePlaintext = true;
update();
function update() {
    const useEarly = encodingEra.value === "early";
    const useBinary = encodingType.value === "binary";
    if (wasLastSourcePlaintext === true) {
        const currentText = plaintextTextArea.value;
        encodedTextArea.value = encrypt(currentText, useBinary, useEarly);
    } else {
        const currentText = encodedTextArea.value;
        plaintextTextArea.value = decrypt(currentText, useBinary, useEarly);
    }
    const tableBody = document.querySelector("#encoding-table tbody");
    tableBody.textContent = '';
    for (const [key, value] of Object.entries(getAppropriateEncryptionDictionary(useBinary, useEarly))) {
        const row = document.createElement('tr');
        const keyCell = document.createElement('td');
        const valueCell = document.createElement('td');
        keyCell.textContent = key;
        valueCell.textContent = value;
        row.appendChild(keyCell);
        row.appendChild(valueCell);
        tableBody.appendChild(row);
    }
    checkForInvalidCharacters(useBinary);
}

function checkForInvalidCharacters(useBinary) {
    const hasPlainTextError = /[^a-zA-Z\s]/.test(plaintextTextArea.value);
    plaintextTextArea.setCustomValidity(hasPlainTextError ? "Warning: Plaintext contains non-alphabetical characters." : "");
    const invalidPattern = useBinary ? /[^01\s]/ : /[^abAB\s]/;
    const hasEncodedError = invalidPattern.test(encodedTextArea.value);
    const expectedChars = useBinary ? "0s and 1s" : "As and Bs";
    encodedTextArea.setCustomValidity(hasEncodedError ? `Warning: Encoded text contains characters other than ${expectedChars}.` : "");
    plaintextTextArea.reportValidity();
    encodedTextArea.reportValidity();
}

plaintextTextArea.addEventListener('input', () => {
    wasLastSourcePlaintext = true;
    update();
});

encodedTextArea.addEventListener('input', () => {
    wasLastSourcePlaintext = false;
    update();
});

encodingEra.addEventListener('change', update);
encodingType.addEventListener('change', update);