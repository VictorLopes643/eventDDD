import { ValueObject } from './value-object';

export class Cpf extends ValueObject<string> {
  constructor(value: string) {
    super(value.replace(/\D/g, ''));
    this.validate();
  }
  private validate() {
    if (this.value.length != 11) {
      throw new InvalidCpfError('CPF deve ter 11 dígitos');
    }
    const allDigitsEqual = /^\d{1}(\d)\1{10}$/.test(this.value);
    if (allDigitsEqual) {
      throw new InvalidCpfError('CPF não pode ter todos os dígitos iguais');
    }
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(this.value[i]) * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
    if (firstDigit > 9) {
      firstDigit = 0;
    }
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(this.value.charAt(i)) * (11 - i);
    }
    let secundDigit = 11 - (sum % 11);
    if (secundDigit > 9) {
      secundDigit = 0;
    }
    if (
      firstDigit !== parseInt(this.value.charAt(9)) ||
      secundDigit !== parseInt(this.value.charAt(10))
    ) {
      throw new InvalidCpfError('CPF inválido');
    }
  }
}

export class InvalidCpfError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidCpfError';
  }
}

export default Cpf;
