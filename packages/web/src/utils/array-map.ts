/**
 * 数组
 */
export default class ArrayMap<T extends { [key: string]: any }> {
  private array: T[];
  private _map: Map<string, T>;
  private keyProperty: string;

  constructor(keyProperty: string = 'id') {
    this.array = [];
    this._map = new Map();
    this.keyProperty = keyProperty;
  }

  private ensureUniqueKey(obj: T): boolean {
    const key: string = obj[this.keyProperty];
    if (this._map.has(key)) {
      this.update(obj);
      return false;
    }
    return true;
  }

  // Array methods
  push(obj: T): void {
    if (!obj.hasOwnProperty(this.keyProperty)) {
      console.error(`Object must have a property '${this.keyProperty}'`);
      return;
    }

    // 存在则更新
    if (!this.ensureUniqueKey(obj)) {
      return;
    }

    this.array.push(obj);
    const key: string = obj[this.keyProperty];
    this._map.set(key, obj);
  }

  update(obj: T): void {
    const key: string = obj[this.keyProperty];
    const existingObj = this._map.get(key);
    if (existingObj) {
      // Merge properties of newObj into existingObj
      Object.assign(existingObj, obj);
      this._map.set(key, existingObj);
      // Update array with the modified element
      const index = this.array.indexOf(existingObj);
      if (index !== -1) {
        this.array[index] = existingObj;
      }
    }
  }

  unshift(obj: T): void {
    if (!obj.hasOwnProperty(this.keyProperty)) {
      console.error(`Object must have a property '${this.keyProperty}'`);
      return;
    }

    // 存在则更新
    if (!this.ensureUniqueKey(obj)) {
      return;
    }

    this.array.unshift(obj);
    const key: string = obj[this.keyProperty];
    this._map.set(key, obj);
  }

  pop(): T | undefined {
    const obj: T | undefined = this.array.pop();
    if (obj) {
      const key: string = obj[this.keyProperty];
      this._map.delete(key);
    }
    return obj;
  }

  find(predicate: (value: T, index: number, array: Readonly<T>[]) => boolean): T | undefined {
    return this.array.find(predicate);
  }

  findIndex(predicate: (value: T, index: number, array: Readonly<T>[]) => boolean): number {
    return this.array.findIndex(predicate);
  }

  splice(start: number, deleteCount?: number, ...items: Readonly<T>[]): T[] {
    const deletedItems = this.array.splice(start, deleteCount, ...items);

    // 更新 Map
    deletedItems.forEach((deletedItem) => {
      const key = deletedItem[this.keyProperty];
      this._map.delete(key);
    });
    items.forEach((item) => {
      const key = item[this.keyProperty];
      this._map.set(key, item);
    });

    return deletedItems;
  }

  filter(predicate: (value: T, index: number, array: Readonly<T>[]) => boolean): T[] {
    const filteredArray = this.array.filter(predicate);
    return filteredArray;
  }

  map<U>(callbackfn: (value: T, index: number, array: Readonly<T>[]) => U): U[] {
    return this.array.map(callbackfn);
  }

  forEach(callbackfn: (value: T, index: number, array: Readonly<T>[]) => void): void {
    return this.array.forEach(callbackfn);
  }

  sort(compareFn?: (a: Readonly<T>, b: Readonly<T>) => number): T[] {
    return this.array.sort(compareFn);
  }

  // Map methods
  set(key: string, obj: T): void {
    if (!obj.hasOwnProperty(this.keyProperty)) {
      console.error(`Object must have a property '${this.keyProperty}'`);
      return;
    }

    this._map.set(key, obj);
    this.array.push(obj);
  }

  get(key: string): T | undefined {
    return this._map.get(key);
  }

  // Additional methods
  size(): number {
    return this.array.length;
  }

  get length(): number {
    return this.array.length;
  }

  keys(): IterableIterator<string> {
    return this._map.keys();
  }

  values(): IterableIterator<T> {
    return this._map.values();
  }
}
