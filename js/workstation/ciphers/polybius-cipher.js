const plaintextTextArea = document.getElementById("plaintextTextArea");
const ciphertextTextArea = document.getElementById("ciphertextTextArea");
let isPlaintextTextAreaBeingUsed = true;
const gridSizeSelect = document.getElementById("grid-size");
const alphabetInput = document.getElementById("alphabet-textbox");
const grid = document.getElementById("polybius-grid");
const coordinateOrderSelection = document.getElementById("coordinate-order");
const allowedCharacters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];
const DEFAULT_GRID_SIZES = {
  "5x5": "ABCDEFGHIKLMNOPQRSTUVWXYZ",
  "6x6": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
};

let polybiusSquare = [];

function encryptorDecrypt(encrypt) {
  const size = gridSizeSelect.value === "5x5" ? 5 : 6;
  let result = "";
  if (encrypt) {
    const text = plaintextTextArea.value;
    for (let character of text) {
      let searchedCharacter = (size === 5 && character === 'J') ? 'I' : character;
      let found = false;
      for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++) {
          if (coordinateOrderSelection.value === 'Row, Column') {
            if (polybiusSquare[row][column] === searchedCharacter) {
              result += `${row + 1}${column + 1}`;
              found = true;
              break;
            }
          } else if (coordinateOrderSelection.value === 'Column, Row') {
            if (polybiusSquare[row][column] === searchedCharacter) {
              result += `${column + 1}${row + 1}`;
              found = true;
              break;
            }
          }
        }
        if (found) break;
      }
    }
    ciphertextTextArea.value = result;
  } else {
    for (let i = 0; i < ciphertextTextArea.value.length; i += 2) {
      const firstCharacter = ciphertextTextArea.value[i];
      const secondCharacter = ciphertextTextArea.value[i + 1];

      if (firstCharacter !== undefined && secondCharacter !== undefined && !isNaN(firstCharacter) && !isNaN(secondCharacter)) {
        const firstValue = parseInt(firstCharacter) - 1;
        const secondValue = parseInt(secondCharacter) - 1;

        let rowNumber, columnNumber;

        if (coordinateOrderSelection.value === 'Row, Column') {
          rowNumber = firstValue;
          columnNumber = secondValue;
        } else { 
          columnNumber = firstValue;
          rowNumber = secondValue;
        }

        if (polybiusSquare[rowNumber] && polybiusSquare[rowNumber][columnNumber] !== undefined) {
          result += polybiusSquare[rowNumber][columnNumber];
        }
      }
    }

    plaintextTextArea.value = result;
  }

  return result;
}

function displayPolybiusSquare() {
  const size = gridSizeSelect.value === "5x5" ? 5 : 6;
  const chars = [...new Set(alphabetInput.value.toUpperCase().replace(/\s+/g, ''))]
    .filter(char => allowedCharacters.includes(char));

  alphabetInput.value = chars.join('');
  grid.style.setProperty("--rows", size);
  grid.style.setProperty("--cols", size);
  grid.replaceChildren();

  polybiusSquare = [];

  const corner = document.createElement("div");
  corner.className = "grid-cell corner-cell";
  grid.appendChild(corner);

  for (let i = 1; i <= size; i++) {
    const header = document.createElement("div");
    header.className = "grid-cell header-label";
    header.textContent = i;
    grid.appendChild(header);
  }

  let index = 0;

  for (let row = 1; row <= size; row++) {
    const header = document.createElement("div");
    header.className = "grid-cell header-label";
    header.textContent = row;
    grid.appendChild(header);
    const currentRow = [];

    for (let column = 1; column <= size; column++) {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.textContent = chars[index] || ".";
      currentRow.push(cell.textContent);

      if (index >= chars.length) {
        cell.classList.add("placeholder-cell");
      }

      grid.appendChild(cell);
      index++;
    }

    polybiusSquare.push(currentRow)
  }
}

alphabetInput.addEventListener("input", () => {
  displayPolybiusSquare();
});

gridSizeSelect.addEventListener("change", () => {
  alphabetInput.value = DEFAULT_GRID_SIZES[gridSizeSelect.value];
  displayPolybiusSquare();
  encryptorDecrypt(true)
});

plaintextTextArea.addEventListener('input', () => {
  isPlaintextTextAreaBeingUsed = true;
  encryptorDecrypt(isPlaintextTextAreaBeingUsed);
});

ciphertextTextArea.addEventListener('input', () => {
  isPlaintextTextAreaBeingUsed = false;
  encryptorDecrypt(isPlaintextTextAreaBeingUsed);
});

coordinateOrderSelection.addEventListener("change", () => {
  encryptorDecrypt(isPlaintextTextAreaBeingUsed);
});

window.addEventListener('DOMContentLoaded', () => {
  alphabetInput.value = DEFAULT_GRID_SIZES[gridSizeSelect.value];
  displayPolybiusSquare();
  encryptorDecrypt(isPlaintextTextAreaBeingUsed)
});




