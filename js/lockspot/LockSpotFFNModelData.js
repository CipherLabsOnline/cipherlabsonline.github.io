export class LockSpotFFNModelData {

    constructor(classes = [], activation, weights = [[]], biases = []) {
        this.classes = classes;
        this.activation = activation;
        this.weights = weights;
        this.biases = biases;
    }
}