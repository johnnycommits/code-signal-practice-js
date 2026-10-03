const BankSystemInterface = require("./bankSystemInterface");

class BankSystem extends BankSystemInterface {
  constructor() {
    super();
    this.accounts = new Map();
    // TODO: implement
    // so bank system needs to store accounts. an array is no good, so ideally we want an object like interface.
    // 2. in the same style, for deposits, we look up the key, then add to the balance if the account exists
    // 3. for transfer, we get both the source, the target, first check if the amount is less than the current balance, then transfer it to the target
  }

  // ========== Level 1 Operations ==========

  // 1.for 'createAccount' basically create a new key in the Map if the key is not already taken,
  // and return false if it already is, and true if the new account was created successfully
  createAccount(timestamp, accountId) {
    if (this.accounts.has(accountId)) return false;

    this.accounts.set(accountId, { amount: null });
    return true;
  }

  //should deposit the given `amount` of money to the specified account `accountId`. Returns the balance of the account after the operation has been processed. If the specified account doesn’t exist, should return `null`.
  deposit(timestamp, accountId, amount) {
    if (!this.accounts.has(accountId)) return null;

    const account = this.accounts.get(accountId);
    const balance = account.amount ?? 0;

    this.accounts.set(accountId, {
      ...account,
      amount: balance + amount,
    });

    return this.accounts.get(accountId).amount;
  }

  // `transfer(timestamp, sourceAccountId, targetAccountId, amount)` — should transfer the given amount of money from account `sourceAccountId` to account `targetAccountId`. Returns the balance of `sourceAccountId` if the transfer was successful or `null` otherwise.
  //  *   Returns `null` if `sourceAccountId` or `targetAccountId` doesn’t exist.
  //  *   Returns `null` if `sourceAccountId` and `targetAccountId` are the same.
  //  *   Returns `null` if account `sourceAccountId` has insufficient funds to perform the transfer.
  transfer(timestamp, sourceAccountId, targetAccountId, amount) {
    const isInvalidTransaction =
      sourceAccountId === targetAccountId ||
      !this.accounts.has(sourceAccountId) ||
      !this.accounts.has(targetAccountId);

    if (isInvalidTransaction) return null;

    const sourceAccount = this.accounts.get(sourceAccountId);
    const targetAccount = this.accounts.get(targetAccountId);

    if (sourceAccount.amount < amount) return null;

    sourceAccount.amount = sourceAccount.amount - amount;
    targetAccount.amount = targetAccount.amount + amount;

    return sourceAccount.amount;
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
