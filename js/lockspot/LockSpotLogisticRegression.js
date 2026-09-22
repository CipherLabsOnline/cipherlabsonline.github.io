import {LockSpotModel} from './LockSpotModel.js'
import {MathUtils} from '../MathUtils.js'
export class LockSpotLogisticRegression extends LockSpotModel{ 

    constructor(modelData){
        super();
        this.modelData = modelData;
    }

    getProbabilities(inputs){
        const weights = this.modelData.weights;
        const intercepts = this.modelData.intercepts;
        const logits = intercepts.map((intercept, i) => {
                    let logit = intercept;
                    for (let j = 0; j < inputs.length; j++) {
                        logit += inputs[j] * weights[i][j];
                    }
                    return logit;
                });
         return MathUtils.softmax(logits);
    }

    getClasses(){
        return this.modelData.classes;
    }
}