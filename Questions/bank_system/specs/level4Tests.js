const chai = require('chai');
const { expect } = chai;
const BankSystem = require('../src/bankSystem');

describe('Bank System - Level 4 tests', () => {
  let simulation;

  beforeEach(() => {
    simulation = new BankSystem();
  });

  it('rejects a merge when the first account is missing', function () {
    this.timeout(400);
    simulation.createAccount(1, 'acc2');
    expect(simulation.mergeAccounts(2, 'acc1', 'acc2')).to.equal(false);
  });

  it('rejects a merge when the second account is missing', function () {
    this.timeout(400);
    simulation.createAccount(1, 'acc1');
    expect(simulation.mergeAccounts(2, 'acc1', 'acc2')).to.equal(false);
  });

  it('moves pending cashback and payment status during a merge', function () {
    this.timeout(400);
    simulation.createAccount(1, 'acc1');
    simulation.deposit(2, 'acc1', 1000);
    const paymentId = simulation.pay(3, 'acc1', 500);
    expect(paymentId).to.exist;
    simulation.createAccount(4, 'acc2');
    simulation.mergeAccounts(5, 'acc2', 'acc1');
    expect(simulation.getPaymentStatus(6, 'acc2', paymentId)).to.equal('IN_PROGRESS');
    expect(
      simulation.getPaymentStatus(24 * 60 * 60 * 1000 + 3, 'acc2', paymentId),
    ).to.equal('CASHBACK_RECEIVED');
    expect(simulation.deposit(24 * 60 * 60 * 1000 + 5, 'acc2', 0)).to.equal(510);
  });

  it('combines outgoing totals during a merge', function () {
    this.timeout(400);
    simulation.createAccount(1, 'acc1');
    simulation.deposit(2, 'acc1', 1000);
    simulation.pay(3, 'acc1', 500);
    simulation.createAccount(4, 'acc2');
    simulation.deposit(5, 'acc2', 2000);
    simulation.pay(6, 'acc2', 800);
    simulation.mergeAccounts(7, 'acc1', 'acc2');
    expect(simulation.topSpenders(8, 1)).to.deep.equal(['acc1(1300)']);
  });

  it('reports balance history around cashback processing', function () {
    this.timeout(400);
    simulation.createAccount(1, 'acc1');
    simulation.deposit(2, 'acc1', 1000);
    simulation.pay(3, 'acc1', 300);
    expect(simulation.getBalance(4, 'acc1', 3)).to.equal(700);
    expect(
      simulation.getBalance(
        24 * 60 * 60 * 1000 + 5,
        'acc1',
        24 * 60 * 60 * 1000 + 2,
      ),
    ).to.equal(700);
    expect(
      simulation.getBalance(
        24 * 60 * 60 * 1000 + 5,
        'acc1',
        24 * 60 * 60 * 1000 + 3,
      ),
    ).to.equal(706);
  });
});
