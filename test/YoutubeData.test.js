// const YoutubeData = artifacts.require("./YoutubeData.sol");

// contract("YoutubeData", (accounts) => {
//   let contractInstance;
//   before(async () => {
//     await YoutubeData.deployed().then((instance) => {
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

//   it("initializes the contract with the correct values", async () => {
//     const admin = await contractInstance.admin();
//     assert.equal(admin, accounts[0]);
//   });

//   it("test signUp function", async () => {
//     const _userName = "hamZAhir";
//     const _profileImag = "mnbifngkdndfngndfi9u8eig8ug";
//     await contractInstance.signUp(_userName, _profileImag, {
//       from: accounts[0],
//     });
//     const _userId = await contractInstance.userId(accounts[0]);
//     assert.equal(_userId.toNumber(), 1, _userId);
//     const _userData = await contractInstance.users(_userId.toNumber());
//     assert.equal(_userData.id, 1);
//     assert.equal(_userData.userName, _userName);
//     assert.equal(_userData.userAddress, accounts[0]);
//     assert.equal(_userData.profileImag, _profileImag);
//   });

//   it("try to  signUp again", async () => {
//     const _userName = "hamza";
//     const _profileImag = "mnbifngkdndf";
//     await contractInstance
//       .signUp(_userName, _profileImag, {
//         from: accounts[0],
//       })
//       .then(assert.fail)
//       .catch(function (error) {
//         assert(
//           error.message.indexOf("revert" >= 0, "You have already registered")
//         );
//       });
//   });

//   it("Changing personal information by an account that is not an owner ", async () => {
//     // change Name :
//     const _newUserName = "newName";
//     // const _newProfileImag = "newImgHash";
//     await contractInstance
//       .changeName(_newUserName, {
//         from: accounts[1],
//       })
//       .then(assert.fail)
//       .catch(function (error) {
//         assert(error.message.indexOf("revert" >= 0));
//       });
//   });


// });
