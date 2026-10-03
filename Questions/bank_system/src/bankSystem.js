const BankSystemInterface = require('./bankSystemInterface');

class BankSystem extends BankSystemInterface {
  constructor() {
    super();
    // TODO: implement
  }

  // ========== Level 1 Operations ==========

  createAccount(timestamp, accountId) {
    // TODO: implement
  }

  deposit(timestamp, accountId, amount) {
    // TODO: implement
  }

  transfer(timestamp, sourceAccountId, targetAccountId, amount) {
    // TODO: implement
  }

  // ========== Level 2 Operations ==========

  topSpenders(timestamp, n) {
    // TODO: implement
  }

  // ========== Level 3 Operations ==========

  pay(timestamp, accountId, amount) {
    // TODO: implement
  }

  getPaymentStatus(timestamp, accountId, payment) {
    // TODO: implement
  }

  // ========== Level 4 Operations ==========

  mergeAccounts(timestamp, accountId1, accountId2) {
    // TODO: implement
  }

  getBalance(timestamp, accountId, timeAt) {
    // TODO: implement
  }
}

module.exports = BankSystem;
