export class AlphabetTable {

    static createAlphabetTableRows(firstAlphabet, secondAlphabet) {
        const alphabetTable = document.querySelector("#alphabets-table");
        let firstAlphabetRow = alphabetTable.querySelector("tr:nth-child(1)");
        let secondAlphabetRow = alphabetTable.querySelector("tr:nth-child(2)");
        if (!firstAlphabetRow) {
            firstAlphabetRow = document.createElement("tr");
            alphabetTable.appendChild(firstAlphabetRow);
        }
        if (!secondAlphabetRow) {
            secondAlphabetRow = document.createElement("tr");
            alphabetTable.appendChild(secondAlphabetRow);
        }
    }

    static updateAlphabetTable(firstAlphabet, secondAlphabet) {
        this.createAlphabetTableRows(firstAlphabet, secondAlphabet);
        const alphabetTable = document.querySelector("#alphabets-table");
        let firstAlphabetRow = alphabetTable.querySelector("tr:nth-child(1)");
        let secondAlphabetRow = alphabetTable.querySelector("tr:nth-child(2)");
        const alphabetDisplayLimit = 52;
    
        for (let i = 0; i < firstAlphabet.length; i++) {
            if (i > alphabetDisplayLimit) {
                break;
            }

            let firstAlphabetData = firstAlphabetRow.cells[i] || document.createElement("td");
            if (!firstAlphabetRow.cells[i]) firstAlphabetRow.appendChild(firstAlphabetData);
            firstAlphabetData.textContent = firstAlphabet[i];

            let secondAlphabetData = secondAlphabetRow.cells[i] || document.createElement("td");
            if (!secondAlphabetRow.cells[i]) secondAlphabetRow.appendChild(secondAlphabetData);
            secondAlphabetData.textContent = secondAlphabet[i];
        }

        while (firstAlphabetRow.cells.length > firstAlphabet.length) {
            firstAlphabetRow.deleteCell(-1);
            secondAlphabetRow.deleteCell(-1);
        }
    }
}