import { ValueObject } from './value-object';
import crypto from 'crypto';
import { validate as uuidValidate } from 'uuid';
export class Uuid extends ValueObject<string> {
  constructor(id?: string) {
    super(id || crypto.randomUUID());
    this.validate();
  }

  private validate() {
    const isValidate = uuidValidate(this.value);
    if (!isValidate) {
      throw new InvalidUuidError(this.value);
    }
  }
}
export class InvalidUuidError extends Error {
  constructor(invalidValue?: string) {
    super(`The value <${invalidValue}> is invalid for uuid.`);
    this.name = 'Invalid';
  }
}

export default Uuid;
