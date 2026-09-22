export class TextUtils {

    static getFrequencies(text) {
        const frequencies = new Map();
        
        if (typeof text !== "string") {
            text = String(text || "");
        }

        const textLength = text.length;
        if (textLength === 0) {
            return frequencies;
        }

        const counts = new Map();
        for (let i = 0; i < textLength; i++) {
            const char = text[i];
            counts.set(char, (counts.get(char) ?? 0) + 1);
        }

        for (const [key, value] of counts.entries()) {
            frequencies.set(key, value / textLength);
        }

        return frequencies;
    }

    static findIOC(text){
        const characterFrequencyMap = new Map();
        let letterCount = 0;
        for(let i = 0; i < text.length; i++){
            const isLetter = /\p{L}/u.test(text[i]);
            if(isLetter){
                characterFrequencyMap.set(text[i], (characterFrequencyMap.get(text[i]) || 0) + 1);
                letterCount++;
            }
        }

        let sum = 0;
        for(const count of characterFrequencyMap.values()){
            sum += count * (count - 1);
        }

        return sum / (letterCount * (letterCount - 1));
    }

    static hasLetterJ(text){
        return text.includes("J") ? 1 : 0;
    }

    static hasDigits(text){
        for(const char in text){
            if(char >= '0' && char <= '9'){
                return 1;
            }
        }

        return 0;
    }

    static hasDoubleLettersOrDigits(text){
        for(let i = 0; i < text.length; i++){
            if(text[i] == text[i + 1]){
                return 1;
            }
        }

        return 0;
    }

    static getUniqueCharacterCount(text){
        const characterSet = new Set();
        for(const char in text){
            characterSet.add(char);
        }

        return characterSet.size();
    }

    static getMostFrequentCharacter(text){
        let mostFrequentChar = '';
        let maxCount = 0;
        for(let char in text){
            let count = text.split(char).length - 1;
            if(count > maxCount){
                maxCount = count;
                mostFrequentChar = char;
            }
        }

        return mostFrequentChar;
    }
}