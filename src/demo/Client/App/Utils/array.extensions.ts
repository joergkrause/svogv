interface Array<T> {
   remove(o: any): Array<any>;
}

Array.prototype.remove = function(valueOrPredicate: any): any[] {
    let predicate = typeof valueOrPredicate === 'function'
                      ? valueOrPredicate
                      : function (value) { return value === valueOrPredicate; };
      let removedValues = [];
      console.log(valueOrPredicate, this);
      for (let i = 0; i < this.length; i++) {
          let value = this[i];
          if (predicate(value)) {
              removedValues.push(value);
              this.splice(i, 1);
              i--;
          }
      }

      return removedValues;
}
