import { Alphabets } from '../alphabets.js';
import { SubstitutionTable } from './substitution-table.js';
export class AlphabetSelector {

    static CHAR_DICTIONARY = {
        uppercase: Alphabets.ALPHABET,
        lowercase: Alphabets.ALPHABET.toLowerCase(),
        digits: "0123456789",
        punctuation_marks: ".,:;!?()"
    };

    static get uppercaseCheckbox() {
        return document.getElementById('uppercase');
    }

    static get lowercaseCheckbox() {
        return document.getElementById('lowercase');
    }

    static get digitsCheckbox() {
        return document.getElementById('digits');
    }

    static get punctuationMarksCheckbox() {
        return document.getElementById('punctuation-marks');
    }

    static get customCheckbox() {
        return document.getElementById('custom');
    }

    static get alphabetTextbox() {
        return document.getElementById('alphabet-textbox');
    }

    static get checkboxArray() {
        return [
            AlphabetSelector.uppercaseCheckbox,
            AlphabetSelector.lowercaseCheckbox,
            AlphabetSelector.digitsCheckbox,
            AlphabetSelector.punctuationMarksCheckbox
        ];
    }

    static updateAlphabetTextBox(encryptOrDecryptCallback, updateTableCallback = () => { }) {
        if (AlphabetSelector.customCheckbox.checked) {
            AlphabetSelector.checkboxArray.forEach(checkbox => {
                if (checkbox) checkbox.checked = false;
            });

            if (AlphabetSelector.alphabetTextbox) {
                AlphabetSelector.alphabetTextbox.readOnly = false;
            }
            return;
        }

        const checkboxes = [
            { element: AlphabetSelector.uppercaseCheckbox, value: AlphabetSelector.CHAR_DICTIONARY.uppercase },
            { element: AlphabetSelector.lowercaseCheckbox, value: AlphabetSelector.CHAR_DICTIONARY.lowercase },
            { element: AlphabetSelector.digitsCheckbox, value: AlphabetSelector.CHAR_DICTIONARY.digits },
            { element: AlphabetSelector.punctuationMarksCheckbox, value: AlphabetSelector.CHAR_DICTIONARY.punctuation_marks }
        ];

        if (AlphabetSelector.alphabetTextbox) {
            AlphabetSelector.alphabetTextbox.readOnly = true;

            const selectedCharacters = checkboxes
                .filter(item => item.element && item.element.checked)
                .map(item => item.value)
                .join('');

            AlphabetSelector.alphabetTextbox.value = selectedCharacters;
        }

        encryptOrDecryptCallback();
        updateTableCallback();
    }

    static onCustomCheckBoxEvent(encryptOrDecryptCallback, updateTableCallback = () => { }) {
        AlphabetSelector.alphabetTextbox.addEventListener('input', () => {
            if (AlphabetSelector.customCheckbox.checked) {
                encryptOrDecryptCallback();
                updateTableCallback();
            }
        });
    }

    static onCheckboxChangeEvent(encryptOrDecryptCallback, updateTableCallback = () => { }, updateAlphabetTextBoxCallback) {
        const { customCheckbox, alphabetTextbox, checkboxArray } = AlphabetSelector;
        checkboxArray.forEach(checkbox => checkbox?.addEventListener('change', () => {
            //Prevents an empty checkbox selection catastophe
            if(checkboxArray.filter(checkbox => checkbox && checkbox.checked).length == 0 && (!customCheckbox.checked)){
                checkbox.checked = true;
                return;
            }
            if (checkbox.checked && customCheckbox) {
                customCheckbox.checked = false;
            }
            updateAlphabetTextBoxCallback();
            updateTableCallback();
        }));
        customCheckbox.addEventListener('change', () => {
            if (customCheckbox.checked) {
                checkboxArray.forEach(checkbox => {
                    if (checkbox) {
                        checkbox.checked = false;
                    }
                });

                if (alphabetTextbox) {
                    alphabetTextbox.readOnly = false;
                    alphabetTextbox.focus();
                }
                updateTableCallback();
                encryptOrDecryptCallback();
            } else {
                checkboxArray[0].checked = true;
                updateAlphabetTextBoxCallback();
            }
        });
    }

    static onEmptyAlphabetTextboxEvent(updateAlphabetTextBox, updateSubstitutionTable) {
        AlphabetSelector.alphabetTextbox.addEventListener("input", () => {
            AlphabetSelector.applyDefaultAlphabetSelection(updateAlphabetTextBox, updateSubstitutionTable);
        });
    }

    static applyDefaultAlphabetSelection(updateAlphabetTextboxCallback, updateTableCallback = () => { }) {
        let currentText = AlphabetSelector.alphabetTextbox.value;
        let alphabetLength = currentText.length;
        if (alphabetLength < 1) {
            AlphabetSelector.alphabetTextbox.readOnly = true;
            AlphabetSelector.customCheckbox.checked = false;
            AlphabetSelector.uppercaseCheckbox.checked = true;
            updateAlphabetTextboxCallback();
            updateTableCallback();
            currentText = AlphabetSelector.alphabetTextbox.value;
            alphabetLength = currentText.length;
        }

        return alphabetLength;
    }
}
