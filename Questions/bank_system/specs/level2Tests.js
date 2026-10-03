const chai = require('chai');
const { expect } = chai;
const BankSystem = require('../src/bankSystem');

describe('Bank System - Level 2 tests', () => {
  let simulation;

  beforeEach(() => {
    simulation = new BankSystem();
  });

  it('returns an empty ranking when no accounts exist', function () {
    this.timeout(400);
    expect(simulation.topSpenders(1, 0)).to.deep.equal([]);
    expect(simulation.topSpenders(2, 5)).to.deep.equal([]);
  });

  it('returns the requested top spender', function () {
    this.timeout(400);
    simulation.createAccount(1, 'acc1');
    simulation.deposit(2, 'acc1', 1000);
    simulation.createAccount(3, 'acc2');
    simulation.transfer(4, 'acc1', 'acc2', 500);
    expect(simulation.topSpenders(5, 1)).to.deep.equal(['acc1(500)']);
  });

  it('breaks outgoing-total ties by account identifier', function () {
    this.timeout(400);
    simulation.createAccount(1, 'acc1');
    simulation.createAccount(2, 'acc2');
    simulation.createAccount(3, 'acc3');
    simulation.deposit(4, 'acc1', 1000);
    simulation.deposit(5, 'acc2', 1500);
    simulation.deposit(6, 'acc3', 1200);
    simulation.transfer(8, 'acc2', 'acc3', 500);
    simulation.transfer(7, 'acc1', 'acc2', 500);
    simulation.transfer(9, 'acc3', 'acc1', 300);
    expect(simulation.topSpenders(10, 3)).to.deep.equal([
      'acc1(500)',
      'acc2(500)',
      'acc3(300)',
    ]);
  });
});
