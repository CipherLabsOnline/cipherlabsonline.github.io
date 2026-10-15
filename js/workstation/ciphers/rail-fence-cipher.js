const railsKeySelection = document.getElementById("rails-key-selection");
const offsetKeySelection = document.getElementById("offset-key-selection");
const plaintextTextArea = document.getElementById("plaintextTextArea");
const ciphertextTextArea = document.getElementById("ciphertextTextArea");
const railFenceVisual = document.getElementById("rail-fence-visual");
let isPlaintextTextAreaBeingUsed = true;
let rowLettersCaptured = [];

function encryptOrDecryptText(text, encrypt) {
    const rails = parseInt(railsKeySelection.value);
    const offset = parseInt(offsetKeySelection.value);
    const cycle = rails * 2 - 2;
    let x, y;
    if (encrypt) {
        const length = text.length;
        const railCharacters = Array.from({ length: rails }, () => []);
        for (let y = 0; y < rails; y++) {
            railCharacters[y] = [];
        }

        for (x = 0; x < length; x++) {
            y = rails - 1 - Math.abs(cycle / 2 - (x + offset) % cycle);
            railCharacters[y].push(text[x]);
        }

        return railCharacters.flat().join('');
    } else {
        const length = text.length;
        const result = new Array(length);
        let j = 0;
        for (y = 0; y < rails; y++) {
            for (x = 0; x < length; x++) {
                if ((y + x + offset) % cycle === 0 || (y - x - offset) % cycle === 0) {
                    result[x] = text[j++];
                }
            }
        }

        return result.join('');
    }
}

function encrypt(plaintext) {
    return encryptOrDecryptText(plaintext, true);
}

function decrypt(ciphertext) {
    return encryptOrDecryptText(ciphertext, false);
}

function encryptOrDecrypt() {
    return isPlaintextTextAreaBeingUsed ? ciphertextTextArea.value = encrypt(plaintextTextArea.value) : plaintextTextArea.value = decrypt(ciphertextTextArea.value);
}

function visualizeRailFence(text, rails, offset) {
    rowLettersCaptured = [];
    const cycle = rails * 2 - 2;
    const length = text.length;
    const visualGrid = Array.from({ length: rails }, () => Array(length).fill('-'));

    for (let x = 0; x < length; x++) {
        const y = rails - 1 - Math.abs(cycle / 2 - (x + offset) % cycle);
        visualGrid[y][x] = text[x];
    }

    return visualGrid.map(row => {
        const rowChars = row.filter(char => char !== '-');
        rowLettersCaptured.push(rowChars.join(''));
        return `${row.join('')} ${rowChars.join('')}`;
    }).join('\n');
}

function updateRailFenceVisual() {
    return railFenceVisual.textContent = visualizeRailFence(plaintextTextArea.value, parseInt(railsKeySelection.value), parseInt(offsetKeySelection.value)) +
        '\nCiphertext: ' + rowLettersCaptured.join(' ');
}

function initUpdate() {
    encryptOrDecrypt();
    updateRailFenceVisual();
}

plaintextTextArea.addEventListener('input', () => {
    isPlaintextTextAreaBeingUsed = true;
    initUpdate();
});

ciphertextTextArea.addEventListener('input', () => {
    isPlaintextTextAreaBeingUsed = false;
    initUpdate();
});

railsKeySelection.addEventListener('change', (event) => {
    initUpdate();
});

offsetKeySelection.addEventListener('change', (event) => {
    initUpdate();
});



window.addEventListener('DOMContentLoaded', () => {
    initUpdate();
});
