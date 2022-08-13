// const Youtube = artifacts.require("./Youtube.sol");

// contract("Youtube", (accounts) => {
//   let contractInstance;
//   before(async () => {
//     await Youtube.deployed().then((instance) => {
//       contractInstance = instance;
//     });
//   });

//   it("deploys successfully", async () => {
//     const address = await contractInstance.address;
//     assert.notEqual(address, 0x0);
//     assert.notEqual(address, "");
//     assert.notEqual(address, null);
//     assert.notEqual(address, undefined);
//   });



//   it("download Video", async () => {
//     const _videoHash = "videoHash";
//     const _videoTayp = "Music";
//     await contractInstance
//     .downloadVideo(_videoHash, _videoTayp, {
//       from: accounts[0],
//     })

//     const _userData = await contractInstance.getUserByAddress(accounts[0]);
//     assert.equal(_userData.userVideos.length, 1);
//     assert.equal(_userData.userVideos[0], 1);

//     const _video = await contractInstance.videos(1);

// console.log(_video);
//     // videos

//     // users[userId[msg.sender]].userVideos.push(videosCount);

//     //   video {
//     //     uint256 id;
//     //     string videoHash;
//     //     string videoTayp;
//     //     uint256 timestamp;
//     //     address owner;
//     //     address[] likes;
//     //     address[] dislike;
//     //     comment[] comments;
//     // }
//   });
// });
