const Comments = artifacts.require("./Comments.sol");
contract("Comments", (accounts) => {
  let contractInstance;
  before(async () => {
    await Comments.deployed().then((instance) => {
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

  it("add comment to Video", async () => {
    // ...........signUp first............:
    await contractInstance.signUp("Zahir", "", {
      from: accounts[0],
    });

    await contractInstance.signUp("Hamza", "", {
      from: accounts[1],
    });

    // ............ then download some Video..............:

    const _videoHash = "videoHash";
    const _videoTayp = "Music";
    const _videoTitle = "same title";
    await contractInstance.downloadVideo(_videoHash, _videoTayp,_videoTitle, {
      from: accounts[0],
    });

    // ............ then comment to Video..............:

    const _commentMessag = "nice video";

    await contractInstance.addComment(1, _commentMessag, {
      from: accounts[1],
    });
    const _video = await contractInstance.getVideo(1);
    assert.equal(_video.commentsIds.length, 1);
    assert.equal(_video.commentsIds[0], 1);
    const _VideoComment = await contractInstance.getVideoComment(1, 1);
    assert.equal(_VideoComment.id, 1);
    assert.equal(_VideoComment.owner, accounts[1]);
    assert.equal(_VideoComment.comment, _commentMessag);
    assert.equal(_VideoComment.likes.length, 0);
    assert.equal(_VideoComment.dislike.length, 0);
    assert.equal(_VideoComment.repliesIds.length, 0);
  });

  it("like Comment ", async () => {
    await contractInstance.likeComment(1, 1, {
      from: accounts[0],
    });
    await contractInstance.likeComment(1, 1, {
      from: accounts[1],
    });
    const _VideoComment = await contractInstance.getVideoComment(1, 1);

    assert.equal(_VideoComment.likes.length, 2);
    assert.equal(_VideoComment.likes[0], accounts[0]);
    assert.equal(_VideoComment.likes[1], accounts[1]);
  });

  it("click like button again", async () => {
    await contractInstance.likeComment(1, 1, {
      from: accounts[0],
    });

    const _VideoComment = await contractInstance.getVideoComment(1, 1);
    assert.equal(
      _VideoComment.likes[0],
      0x0000000000000000000000000000000000000000
    );
    assert.equal(_VideoComment.likes[1], accounts[1]);
  });

  it("dislik Comment ", async () => {
    await contractInstance.dislikeComment(1, 1, {
      from: accounts[0],
    });

    const _VideoComment = await contractInstance.getVideoComment(1, 1);
    assert.equal(_VideoComment.dislike.length, 1);
    assert.equal(_VideoComment.dislike[0], accounts[0]);
  });


 it("change from like to dislike and vice versa", async () => {
    await contractInstance.likeComment(1, 1, { from: accounts[0] });
    await contractInstance.dislikeComment(1, 1, { from: accounts[1] });

    const _VideoComment = await contractInstance.getVideoComment(1,1);

    assert.equal(_VideoComment.likes[0], 0x0000000000000000000000000000000000000000);
    assert.equal(_VideoComment.likes[1], 0x0000000000000000000000000000000000000000);
    assert.equal(_VideoComment.likes[2], accounts[0]);

    assert.equal(_VideoComment.dislike[0], 0x0000000000000000000000000000000000000000);
    assert.equal(_VideoComment.dislike[1], accounts[1]);
  });

  it("click dislike button again", async () => {

        await contractInstance.dislikeComment(1, 1, { from: accounts[1] });

    const _VideoComment = await contractInstance.getVideoComment(1, 1);

    assert.equal(
      _VideoComment.dislike[1],
      0x0000000000000000000000000000000000000000
    );
  });



  it("try to delet Comment from account not owner not video owner", async () => {
    // ...........signUp first............:

    const _userName3 = "user2";
    const _profileImag = "";
    await contractInstance.signUp(_userName3, _profileImag, {
      from: accounts[2],
    });

    await contractInstance
      .deletComment(1, 1, {
        from: accounts[2],
      })
      .then(assert.fail)
      .catch(function (error) {
        assert(error.message.indexOf("revert" >= 0));
      });
  });

  it("delet Comment from video owner ", async () => {
    await contractInstance.deletComment(1, 1, {
      from: accounts[0],
    });

    const _video = await contractInstance.getVideo(1);
    assert.equal(_video.commentsIds[0], 0);
    const _VideoComment = await contractInstance.getVideoComment(1, 1);
    assert.equal(_VideoComment.id, 0);
    assert.equal(_VideoComment.comment, "");
    assert.equal(
      _VideoComment.owner,
      0x0000000000000000000000000000000000000000
    );
  });

});
