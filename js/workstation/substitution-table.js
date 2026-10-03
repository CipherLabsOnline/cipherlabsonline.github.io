export class SubstitutionTable {

    static createSubstitutionTableRows(firstAlphabet, secondAlphabet) {
        const substitutionTable = document.querySelector("#substitution-table");
        let firstAlphabetRow = substitutionTable.querySelector("tr:nth-child(1)");
        let secondAlphabetRow = substitutionTable.querySelector("tr:nth-child(2)");
        if (!firstAlphabetRow) {
            firstAlphabetRow = document.createElement("tr");
            substitutionTable.appendChild(firstAlphabetRow);
        }
        if (!secondAlphabetRow) {
            secondAlphabetRow = document.createElement("tr");
            substitutionTable.appendChild(secondAlphabetRow);
        }
    }

    static updateSubstitutionTable(firstAlphabet, secondAlphabet) {
        this.createSubstitutionTableRows(firstAlphabet, secondAlphabet);
        const substitutionTable = document.querySelector("#substitution-table");
        let firstAlphabetRow = substitutionTable.querySelector("tr:nth-child(1)");
        let secondAlphabetRow = substitutionTable.querySelector("tr:nth-child(2)");
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