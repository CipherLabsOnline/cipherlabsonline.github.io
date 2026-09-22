export class Alphabets {

    static ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static ALPHABET_CHAR_ARRAY = Alphabets.ALPHABET.split('');
    static ALPHABET_CHAR_LIST = Array.from(Alphabets.ALPHABET);
    static ALNUM = Alphabets.ALPHABET + "0123456789";
    static ALNUM_CHAR_ARRAY = Alphabets.ALNUM.split('');
    static ALNUM_CHAR_LIST = Array.from(Alphabets.ALNUM);

    static isInAlphabet(value){
        return Alphabets.ALPHABET.includes(String(value));
    }
}