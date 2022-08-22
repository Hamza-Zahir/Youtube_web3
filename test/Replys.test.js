const Replys = artifacts.require("./Replys.sol");
contract("Replys", (accounts) => {
  let contractInstance;
  before(async () => {
    await Replys.deployed().then((instance) => {
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

  it("add Replys to comment", async () => {
    // ...........signUp first............:
    await contractInstance.signUp("Zahir", "", {
      from: accounts[0],
    });
    await contractInstance.signUp("mona", "", {
      from: accounts[1],
    });
    await contractInstance.signUp("alex", "", {
      from: accounts[2],
    });
    await contractInstance.signUp("sara", "", {
      from: accounts[3],
    });

    // ............ then download some Video..............:

    const _videoHash = "videoHash";
    const _videoTayp = "Music";
    const _videoTitle = "same title";
    await contractInstance.downloadVideo(_videoHash, _videoTayp, _videoTitle, {
      from: accounts[0],
    });

    // ............ then comment to Video..............:

    const _commentMessag = "nice video";

    await contractInstance.addComment(1, _commentMessag, {
      from: accounts[1],
    });
    // ............ then Reply to comment ..............:

    const _ReplyMessag = "thank you for your comment";

    await contractInstance.addReply(1, 1, _ReplyMessag, {
      from: accounts[0],
    });

    const _VideoComment = await contractInstance.getVideoComment(1, 1);
    assert.equal(_VideoComment.repliesIds.length, 1);
    assert.equal(_VideoComment.repliesIds[0], 1);
    const _CommentReply = await contractInstance.getCommentReply(1, 1, 1);
    assert.equal(_CommentReply.id, 1);
    assert.equal(_CommentReply.owner, accounts[0]);
    assert.equal(_CommentReply.reply, _ReplyMessag);
    assert.equal(_CommentReply.likes.length, 0);
    assert.equal(_CommentReply.dislike.length, 0);
  });

  it("like Reply ", async () => {
    await contractInstance.likeReply(1, 1, 1, {
      from: accounts[1],
    });
    await contractInstance.likeReply(1, 1, 1, {
      from: accounts[2],
    });
    const _CommentReply = await contractInstance.getCommentReply(1, 1, 1);

    assert.equal(_CommentReply.likes.length, 2);
    assert.equal(_CommentReply.likes[0], accounts[1]);
    assert.equal(_CommentReply.likes[1], accounts[2]);
  });

  it("click like button again", async () => {
    await contractInstance.likeReply(1, 1, 1, {
      from: accounts[1],
    });

    const _CommentReply = await contractInstance.getCommentReply(1, 1, 1);
    assert.equal(
      _CommentReply.likes[0],
      0x0000000000000000000000000000000000000000
    );
    assert.equal(_CommentReply.likes[1], accounts[2]);
  });

  it("dislik Reply ", async () => {
    await contractInstance.dislikeReply(1, 1, 1, {
      from: accounts[1],
    });

    const _CommentReply = await contractInstance.getCommentReply(1, 1, 1);
    assert.equal(_CommentReply.dislike.length, 1);
    assert.equal(_CommentReply.dislike[0], accounts[1]);
  });

  it("change from like to dislike and vice versa", async () => {
    await contractInstance.likeReply(1, 1, 1, { from: accounts[1] });
    await contractInstance.dislikeReply(1, 1, 1, { from: accounts[2] });

    const _CommentReply = await contractInstance.getCommentReply(1, 1, 1);

    assert.equal(
      _CommentReply.likes[0],
      0x0000000000000000000000000000000000000000
    );
    assert.equal(
      _CommentReply.likes[1],
      0x0000000000000000000000000000000000000000
    );
    assert.equal(_CommentReply.likes[2], accounts[1]);
    assert.equal(
      _CommentReply.dislike[0],
      0x0000000000000000000000000000000000000000
    );
    assert.equal(_CommentReply.dislike[1], accounts[2]);
  });

  it("click dislike button again", async () => {
    await contractInstance.dislikeReply(1, 1, 1, { from: accounts[2] });

    const _CommentReply = await contractInstance.getCommentReply(1, 1, 1);
    assert.equal(
      _CommentReply.dislike[1],
      0x0000000000000000000000000000000000000000
    );
  });

  it("try to delet Reply from account not owner and not video owner", async () => {
    await contractInstance
      .deletReply(1, 1, 1, {
        from: accounts[3],
      })
      .then(assert.fail)
      .catch(function (error) {
        assert(error.message.indexOf("revert" >= 0));
      });
  });

  it("delet Reply from video owner ", async () => {
    await contractInstance.deletReply(1, 1, 1, {
      from: accounts[0],
    });

    const _VideoComment = await contractInstance.getVideoComment(1, 1);
    assert.equal(_VideoComment.repliesIds[0], 0);

    const _CommentReply = await contractInstance.getCommentReply(1, 1, 1);
    assert.equal(_CommentReply.id, 0);
    assert.equal(_CommentReply.reply, "");
    assert.equal(
      _CommentReply.owner,
      0x0000000000000000000000000000000000000000
    );
  });
});
