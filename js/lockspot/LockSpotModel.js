export class LockSpotModel {

 constructor(){
        if(this.constructor == LockSpotModel){
            throw new Error("Abstract classes can't be instantiated");
      }
   }

    getProbabilities(inputs) {
        throw new Error("Method 'getProbabilities()' must be implemented");
    }

    getClasses(){
        throw new Error("Method 'getClasses' must be implemented!");
    }
}