export class BaconianCipher {

    // Early
    static #earlyBaconCodeEncryptionDictionary = {
        "A": "AAAAA", "B": "AAAAB", "C": "AAABA", "D": "AAABB",
        "E": "AABAA", "F": "AABAB", "G": "AABBA", "H": "AABBB",
        "I": "ABAAA", "J": "ABAAA", "K": "ABAAB", "L": "ABABA",
        "M": "ABABB", "N": "ABBAA", "O": "ABBAB", "P": "ABBBA",
        "Q": "ABBBB", "R": "BAAAA", "S": "BAAAB", "T": "BAABA",
        "U": "BAABB", "V": "BAABB", "W": "BABAA", "X": "BABAB",
        "Y": "BABBA", "Z": "BABBB"
    };

   static #earlyBaconCodeDecryptionDictionary = {
        "AAAAA": "A", "AAAAB": "B", "AAABA": "C", "AAABB": "D",
        "AABAA": "E", "AABAB": "F", "AABBA": "G", "AABBB": "H",
        "ABAAA": "I", "ABAAB": "K", "ABABA": "L", "ABABB": "M",
        "ABBAA": "N", "ABBAB": "O", "ABBBA": "P", "ABBBB": "Q",
        "BAAAA": "R", "BAAAB": "S", "BAABA": "T", "BAABB": "U",
        "BABAA": "W", "BABAB": "X", "BABBA": "Y", "BABBB": "Z"
    };

   static #earlyBaconBinaryEncryptionDictionary = {
        "A": "00000", "B": "00001", "C": "00010", "D": "00011",
        "E": "00100", "F": "00101", "G": "00110", "H": "00111",
        "I": "01000", "J": "01000", "K": "01001", "L": "01010",
        "M": "01011", "N": "01100", "O": "01101", "P": "01110",
        "Q": "01111", "R": "10000", "S": "10001", "T": "10010",
        "U": "10011", "V": "10011", "W": "10100", "X": "10101",
        "Y": "10110", "Z": "10111"
    };

    static #earlyBaconBinaryDecryptionDictionary = {
        "00000": "A", "00001": "B", "00010": "C", "00011": "D",
        "00100": "E", "00101": "F", "00110": "G", "00111": "H",
        "01000": "I", "01001": "K", "01010": "L", "01011": "M",
        "01100": "N", "01101": "O", "01110": "P", "01111": "Q",
        "10000": "R", "10001": "S", "10010": "T", "10011": "U",
        "10100": "W", "10101": "X", "10110": "Y", "10111": "Z"
    };

    // Modern 

    static #modernBaconCodeEncryptionDictionary = {
        "A": "AAAAA", "B": "AAAAB", "C": "AAABA", "D": "AAABB",
        "E": "AABAA", "F": "AABAB", "G": "AABBA", "H": "AABBB",
        "I": "ABAAA", "J": "ABAAB", "K": "ABABA", "L": "ABABB",
        "M": "ABBAA", "N": "ABBAB", "O": "ABBBA", "P": "ABBBB",
        "Q": "BAAAA", "R": "BAAAB", "S": "BAABA", "T": "BAABB",
        "U": "BABAA", "V": "BABAB", "W": "BABBA", "X": "BABBB",
        "Y": "BBAAA", "Z": "BBAAB"
    };

    static #modernBaconCodeDecryptionDictionary = {
        "AAAAA": "A", "AAAAB": "B", "AAABA": "C", "AAABB": "D",
        "AABAA": "E", "AABAB": "F", "AABBA": "G", "AABBB": "H",
        "ABAAA": "I", "ABAAB": "J", "ABABA": "K", "ABABB": "L",
        "ABBAA": "M", "ABBAB": "N", "ABBBA": "O", "ABBBB": "P",
        "BAAAA": "Q", "BAAAB": "R", "BAABA": "S", "BAABB": "T",
        "BABAA": "U", "BABAB": "V", "BABBA": "W", "BABBB": "X",
        "BBAAA": "Y", "BBAAB": "Z"
    };

    static #modernBaconBinaryEncryptionDictionary = {
        "A": "00000", "B": "00001", "C": "00010", "D": "00011",
        "E": "00100", "F": "00101", "G": "00110", "H": "00111",
        "I": "01000", "J": "01001", "K": "01010", "L": "01011",
        "M": "01100", "N": "01101", "O": "01110", "P": "01111",
        "Q": "10000", "R": "10001", "S": "10010", "T": "10011",
        "U": "10100", "V": "10101", "W": "10110", "X": "10111",
        "Y": "11000", "Z": "11001"
    };

    static #modernBaconBinaryDecryptionDictionary = {
        "00000": "A", "00001": "B", "00010": "C", "00011": "D",
        "00100": "E", "00101": "F", "00110": "G", "00111": "H",
        "01000": "I", "01001": "J", "01010": "K", "01011": "L",
        "01100": "M", "01101": "N", "01110": "O", "01111": "P",
        "10000": "Q", "10001": "R", "10010": "S", "10011": "T",
        "10100": "U", "10101": "V", "10110": "W", "10111": "X",
        "11000": "Y", "11001": "Z"
    };

    static encrypt(plaintext, useBinary, useEarly){
        plaintext = plaintext.toUpperCase().replace("/[^A-Z]/g", "")
        let cipherText = "";
        const encryptionDictionary = this.#getAppropriateEncryptionDictionary(useBinary, useEarly);
        for(let i = 0; i < plaintext.length; i++){
            const character = plaintext.charAt(i);
            cipherText += encryptionDictionary.get(String(character));
        }

        return cipherText;
    }

    static decrypt(ciphertext, useBinary, useEarly){
        ciphertext = ciphertext.toUpperCase();
        if (useBinary()) {
            ciphertext = ciphertext.replaceAll("[^01]", "");
        } else {
            ciphertext = ciphertext.replaceAll("[^AB]", "");
        }

        let plaintext = "";
        const decryptionDictionary = this.#getAppropriateDecryptionDictionary(useBinary, useEarly);
        for(let i = 0; i < ciphertext.length; i+=5){
            if(i + 5 > ciphertext.length) {
                break;
            }

            const encodedText = ciphertext.substring(i, i+5);
            plaintext += decryptionDictionary.get(encodedText);
        }

        return plaintext;
    }

    static #getAppropriateEncryptionDictionary(useBinary, useEarly){
        let encryptionDictionary = {};
        if(useBinary){
            if(useEarly){
                encryptionDictionary = this.#earlyBaconBinaryEncryptionDictionary;
            }else{
                encryptionDictionary = this.#modernBaconBinaryEncryptionDictionary;
            }
        }else{
            if(useEarly){
                encryptionDictionary = this.#earlyBaconCodeEncryptionDictionary;
            }else{
                encryptionDictionary = this.#modernBaconCodeEncryptionDictionary;
            }
        }

        return encryptionDictionary;
    }

     static #getAppropriateDecryptionDictionary(useBinary, useEarly){
        let decryptionDictionary = {};
        if(useBinary){
            if(useEarly){
                decryptionDictionary = this.#earlyBaconBinaryDecryptionDictionary;
            }else{
                decryptionDictionary = this.#modernBaconBinaryDecryptionDictionary;
            }
        }else{
            if(useEarly){
                decryptionDictionary = this.#earlyBaconCodeDecryptionDictionary;
            }else{
                decryptionDictionary = this.#modernBaconCodeDecryptionDictionary;
            }
        }

        return decryptionDictionary;
    }

    get earlyBaconCodeEncryptionDictionary(){
        return this.earlyBaconCodeEncryptionDictionary;
    }

    get earlyBaconBinaryEncryptionDictionary(){
        return this.earlyBaconBinaryEncryptionDictionary;
    }

    get earlyBaconCodeDecryptionDictionary(){
        return this.earlyBaconCodeDecryptionDictionary;
    }

    get earlyBaconBinaryDecryptionDictionary(){
        return this.earlyBaconBinaryDecryptionDictionary;
    }

     get modernBaconCodeEncryptionDictionary(){
        return this.modernBaconCodeEncryptionDictionary;
    }

    get modernBaconBinaryEncryptionDictionary(){
        return this.modernBaconBinaryEncryptionDictionary;
    }

    get modernBaconCodeDecryptionDictionary(){
        return this.modernBaconCodeDecryptionDictionary;
    }

    get modernBaconBinaryDecryptionDictionary(){
        return this.modernBaconBinaryDecryptionDictionary;
    }
}