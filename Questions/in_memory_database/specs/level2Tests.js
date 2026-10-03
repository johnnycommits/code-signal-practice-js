const chai = require('chai');
const { expect } = chai;
const InMemoryDatabase = require('../src/inMemoryDatabase');

describe('In-memory Database - Level 2 tests', () => {
  let database;

  beforeEach(() => {
    database = new InMemoryDatabase();
  });

  it('scans fields in lexicographical order', function () {
    this.timeout(400);
    expect(database.set('user1', 'name', 'Alice')).to.equal('');
    expect(database.set('user1', 'age', '30')).to.equal('');
    expect(database.set('user1', 'city', 'NY')).to.equal('');
    expect(database.set('user1', 'abc', '123')).to.equal('');
    expect(database.scan('user1')).to.equal('abc(123), age(30), city(NY), name(Alice)');
    expect(database.scan('non_existent')).to.equal('');
  });

  it('scans fields by prefix in lexicographical order', function () {
    this.timeout(400);
    expect(database.set('user1', 'name', 'Alice')).to.equal('');
    expect(database.set('user1', 'age', '30')).to.equal('');
    expect(database.set('user1', 'city', 'NY')).to.equal('');
    expect(database.set('user1', 'abc', '123')).to.equal('');
    expect(database.scanByPrefix('user1', 'a')).to.equal('abc(123), age(30)');
    expect(database.scanByPrefix('user1', 'n')).to.equal('name(Alice)');
    expect(database.scanByPrefix('user1', 'xyz')).to.equal('');
  });
});
