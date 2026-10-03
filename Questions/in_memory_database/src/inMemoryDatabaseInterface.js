class InMemoryDatabaseInterface {
  set(key, field, value) {
    throw new Error('Not implemented');
  }

  get(key, field) {
    throw new Error('Not implemented');
  }

  delete(key, field) {
    throw new Error('Not implemented');
  }

  scan(key) {
    throw new Error('Not implemented');
  }

  scanByPrefix(key, prefix) {
    throw new Error('Not implemented');
  }

  setAt(key, field, value, timestamp) {
    throw new Error('Not implemented');
  }

  setAtWithTtl(key, field, value, timestamp, ttl) {
    throw new Error('Not implemented');
  }

  deleteAt(key, field, timestamp) {
    throw new Error('Not implemented');
  }

  getAt(key, field, timestamp) {
    throw new Error('Not implemented');
  }

  scanAt(key, timestamp) {
    throw new Error('Not implemented');
  }

  scanByPrefixAt(key, prefix, timestamp) {
    throw new Error('Not implemented');
  }

  backup(timestamp) {
    throw new Error('Not implemented');
  }

  restore(timestamp, timestampToRestore) {
    throw new Error('Not implemented');
  }
}

module.exports = InMemoryDatabaseInterface;
