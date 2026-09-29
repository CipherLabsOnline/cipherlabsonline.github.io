export class LockSpotModelLoader {

    cipherTypeModel;
    cipherAlgorithmModel;

    constructor(){

    }

    static async loadModel(modelFilePath) {
        const response = await fetch(modelFilePath);

        if (!response.ok) {
            throw new Error(
                `Could not load model: ${response.status} ${response.statusText}`
            );
        }

        const json = await response.json();

        if (!json.cipherTypeModel) {
            throw new Error("JSON is missing cipherTypeModel");
        }

        if (!json.cipherAlgorithmModel) {
            throw new Error("JSON is missing cipherAlgorithmModel");
        }

        return json;
    }
}