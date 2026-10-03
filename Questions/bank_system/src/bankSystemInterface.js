class BankSystemInterface {
  createAccount(timestamp, accountId) {
    throw new Error('Not implemented');
  }

  deposit(timestamp, accountId, amount) {
    throw new Error('Not implemented');
  }

  transfer(timestamp, sourceAccountId, targetAccountId, amount) {
    throw new Error('Not implemented');
  }

  topSpenders(timestamp, n) {
    throw new Error('Not implemented');
  }

  pay(timestamp, accountId, amount) {
    throw new Error('Not implemented');
  }

  getPaymentStatus(timestamp, accountId, payment) {
    throw new Error('Not implemented');
  }

  mergeAccounts(timestamp, accountId1, accountId2) {
    throw new Error('Not implemented');
  }

  getBalance(timestamp, accountId, timeAt) {
    throw new Error('Not implemented');
  }
}

module.exports = BankSystemInterface;
