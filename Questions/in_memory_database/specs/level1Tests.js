const chai = require('chai');
const { expect } = chai;
const InMemoryDatabase = require('../src/inMemoryDatabase');

describe('In-memory Database - Level 1 tests', () => {
  let database;

  beforeEach(() => {
    database = new InMemoryDatabase();
  });

  it('sets and gets fields', function () {
    this.timeout(400);
    expect(database.set('user1', 'name', 'Alice')).to.equal('');
    expect(database.set('user1', 'age', '30')).to.equal('');
    expect(database.get('user1', 'name')).to.equal('Alice');
    expect(database.get('user1', 'age')).to.equal('30');
  });

  it('overwrites an existing field', function () {
    this.timeout(400);
    expect(database.set('user1', 'name', 'Alice')).to.equal('');
    expect(database.set('user1', 'name', 'Bob')).to.equal('');
    expect(database.get('user1', 'name')).to.equal('Bob');
  });

  it('gets missing records and fields', function () {
    this.timeout(400);
    expect(database.get('user1', 'field')).to.equal('');
    expect(database.set('user1', 'name', 'Alice')).to.equal('');
    expect(database.get('user1', 'non_existent')).to.equal('');
  });

  it('deletes fields', function () {
    this.timeout(400);
    expect(database.set('user1', 'name', 'Alice')).to.equal('');
    expect(database.delete('user1', 'name')).to.equal('true');
    expect(database.get('user1', 'name')).to.equal('');
    expect(database.delete('user1', 'name')).to.equal('false');
    expect(database.delete('non_existent', 'field')).to.equal('false');
  });
});
