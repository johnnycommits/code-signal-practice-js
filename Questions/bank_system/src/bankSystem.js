const BankSystemInterface = require("./bankSystemInterface");

class BankSystem extends BankSystemInterface {
  constructor() {
    super();
    this.accounts = new Map();
  }

  createAccount(timestamp, accountId) {
    if (this.accounts.has(accountId)) return false;

    this.accounts.set(accountId, { balance: 0 });
    return true;
  }

  deposit(timestamp, accountId, amount) {
    if (!this.accounts.has(accountId)) return null;

    const account = this.accounts.get(accountId);
    const balance = account.balance;

    this.accounts.set(accountId, {
      ...account,
      balance: balance + amount,
    });

    return this.accounts.get(accountId).balance;
  }

  transfer(timestamp, sourceAccountId, targetAccountId, amount) {
    const isInvalidTransaction =
      sourceAccountId === targetAccountId ||
      !this.accounts.has(sourceAccountId) ||
      !this.accounts.has(targetAccountId);

    if (isInvalidTransaction) return null;

    const sourceAccount = this.accounts.get(sourceAccountId);
    const targetAccount = this.accounts.get(targetAccountId);

    if (sourceAccount.balance < amount) return null;

    sourceAccount.balance -= amount;
    targetAccount.balance += amount;

    return sourceAccount.balance;
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
