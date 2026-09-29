export class MathUtils {
    static softmax(logits){
        const maxLogit = Math.max(...logits);
        const exps = logits.map(logit => Math.exp(logit - maxLogit));
        const sumExps = exps.reduce((sum, val) => sum + val, 0);
        return exps.map(exp => exp / sumExps);
     }
}