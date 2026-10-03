const chai = require('chai');
const { expect } = chai;
const InMemoryDatabase = require('../src/inMemoryDatabase');

describe('In-memory Database - Sandbox tests (unofficial)', () => {
  it.skip('is available for your own experiments', function () {
    this.timeout(400);
    const database = new InMemoryDatabase();

    // Add temporary expectations here. This file is not part of the official suite.
    expect(database).to.be.instanceOf(InMemoryDatabase);
  });
});
