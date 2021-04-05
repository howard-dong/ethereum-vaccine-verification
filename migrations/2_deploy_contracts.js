const VaccineVerification = artifacts.require("./VaccineVerification.sol");

module.exports = function(deployer) {
  deployer.deploy(VaccineVerification);
};