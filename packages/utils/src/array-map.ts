/**
 * 数组
 */
export default class ArrayMap<T extends { [key: string]: any }> {
  private _array: T[];
  private _map: Map<string, T>;
  private keyProperty: string;

  constructor(keyProperty: string = 'id') {
    this._array = [];
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

  /**
   * 判断对象中是否包含指定的键
   *
   * @param key 要检查的键名
   * @returns 如果包含则返回true，否则返回false
   */
  has(key: string): boolean {
    return this._map.has(key);
  }

  // Array methods
  push(...arr: T[]): void {
    for (const obj of arr) {
      if (!obj.hasOwnProperty(this.keyProperty)) {
        console.error(`Object must have a property '${this.keyProperty}'`);
        return;
      }
      // 存在则更新
      if (!this.ensureUniqueKey(obj)) {
        return;
      }
      // 不存在则更新
      this._array.push(obj);
      const key: string = obj[this.keyProperty];
      this._map.set(key, obj);
    }
  }

  update(newObject: Partial<T>): void {
    const key: string = newObject[this.keyProperty];
    const existingObj = this._map.get(key);
    if (existingObj) {
      // Merge properties of newObj into existingObj
      Object.assign(existingObj, newObject);
      this._map.set(key, existingObj);
      // Update array with the modified element
      const index = this._array.indexOf(existingObj);
      if (index !== -1) {
        this._array[index] = existingObj;
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

    this._array.unshift(obj);
    const key: string = obj[this.keyProperty];
    this._map.set(key, obj);
  }

  pop(): T | undefined {
    const obj: T | undefined = this._array.pop();
    if (obj) {
      const key: string = obj[this.keyProperty];
      this._map.delete(key);
    }
    return obj;
  }

  find(predicate: (value: T, index: number, array: Readonly<T>[]) => boolean): T | undefined {
    return this._array.find(predicate);
  }

  findIndex(predicate: (value: T, index: number, array: Readonly<T>[]) => boolean): number {
    return this._array.findIndex(predicate);
  }

  splice(start: number, deleteCount?: number, ...items: Readonly<T>[]): T[] {
    const deletedItems = this._array.splice(start, deleteCount, ...items);
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
    const filteredArray = this._array.filter(predicate);
    return filteredArray;
  }

  map<U>(callbackfn: (value: T, index: number, array: Readonly<T>[]) => U): U[] {
    return this._array.map(callbackfn);
  }

  forEach(callbackfn: (value: T, index: number, array: Readonly<T>[]) => void): void {
    return this._array.forEach(callbackfn);
  }

  sort(compareFn?: (a: Readonly<T>, b: Readonly<T>) => number): T[] {
    return this._array.sort(compareFn);
  }

  // Map methods
  set(key: string, obj: T): void {
    if (!obj.hasOwnProperty(this.keyProperty)) {
      console.error(`Object must have a property '${this.keyProperty}'`);
      return;
    }

    this._map.set(key, obj);
    this._array.push(obj);
  }

  get(key: string): T | undefined {
    return this._map.get(key);
  }

  /**
   * 返回长度
   */
  size(): number {
    return this._array.length;
  }

  /**
   * 返回长度
   */
  get length(): number {
    return this._array.length;
  }

  /**
   * 返回key
   * @returns
   */
  keys(): IterableIterator<string> {
    return this._map.keys();
  }

  /**
   * 返回values
   * @returns
   */
  values(): IterableIterator<T> {
    return this._map.values();
  }

  /**
   * 删除
   * @param key
   */
  delete(key: string) {
    this._map.delete(key);
    this._array = this._array.filter((i) => {
      return i[this.keyProperty] !== key;
    });
  }

  /**
   * 清理
   */
  clear() {
    this._map.clear();
    this._array = [];
  }

  /**
   * 初始化
   * @param arr
   */
  reset(arr: T[]) {
    this.clear();
    this.push(...arr);
  }
}
