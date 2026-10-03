const chai = require('chai');
const { expect } = chai;
const BankSystem = require('../src/bankSystem');

describe('Bank System - Level 3 tests', () => {
  let simulation;

  beforeEach(() => {
    simulation = new BankSystem();
  });

  it('rejects payment operations for a missing account', function () {
    this.timeout(400);
    expect(simulation.pay(1, 'non_existent', 100)).to.equal(null);
    expect(simulation.getPaymentStatus(2, 'non_existent', 'payment1')).to.equal(null);
  });

  it('rejects a payment when funds are insufficient', function () {
    this.timeout(400);
    simulation.createAccount(1, 'acc1');
    simulation.deposit(2, 'acc1', 100);
    expect(simulation.pay(3, 'acc1', 200)).to.equal(null);
  });

  it('includes payments in top-spender totals', function () {
    this.timeout(400);
    simulation.createAccount(1, 'acc1');
    simulation.deposit(2, 'acc1', 1000);
    expect(simulation.pay(3, 'acc1', 500)).to.equal('payment1');
    expect(simulation.pay(4, 'acc1', 300)).to.equal('payment2');
    simulation.createAccount(5, 'acc2');
    simulation.deposit(6, 'acc2', 800);
    simulation.transfer(7, 'acc2', 'acc1', 200);
    expect(simulation.topSpenders(5, 2)).to.deep.equal(['acc1(800)', 'acc2(200)']);
  });

  it('returns null for a missing account payment status', function () {
    this.timeout(400);
    expect(simulation.getPaymentStatus(1, 'non_existent', 'payment1')).to.equal(null);
  });

  it('returns null for a missing payment', function () {
    this.timeout(400);
    simulation.createAccount(1, 'acc1');
    expect(simulation.getPaymentStatus(2, 'acc1', 'payment1')).to.equal(null);
  });

  it('returns null when the account and payment do not match', function () {
    this.timeout(400);
    simulation.createAccount(1, 'acc1');
    simulation.deposit(2, 'acc1', 1000);
    const paymentId = simulation.pay(3, 'acc1', 500);
    expect(paymentId).to.equal('payment1');
    simulation.createAccount(4, 'acc2');
    expect(simulation.getPaymentStatus(4, 'acc2', paymentId)).to.equal(null);
  });

  it('processes cashback and updates payment status', function () {
    this.timeout(400);
    simulation.createAccount(1, 'acc1');
    simulation.deposit(2, 'acc1', 1000);
    const paymentId = simulation.pay(3, 'acc1', 500);
    expect(paymentId).to.equal('payment1');
    expect(simulation.getPaymentStatus(4, 'acc1', paymentId)).to.equal('IN_PROGRESS');
    simulation.getPaymentStatus(26 * 3600, 'acc1', paymentId);
    expect(
      simulation.getPaymentStatus(24 * 60 * 60 * 1000 + 3, 'acc1', paymentId),
    ).to.equal('CASHBACK_RECEIVED');
    expect(simulation.deposit(28 * 60 * 60 * 1000, 'acc1', 0)).to.equal(510);
  });
});
