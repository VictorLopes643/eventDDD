import isEqual from 'lodash/fp/isEqual';

export abstract class ValueObject<Value = any> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = deepFreeze(value);
  }
  get value(): Value {
    return this._value;
  }
  public equals(vo?: this): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.value === undefined) {
      return false;
    }
    if (vo.constructor.name !== this.constructor.name) {
      return false;
    }
    return isEqual(this.value, vo.value);
  }
}

export function deepFreeze<T>(obj: T) {
  try {
    const propNames = Object.getOwnPropertyNames(obj);
    for (const name of propNames) {
      const value = obj[name as keyof T];
      if (value && typeof value === 'object') {
        deepFreeze(value);
      }
    }
    return Object.freeze(obj);
  } catch (e) {
    return obj;
  }
}
