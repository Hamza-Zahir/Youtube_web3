const Youtube = artifacts.require("Youtube");
// const Replys = artifacts.require("Replys");
// const Comments = artifacts.require("Comments");
// const Videos = artifacts.require("Videos");
// const YoutubeData = artifacts.require("YoutubeData");


module.exports = function (deployer) {
  deployer.deploy(Youtube);
};

