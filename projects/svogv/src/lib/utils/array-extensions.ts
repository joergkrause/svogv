/**
 * @ignore
 */
declare interface Array<T> {
  remove(o: any): Array<any>;
}

/**
 * @ignore
 */
Array.prototype.remove = function(valueOrPredicate: any): any[] {
  const predicate =
    typeof valueOrPredicate === 'function'
      ? valueOrPredicate
      : function(value: any) {
          return value === valueOrPredicate;
        };
  const removedValues = new Array<any>();
  console.log(valueOrPredicate, this);
  for (let i = 0; i < this.length; i++) {
    const value = this[i];
    if (predicate(value)) {
      removedValues.push(value);
      this.splice(i, 1);
      i--;
    }
  }

  return removedValues;
};
