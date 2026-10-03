const chai = require("chai");
const { expect } = chai;
const BankSystem = require("../src/bankSystem");

describe("Bank System - Sandbox tests (unofficial)", () => {
  let simulation;

  beforeEach(() => {
    simulation = new BankSystem();
  });

  it("my experiment", function () {
    this.timeout(400);
    expect(simulation.createAccount(1, "acc1")).to.equal(true);
    expect(simulation.createAccount(2, "acc2")).to.equal(true);
    expect(simulation.deposit(3, "acc1", 1000)).to.equal(1000);
    expect(simulation.transfer(4, "acc1", "acc2", 300)).to.equal(700);
    expect(simulation.transfer(5, "acc1", "acc2", 800)).to.equal(null);
    expect(simulation.transfer(6, "acc1", "non_existent", 100)).to.equal(null);
    expect(simulation.transfer(7, "acc1", "acc1", 100)).to.equal(null);
  });
});
