import { Alphabets } from "../Alphabets.js";
import { TextUtils } from "../TextUtils.js";

export class LockSpotFeatureUtils {

    static ALNUM_CHARACTERS_LENGTH = Alphabets.ALNUM.length;

    static getFeatures(text) {
        if (typeof text !== "string") {
            text = String(text || "");
        }

        text = text.toUpperCase().replaceAll(/[^A-Z0-9]/g, "");

        const ioc = TextUtils.findIOC(text);
        const haveLetterJ = TextUtils.hasLetterJ(text);
        const containsDigits = TextUtils.hasDigits(text);
        const containsDoubleLettersOrNumbers = TextUtils.hasDoubleLettersOrDigits(text);
        const frequencyPercantages = TextUtils.getFrequencies(text);
        const features = new Array(40);
        features[0] = ioc;
        features[1] = haveLetterJ;
        features[2] = containsDigits;
        features[3] = containsDoubleLettersOrNumbers;

        for (let i = 0; i < Alphabets.ALNUM.length; i++) {
            const char = Alphabets.ALNUM.charAt(i);
            features[4 + i] = frequencyPercantages.get(char) || 0;
        }
        return features;
    }
}