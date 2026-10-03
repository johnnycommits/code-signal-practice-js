const InMemoryDatabaseInterface = require('./inMemoryDatabaseInterface');

class InMemoryDatabase extends InMemoryDatabaseInterface {
  constructor() {
    super();
    // TODO: implement
  }

  // ========== Level 1 Operations ==========

  set(key, field, value) {
    // TODO: implement
  }

  get(key, field) {
    // TODO: implement
  }

  delete(key, field) {
    // TODO: implement
  }

  // ========== Level 2 Operations ==========

  scan(key) {
    // TODO: implement
  }

  scanByPrefix(key, prefix) {
    // TODO: implement
  }

  // ========== Level 3 Operations ==========

  setAt(key, field, value, timestamp) {
    // TODO: implement
  }

  setAtWithTtl(key, field, value, timestamp, ttl) {
    // TODO: implement
  }

  deleteAt(key, field, timestamp) {
    // TODO: implement
  }

  getAt(key, field, timestamp) {
    // TODO: implement
  }

  scanAt(key, timestamp) {
    // TODO: implement
  }

  scanByPrefixAt(key, prefix, timestamp) {
    // TODO: implement
  }

  // ========== Level 4 Operations ==========

  backup(timestamp) {
    // TODO: implement
  }

  restore(timestamp, timestampToRestore) {
    // TODO: implement
  }
}

module.exports = InMemoryDatabase;
