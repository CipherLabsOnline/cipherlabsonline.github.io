import { LockSpotFFN } from "./LockSpotFFN.js";
import { LockSpotLogisticRegression } from "./LockSpotLogisticRegression.js";
import { LockSpotModelLoader } from "./LockSpotModelLoader.js";
import { LockSpotFFNModelData } from "./LockSpotFFNModelData.js";
import { LockSpotLogisticRegressionModelData } from "./LockSpotLogisticRegressionModelData.js";
export class LockSpotManager {


    lockSpotModelContainer;
    cipherTypeModel;
    cipherAlgorithmModel;


    static async loadModelArchitecture(modelFilePath, modelData) {
        const container = await LockSpotModelLoader.loadModel(modelFilePath);
        if (modelData instanceof LockSpotFFNModelData) {
            this._cipherTypeModel = new LockSpotFFN(
                container.cipherTypeModel
            );

            this._cipherAlgorithmModel = new LockSpotFFN(
                container.cipherAlgorithmModel
            );
        } else if (modelData instanceof LockSpotLogisticRegressionModelData) {
            this._cipherTypeModel = new LockSpotLogisticRegression(
                container.cipherTypeModel
            );

            this._cipherAlgorithmModel = new LockSpotLogisticRegression(
                container.cipherAlgorithmModel
            );
        } else {
            throw new Error("Unsupported model-data type");
        }

        return {
            cipherTypeModel: this._cipherTypeModel,
            cipherAlgorithmModel: this._cipherAlgorithmModel
        };
    }
    
    static getModelPredictions(lockSpotModel, features){
            const probabilities = lockSpotModel.getProbabilities(features);
            const classes = lockSpotModel.getClasses();
            const predictions = new Map();
            for(let i = 0; i < classes.length; i++){
                predictions.set(classes[i], probabilities[i]);
            }

            return [...predictions.entries()].sort(
                (a, b) => b[1] - a[1]
            );
        }

    static generateReport(labelTitle, lockSpotModel, features) {
        const sectionLabel = document.createElement("div");
        sectionLabel.textContent = labelTitle;
        sectionLabel.style.fontSize = "14px";
        sectionLabel.style.fontWeight = "bold";
        sectionLabel.style.textAlign = "center";
        sectionLabel.style.width = "100%";

        const resultsBox = document.getElementById("resultsBox");

        if (!resultsBox) {
            throw new Error("Could not find resultsBox");
        }

        resultsBox.appendChild(sectionLabel);

        const predictions = LockSpotManager.getModelPredictions(
            lockSpotModel,
            features
        );

        const appropriateMinValue = 0.01;
        for (const [key, value] of predictions) {
            if (value > appropriateMinValue) {
                const row = document.createElement("div");
                row.style.display = "flex";
                row.style.gap = "15px";
                row.style.justifyContent = "center";
                row.style.alignItems = "center";
                row.style.padding = "0 0 0 15px";
                const paddedKey = String(key).padEnd(30, " ");
                const nameLabel =
                    LockSpotManager.createAppropriateReportLabel(
                        paddedKey,
                        "black"
                    );

                const filled = Math.round(value * 10);
                const barText =
                    "●".repeat(filled) + "○".repeat(10 - filled);
                const barLabel =
                    LockSpotManager.createAppropriateReportLabel(
                        barText,
                        "green"
                    );
                const percentageText =
                    `${(value * 100).toFixed(1)}%`.padStart(6, " ");
                const percentLabel =
                    LockSpotManager.createAppropriateReportLabel(
                        percentageText,
                        "black"
                    );

                row.appendChild(nameLabel);
                row.appendChild(barLabel);
                row.appendChild(percentLabel);
                resultsBox.appendChild(row);
            }
        }

        const spacer = document.createElement("div");
        spacer.style.height = "10px";
        resultsBox.appendChild(spacer);
    }

    static createAppropriateReportLabel(text, color) {
        const label = document.createElement('span');
        label.style.fontFamily = 'monospace';
        label.style.color = color;
        label.textContent = text; 
        return label;
    }

    get lockSpotModelContainer() {
    return this._lockSpotModelContainer;
    }

    get cipherTypeModel() {
        return this._cipherTypeModel;
    }

    get cipherAlgorithmModel() {
        return this._cipherAlgorithmModel;
    }
}
