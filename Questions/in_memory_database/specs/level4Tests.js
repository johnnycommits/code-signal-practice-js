const chai = require('chai');
const { expect } = chai;
const InMemoryDatabase = require('../src/inMemoryDatabase');

describe('In-memory Database - Level 4 tests', () => {
  let database;

  beforeEach(() => {
    database = new InMemoryDatabase();
  });

  it('returns the number of records in a backup', function () {
    this.timeout(400);
    expect(database.setAtWithTtl('A', 'B', 'C', 1, 10)).to.equal('');
    expect(database.backup(3)).to.equal('1');
  });

  it('excludes expired records from a backup', function () {
    this.timeout(400);
    database.setAtWithTtl('A', 'B', 'C', 1, 10);
    expect(database.backup(12)).to.equal('0');
  });

  it('restores the latest eligible backup and recalculates TTL', function () {
    this.timeout(400);
    database.setAtWithTtl('A', 'B', 'C', 1, 10);
    database.backup(3);
    database.setAt('A', 'D', 'E', 4);
    database.backup(5);
    database.deleteAt('A', 'B', 8);
    database.backup(9);
    database.restore(10, 7);
    expect(database.setAt('B', 'C', 'D', 11)).to.equal('');
    expect(database.scanAt('A', 15)).to.equal('B(C), D(E)');
    expect(database.scanAt('A', 16)).to.equal('D(E)');
    expect(database.scanAt('B', 17)).to.equal('C(D)');
  });
});
