const chai = require('chai');
const { expect } = chai;
const InMemoryDatabase = require('../src/inMemoryDatabase');

describe('In-memory Database - Level 3 tests', () => {
  let database;

  beforeEach(() => {
    database = new InMemoryDatabase();
  });

  it('sets and gets timestamped fields', function () {
    this.timeout(400);
    expect(database.setAt('user1', 'name', 'Alice', 100)).to.equal('');
    expect(database.setAt('user1', 'age', '30', 101)).to.equal('');
    expect(database.getAt('user1', 'name', 102)).to.equal('Alice');
    expect(database.getAt('user1', 'age', 103)).to.equal('30');
  });

  it('gets missing timestamped records and fields', function () {
    this.timeout(400);
    expect(database.getAt('user2', 'name', 100)).to.equal('');
    expect(database.getAt('user1', 'non_existent', 101)).to.equal('');
  });

  it('expires a field at the end of its TTL interval', function () {
    this.timeout(400);
    expect(database.setAtWithTtl('user1', 'name', 'Alice', 100, 10)).to.equal('');
    expect(database.getAt('user1', 'name', 105)).to.equal('Alice');
    expect(database.getAt('user1', 'name', 110)).to.equal('');
    expect(database.getAt('user1', 'name', 115)).to.equal('');
  });

  it('removes expiry when overwritten without a TTL', function () {
    this.timeout(400);
    expect(database.setAtWithTtl('user1', 'name', 'Alice', 100, 10)).to.equal('');
    expect(database.setAt('user1', 'name', 'Bob', 105)).to.equal('');
    expect(database.getAt('user1', 'name', 110)).to.equal('Bob');
    expect(database.getAt('user1', 'name', 140)).to.equal('Bob');
  });

  it('resets expiry when overwritten with another TTL', function () {
    this.timeout(400);
    expect(database.setAtWithTtl('user1', 'name', 'Alice', 100, 10)).to.equal('');
    expect(database.getAt('user1', 'name', 105)).to.equal('Alice');
    expect(database.setAtWithTtl('user1', 'name', 'Bob', 106, 10)).to.equal('');
    expect(database.getAt('user1', 'name', 110)).to.equal('Bob');
    expect(database.getAt('user1', 'name', 117)).to.equal('');
  });

  it('keeps legacy get behavior for fields with TTL values', function () {
    this.timeout(400);
    expect(database.setAtWithTtl('user1', 'name', 'Alice', 100, 10)).to.equal('');
    expect(database.setAtWithTtl('user1', 'age', '30', 101, 5)).to.equal('');
    expect(database.setAtWithTtl('user1', 'city', 'NY', 102, 15)).to.equal('');
    expect(database.get('user1', 'name')).to.equal('Alice');
    expect(database.get('user1', 'age')).to.equal('30');
    expect(database.get('user1', 'city')).to.equal('NY');
  });

  it('scans only fields alive at a timestamp', function () {
    this.timeout(400);
    expect(database.setAtWithTtl('user1', 'name', 'Alice', 100, 10)).to.equal('');
    expect(database.setAtWithTtl('user1', 'age', '30', 101, 5)).to.equal('');
    expect(database.setAtWithTtl('user1', 'city', 'NY', 102, 15)).to.equal('');
    expect(database.scanAt('user1', 105)).to.equal('age(30), city(NY), name(Alice)');
    expect(database.scanAt('user1', 106)).to.equal('city(NY), name(Alice)');
    expect(database.scanAt('user1', 110)).to.equal('city(NY)');
    expect(database.scanAt('user1', 116)).to.equal('city(NY)');
    expect(database.scanAt('user1', 117)).to.equal('');
  });

  it('keeps legacy scan behavior for fields with TTL values', function () {
    this.timeout(400);
    expect(database.setAtWithTtl('user1', 'name', 'Alice', 100, 10)).to.equal('');
    expect(database.setAtWithTtl('user1', 'age', '30', 101, 5)).to.equal('');
    expect(database.setAtWithTtl('user1', 'city', 'NY', 102, 15)).to.equal('');
    expect(database.scan('user1')).to.equal('age(30), city(NY), name(Alice)');
  });

  it('scans live fields by prefix at a timestamp', function () {
    this.timeout(400);
    expect(database.setAtWithTtl('user1', 'name', 'Alice', 100, 10)).to.equal('');
    expect(database.setAtWithTtl('user1', 'age', '30', 101, 5)).to.equal('');
    expect(database.setAtWithTtl('user1', 'city', 'NY', 102, 15)).to.equal('');
    expect(database.setAtWithTtl('user1', 'nationality', 'free_country', 103, 5)).to.equal('');
    expect(database.scanByPrefixAt('user1', 'a', 105)).to.equal('age(30)');
    expect(database.scanByPrefixAt('user1', 'a', 106)).to.equal('');
    expect(database.scanByPrefixAt('user1', 'n', 107)).to.equal(
      'name(Alice), nationality(free_country)',
    );
    expect(database.scanByPrefixAt('user1', 'n', 109)).to.equal('name(Alice)');
  });

  it('keeps legacy prefix scan behavior for fields with TTL values', function () {
    this.timeout(400);
    expect(database.setAtWithTtl('user1', 'name', 'Alice', 100, 10)).to.equal('');
    expect(database.setAtWithTtl('user1', 'age', '30', 101, 5)).to.equal('');
    expect(database.setAtWithTtl('user1', 'city', 'NY', 102, 15)).to.equal('');
    expect(database.setAtWithTtl('user1', 'nationality', 'free_country', 103, 5)).to.equal('');
    expect(database.scanByPrefix('user1', 'a')).to.equal('age(30)');
    expect(database.scanByPrefix('user1', 'n')).to.equal(
      'name(Alice), nationality(free_country)',
    );
  });
});
