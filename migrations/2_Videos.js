const Videos = artifacts.require("Videos");

module.exports = function (deployer) {
  deployer.deploy(Videos);
};
