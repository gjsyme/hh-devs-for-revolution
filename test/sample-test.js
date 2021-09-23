const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Contract", function(){
  it("Should return the new contract once changed", async function () {
    const Dev = await ethers.getContractFactory("Dev");
    const dev = await Dev.deploy();
    await dev.deployed();

    expect(await dev.getClothing(1)).to.equal("White Tanktop");
  })
})