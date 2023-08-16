import { Customer } from '../customer.entity';

test('should create a valid customer', () => {
  const customer = Customer.create({
    name: 'John Doe',
    cpf: '10044569998',
  });

  expect(customer.cpf.value).toBe('10044569998');
  expect(customer.name).toBe('John Doe');
  expect(customer.id).toBeDefined();
});
