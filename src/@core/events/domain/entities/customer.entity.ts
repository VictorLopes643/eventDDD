import Uuid from '../../../common/domain/value-objects/uuid.vo';
import { AggregateRoot } from '../../../common/domain/aggregate-root';
import Cpf from '../../../common/domain/value-objects/cpf.vo';

export class CustomerId extends Uuid {}

export type CustomerConstructorProp = {
  id?: CustomerId | string;
  cpf: Cpf;
  name: string;
};

export class Customer extends AggregateRoot {
  id: CustomerId;
  cpf: Cpf;
  name: string;

  constructor({ id, cpf, name }: CustomerConstructorProp) {
    super();
    this.id =
      typeof id === 'string' ? new CustomerId(id) : id ?? new CustomerId();
    this.cpf = cpf;
    this.name = name;
  }

  static create(command: { name: string; cpf: string }) {
    return new Customer({
      name: command.name,
      cpf: new Cpf(command.cpf),
    });
  }

  toJSON() {
    return {
      id: this.id,
      cpf: this.cpf,
      name: this.name,
    };
  }
}
