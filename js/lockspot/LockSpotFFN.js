import {MathUtils} from '../MathUtils.js'
import {LockSpotModel} from "./LockSpotModel.js"

export class LockSpotFFN extends LockSpotModel {
    

    constructor(modelData){
        super()
        this.modelData = modelData;
    }

    getProbabilities(inputs){
        let currentLayer = inputs;
        const weights = this.modelData.weights;
        const biases = this.modelData.biases;
        const weightsLength = weights.length;
        for(let i = 0; i < weightsLength; i++){
            const weight = weights[i];
            const bias = biases[i];
            const nextLayer = [bias.length];
            for(let nextNode = 0; nextNode < bias.length; nextNode++){
                let sum = bias[nextNode];
                for(let currentNode = 0; currentNode < currentLayer.length; currentNode++){
                    sum += currentLayer[currentNode] * weight[currentNode][nextNode];
                }

                if(i < weightsLength - 1){
                    nextLayer[nextNode] = Math.max(0, sum);
                }else{
                    nextLayer[nextNode] = sum;
                }
            }

            currentLayer = nextLayer;
        }

        return MathUtils.softmax(currentLayer);
    }

    getClasses(){
        return this.modelData.classes;
    }
}