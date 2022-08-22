const Videos = artifacts.require("./Videos.sol");
contract("Videos", (accounts) => {
  let contractInstance;
  before(async () => {
    await Videos.deployed().then((instance) => {
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

  it("download Video", async () => {
    // ...........signUp first............:

    const _userName = "hamZAhir";
    const _profileImag = "mnbifngkdndfngndfi9u8eig8ug";
    await contractInstance.signUp(_userName, _profileImag, {
      from: accounts[0],
    });

    // ............ then download Video..............:

    const _videoHash = "videoHash";
    const _videoTayp = "Music";
    const _videoTitle = "same title";
    await contractInstance.downloadVideo(_videoHash, _videoTayp, _videoTitle, {
      from: accounts[0],
    });

    const _userData = await contractInstance.getUserByAddress(accounts[0]);
    assert.equal(_userData.userVideos.length, 1);
    assert.equal(_userData.userVideos[0], 1);

    const _video = await contractInstance.getVideo(1);
    assert.equal(_video.id, 1);
    assert.equal(_video.videoHash, _videoHash);
    assert.equal(_video.videoTayp, _videoTayp);
    assert.equal(_video.owner, accounts[0]);
    assert.equal(_video.likes.length, 0);
    assert.equal(_video.dislike.length, 0);
    assert.equal(_video.commentsIds.length, 0);
  });

  it("like and dislike Video ", async () => {
    // ...........signUp first............:

    const _userName1 = "user1";
    const _userName2 = "user2";
    const _profileImag = "h8uh78h8";
    await contractInstance.signUp(_userName1, _profileImag, {
      from: accounts[1],
    });
    await contractInstance.signUp(_userName2, _profileImag, {
      from: accounts[2],
    });

    await contractInstance.likeVideo(1, { from: accounts[1] });
    await contractInstance.dislikeVideo(1, { from: accounts[2] });
    const _video = await contractInstance.getVideo(1);
    assert.equal(_video.likes[0], accounts[1]);
    assert.equal(_video.dislike[0], accounts[2]);
  });

  it("change from like to dislike and vice versa", async () => {
    await contractInstance.likeVideo(1, { from: accounts[2] });
    await contractInstance.dislikeVideo(1, { from: accounts[1] });

    const _video = await contractInstance.getVideo(1);
    assert.equal(_video.likes[0], 0x0000000000000000000000000000000000000000);
    assert.equal(_video.dislike[0], 0x0000000000000000000000000000000000000000);
    assert.equal(_video.likes[1], accounts[2]);
    assert.equal(_video.dislike[1], accounts[1]);
  });

  it("Try pressing the buttons of like and dislike again", async () => {
    await contractInstance.likeVideo(1, { from: accounts[2] });
    await contractInstance.dislikeVideo(1, { from: accounts[1] });

    const _video = await contractInstance.getVideo(1);
    assert.equal(_video.likes[0], 0x0000000000000000000000000000000000000000);
    assert.equal(_video.dislike[0], 0x0000000000000000000000000000000000000000);
    assert.equal(_video.likes[1], 0x0000000000000000000000000000000000000000);
    assert.equal(_video.dislike[1], 0x0000000000000000000000000000000000000000);
  });

  it("get All Videos", async () => {
    // ........... download some Videos first ............:

    const _videoHash2 = "video2Hash";
    const _videoTayp2 = "animals";
    const _videoHash3 = "video3Hash";
    const _videoTayp3 = "Music";
    const _videoTitle = "same title";
    await contractInstance.downloadVideo(_videoHash2, _videoTayp2, _videoTitle, {
      from: accounts[1],
    });
    await contractInstance.downloadVideo(_videoHash3, _videoTayp3, _videoTitle, {
      from: accounts[1],
    });
    const _vidios = await contractInstance.getAllVideos();

    assert.equal(_vidios.length, 3);
    assert.equal(_vidios[0].id, 1);
    assert.equal(_vidios[1].id, 2);
    assert.equal(_vidios[2].id, 3);
  });

  it("get Video By Type", async () => {
    const _vidios = await contractInstance.getAllVideoByType("Music");
    assert.equal(_vidios.length, 2);
    assert.equal(_vidios[0].id, 1);
    assert.equal(_vidios[1].id, 3);
  });
  it("get User Videos By Id ", async () => {
    const _userVideos = await contractInstance.getUserVideosById(2);
    assert.equal(_userVideos.length, 2);
    assert.equal(_userVideos[0].id, 2);
    assert.equal(_userVideos[1].id, 3);

  });
  it("get User Videos By Address ", async () => {
    const _userVideos = await contractInstance.getUserVideosByAddress(accounts[1]);
    assert.equal(_userVideos.length, 2);
    assert.equal(_userVideos[0].id, 2);
    assert.equal(_userVideos[1].id, 3);

  });
  it("try to delet video by an account that is not owner ", async () => {
    await contractInstance.deleteVideo(2, {from: accounts[0]})
    .then(assert.fail)
          .catch(function (error) {
            assert(error.message.indexOf("revert" >= 0));
          });

  });

  it("delet video by owner account", async () => {
    await contractInstance.deleteVideo(2, {from: accounts[1]});

    const _userData = await contractInstance.getUserByAddress(accounts[1]);

    assert.equal(_userData.userVideos.length, 2);
    assert.equal(_userData.userVideos[0], 0);
    assert.equal(_userData.userVideos[1], 3);
    const _video = await contractInstance.getVideo(2);
    assert.equal(_video.id, 0);
    assert.equal(_video.videoHash, "");
    assert.equal(_video.videoTayp, "");
    assert.equal(_video.owner, 0x0000000000000000000000000000000000000000);
    assert.equal(_video.likes.length, 0);
    assert.equal(_video.dislike.length, 0);
    assert.equal(_video.commentsIds.length, 0);

  });

});
