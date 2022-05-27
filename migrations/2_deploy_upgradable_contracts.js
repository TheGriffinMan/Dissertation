const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Funding = artifacts.require("Funding");

module.exports = async function (deployer) {
  await deployProxy(Funding, [], { deployer, initializer: false });
};