export class AtbashCipher {

    static encrypt(plaintext, customAlphabet){
        const reversedAlphabet = customAlphabet.split('').reverse().join('');
        const outOfIndexPosition = -1;
        let result = "";
        for(let i = 0; i < plaintext.length; i++){
            const character = plaintext[i];
            const characterCurrentIndex = customAlphabet.indexOf(character);
            if(characterCurrentIndex !== outOfIndexPosition){
                result += reversedAlphabet[characterCurrentIndex];
            }else{
                result += character;
            }
        }

        return result;
    }

    static decrypt(ciphertext, customAlphabet){
        return this.encrypt(ciphertext, customAlphabet.split('').reverse().join(''));
    }
}
