const chai = require('chai');
const { expect } = chai;
const BankSystem = require('../src/bankSystem');

describe('Bank System - Sandbox tests (unofficial)', () => {
  it.skip('is available for your own experiments', function () {
    this.timeout(400);
    const bankSystem = new BankSystem();

    // Add temporary expectations here. This file is not part of the official suite.
    expect(bankSystem).to.be.instanceOf(BankSystem);
  });
});
