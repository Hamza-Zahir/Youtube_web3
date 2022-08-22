const Youtube = artifacts.require("./Youtube.sol");

contract("Youtube", (accounts) => {
  let contractInstance;
  before(async () => {
    await Youtube.deployed().then((instance) => {
      contractInstance = instance;
    });
  });

  it("deploys successfully", async () => {
    const address = await contractInstance.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("Changing personal information", async () => {
    // ...........signUp first............:

    const _userName = "hamZAhir";
    const _profileImag = "mnbifngkdndfngndfi9u8eig8ug";
    await contractInstance.signUp(_userName, _profileImag, {
      from: accounts[0],
    });

    // ...........then change Name............:

    const _newUserName = "newName";
    const _newProfileImag = "newImgHash";
    await contractInstance.changeName(_newUserName, {
      from: accounts[0],
    });
    await contractInstance.changeProfileImag(_newProfileImag, {
      from: accounts[0],
    });
    const _user = await contractInstance.getUserByAddress(accounts[0]);

    assert.equal(_user.userName, _newUserName);
    assert.equal(_user.profileImag, _newProfileImag);
  });

  it("save Video", async () => {
    // ...........signUp first............:

    const _userName = "alex";
    const _profileImag = "";
    await contractInstance.signUp(_userName, _profileImag, {
      from: accounts[1],
    });

    // ...........then save video............:

    await contractInstance.saveVideo(1, {
      from: accounts[1],
    });
    const _user = await contractInstance.getUserByAddress(accounts[1]);
    assert.equal(_user.videoSaved.length, 1);
    assert.equal(_user.videoSaved[0], 1);
  });
  it("delete saved Video", async () => {
    await contractInstance.deleteSavedVideo(1, {
      from: accounts[1],
    });
    const _user = await contractInstance.getUserByAddress(accounts[1]);
    assert.equal(_user.videoSaved[0], 0);
  });

  it("try to delete user from account not admin", async () => {
    await contractInstance
      .deletUser(accounts[0], {
        from: accounts[1],
      })
      .then(assert.fail)
      .catch(function (error) {
        assert(error.message.indexOf("revert" >= 0));
      });
  });

  it("delete user from admin", async () => {
    await contractInstance.deletUser(accounts[1], {
      from: accounts[0],
    });

    const _user = await contractInstance.getUserByAddress(accounts[1]);
    assert.equal(_user.id, 0);
    assert.equal(_user.userName, "");
    assert.equal(_user.profileImag, "");
    assert.equal(_user.userAddress, 0x0000000000000000000000000000000000000000);

  });
  
  it("change  admin", async () => {
    const _oldAdmin = await contractInstance.admin();
    await contractInstance.changeAdmin(accounts[1], {
      from: accounts[0],
    });
    const _newAdmin = await contractInstance.admin();

    assert.equal(_oldAdmin, accounts[0]);
    assert.equal(_newAdmin, accounts[1]);
  });
});
