const chai = require('chai');
const { expect } = chai;
const BankSystem = require('../src/bankSystem');

describe('Bank System - Level 1 tests', () => {
  let simulation;

  beforeEach(() => {
    simulation = new BankSystem();
  });

  it('creates accounts', function () {
    this.timeout(400);
    expect(simulation.createAccount(1, 'acc1')).to.equal(true);
    expect(simulation.createAccount(2, 'acc1')).to.equal(false);
    expect(simulation.createAccount(3, 'acc2')).to.equal(true);
  });

  it('deposits money', function () {
    this.timeout(400);
    simulation.createAccount(1, 'acc1');
    expect(simulation.deposit(2, 'acc1', 500)).to.equal(500);
    expect(simulation.deposit(3, 'acc1', 300)).to.equal(800);
    expect(simulation.deposit(4, 'non_existent', 100)).to.equal(null);
  });

  it('transfers money', function () {
    this.timeout(400);
    expect(simulation.createAccount(1, 'acc1')).to.equal(true);
    expect(simulation.createAccount(2, 'acc2')).to.equal(true);
    expect(simulation.deposit(3, 'acc1', 1000)).to.equal(1000);
    expect(simulation.transfer(4, 'acc1', 'acc2', 300)).to.equal(700);
    expect(simulation.transfer(5, 'acc1', 'acc2', 800)).to.equal(null);
    expect(simulation.transfer(6, 'acc1', 'non_existent', 100)).to.equal(null);
    expect(simulation.transfer(7, 'acc1', 'acc1', 100)).to.equal(null);
  });

  it('handles the first Level 1 scenario', function () {
    this.timeout(400);
    expect(simulation.createAccount(1, 'account1')).to.equal(true);
    expect(simulation.createAccount(2, 'account1')).to.equal(false);
    expect(simulation.createAccount(3, 'account2')).to.equal(true);
    expect(simulation.deposit(4, 'non_existent', 100)).to.equal(null);
    expect(simulation.deposit(5, 'account1', 2700)).to.equal(2700);
    expect(simulation.transfer(6, 'account1', 'account2', 2701)).to.equal(null);
    expect(simulation.transfer(7, 'account1', 'account2', 200)).to.equal(2500);
  });

  it('handles the second Level 1 scenario', function () {
    this.timeout(400);
    expect(simulation.createAccount(1, 'A')).to.equal(true);
    expect(simulation.createAccount(2, 'B')).to.equal(true);
    expect(simulation.deposit(3, 'A', 500)).to.equal(500);
    expect(simulation.transfer(4, 'A', 'B', 300)).to.equal(200);
    expect(simulation.deposit(5, 'B', 200)).to.equal(500);
    expect(simulation.transfer(6, 'B', 'A', 600)).to.equal(null);
    expect(simulation.transfer(7, 'B', 'A', 400)).to.equal(100);
  });

  it('handles the third Level 1 scenario', function () {
    this.timeout(400);
    expect(simulation.createAccount(1, 'X')).to.equal(true);
    expect(simulation.deposit(2, 'X', 1000)).to.equal(1000);
    expect(simulation.createAccount(3, 'Y')).to.equal(true);
    expect(simulation.transfer(4, 'X', 'Y', 500)).to.equal(500);
    expect(simulation.transfer(5, 'Y', 'X', 600)).to.equal(null);
    expect(simulation.deposit(6, 'Y', 300)).to.equal(800);
    expect(simulation.transfer(7, 'Y', 'X', 400)).to.equal(400);
  });
});
