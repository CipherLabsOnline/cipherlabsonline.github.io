const railsKeyTextbox = document.getElementById("rails-key-textbox");
const offsetKeyTextbox = document.getElementById("offset-key-textbox");
const plaintextTextArea = document.getElementById("plaintextTextArea");
const ciphertextTextArea = document.getElementById("ciphertextTextArea");
const railFenceVisual = document.getElementById("rail-fence-visual");
let isPlaintextTextAreaBeingUsed = true;
let rowLettersCaptured = [];

function encryptOrDecryptText(text, encrypt) {
    const rails = parseInt(railsKeyTextbox.value);
    const offset = parseInt(offsetKeyTextbox.value);
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
    return railFenceVisual.textContent = visualizeRailFence(plaintextTextArea.value, parseInt(railsKeyTextbox.value), parseInt(offsetKeyTextbox.value)) +
        '\nCiphertext: ' + rowLettersCaptured.join(' ');
}

function initUpdate() {
    encryptOrDecrypt();
    updateRailFenceVisual();
}

function stoperror() {
   return true;
}

plaintextTextArea.addEventListener('input', () => {
    isPlaintextTextAreaBeingUsed = true;
    initUpdate();
});

ciphertextTextArea.addEventListener('input', () => {
    isPlaintextTextAreaBeingUsed = false;
    initUpdate();
});

railsKeyTextbox.addEventListener('change', () => {
    initUpdate();
});

railsKeyTextbox.addEventListener('paste', (e) => {
    e.preventDefault();
});

offsetKeyTextbox.addEventListener('change', () => {
    initUpdate();
});

offsetKeyTextbox.addEventListener('paste', (e) => {
    e.preventDefault();
});


window.addEventListener('DOMContentLoaded', () => {
    initUpdate();
});
