const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TEKA Token", function () {

  async function deployTEKAToken() {
    const [owner, otherAccount] = await ethers.getSigners();

    const TEKAToken = await ethers.getContractFactory("TEKAToken");
    const teka = await TEKAToken.deploy();

    return { teka, owner, otherAccount };
  }

  it("Should have correct name", async function () {
    const { teka } = await deployTEKAToken();

    expect(await teka.name()).to.equal("TEKA Token");
  });


  it("Should have correct symbol", async function () {
    const { teka } = await deployTEKAToken();

    expect(await teka.symbol()).to.equal("TEKA");
  });


  it("Should mint 100 million TEKA tokens", async function () {
    const { teka, owner } = await deployTEKAToken();

    const balance = await teka.balanceOf(owner.address);

    expect(balance).to.equal(
      ethers.parseEther("100000000")
    );
  });


  it("Should transfer TEKA tokens", async function () {
    const { teka, owner, otherAccount } = await deployTEKAToken();

    await teka.transfer(
      otherAccount.address,
      ethers.parseEther("100")
    );

    expect(
      await teka.balanceOf(otherAccount.address)
    ).to.equal(
      ethers.parseEther("100")
    );
  });

});