export class LockSpotLogisticRegressionModelData {
    constructor(classes = [], weights = [[]], intercepts = []) {
        this.classes = classes;
        this.weights = weights;
        this.intercepts = intercepts;
    }
}