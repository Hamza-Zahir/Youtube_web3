import Web3 from "web3";
import dataContract from "../build/contracts/Youtube.json";
const AbiCcontract = dataContract.abi;
const contractAddres = dataContract.networks[97].address;
let YoutubeContract;

const getYoutubeContract = async () => {
  const ethereum = window.ethereum;
  const web3 = new Web3(Web3.givenProvider || ethereum);
  YoutubeContract = new web3.eth.Contract(AbiCcontract, contractAddres);
};
getYoutubeContract();

export default {
  /*..........................  signUp  .................................. */

  async signUp(_userName, _profileImag, _currentAccount) {
    try {
      await YoutubeContract.methods
        .signUp(_userName, _profileImag)
        .send({ from: _currentAccount });
    } catch (error) {
      console.log(error);
    }
  },
  async getUserByAddress(_userAddress) {
    try {
      let _User;
      const _user = await YoutubeContract.methods
        .getUserByAddress(_userAddress)
        .call();
      if (_user.id) {
        _User = {
          id: _user.id,
          userName: _user.userName,
          userAddress: _user.userAddress,
          profileImag: _user.profileImag,
          userVideos: _user.userVideos,
          videoSaved: _user.videoSaved,
        };
      }
      return _User;
    } catch (error) {
      console.log(error);
    }
  },
  async getUserById(_userAddress) {
    try {
      let _User;
      const _user = await YoutubeContract.methods
        .getUserById(_userAddress)
        .call();
      _User = {
        id: _user.id,
        userName: _user.userName,
        userAddress: _user.userAddress,
        profileImag: _user.profileImag,
        userVideos: _user.userVideos,
        videoSaved: _user.videoSaved,
      };

      return _User;
    } catch (error) {
      console.log(error);
    }
  },

  /*..........................  video functions  .................................. */

  async downlodVideo(_videoHash, _videoTayp, _videoTitle, _currentAccount) {
    try {
      await YoutubeContract.methods
        .downloadVideo(_videoHash, _videoTayp, _videoTitle)
        .send({ from: _currentAccount });
    } catch (error) {
      console.log(error);
    }
  },
  async likeVideo(_videoId, _currentAccount) {
    await YoutubeContract.methods
      .likeVideo(_videoId)
      .send({ from: _currentAccount });
  },

  async dislikeVideo(_videoId, _currentAccount) {
    await YoutubeContract.methods
      .dislikeVideo(_videoId)
      .send({ from: _currentAccount });
  },
  async saveVideo(_videoId, _currentAccount) {
    await YoutubeContract.methods
      .saveVideo(_videoId)
      .send({ from: _currentAccount });
  },
  async deleteSavedVideo(_videoId, _currentAccount) {
    await YoutubeContract.methods
      .deleteSavedVideo(_videoId)
      .send({ from: _currentAccount });
  },

  async getVideo(_videoId) {
    try {
      let _Video = {};
      if (ethereum) {
        const _video = await YoutubeContract.methods.getVideo(_videoId).call();
        if (Number(_video.id) > 0) {
          let _videoComments = [];
          if (_video.commentsIds.length > 0) {
            _videoComments = await this.getVideoComments(
              _videoId,
              _video.commentsIds
            );
          }

          const _owner = await this.getUserByAddress(_video.owner);
          let _likes = [];
          if (_video.likes.length) {
            _video.likes.map((address) => {
              if (address != "0x0000000000000000000000000000000000000000") {
                _likes.push(address);
              }
            });
          }
          let _dislike = [];
          if (_video.dislike.length) {
            _video.dislike.map((address) => {
              if (address != "0x0000000000000000000000000000000000000000") {
                _dislike.push(address);
              }
            });
          }

          _Video = {
            id: Number(_video.id),
            videoHash: _video.videoHash,
            videoTayp: _video.videoTayp,
            videoTitle: _video.videoTitle,
            timestamp: _video.timestamp,
            owner: _owner,
            likes: _likes,
            dislike: _dislike,
            comments: _videoComments,
          };
        }
      }
      return _Video;
    } catch (error) {
      console.log(error);
    }
  },
  async deleteVideo(_videoId, _currentAccount) {
    await YoutubeContract.methods
      .deleteVideo(_videoId)
      .send({ from: _currentAccount });
  },
  /*.......................... comments functions .................................. */

  async addComment(_videoId, _comment, _currentAccount) {
    await YoutubeContract.methods
      .addComment(_videoId, _comment)
      .send({ from: _currentAccount });
  },

  async likeComment(_videoId, _commentId, _currentAccount) {
    await YoutubeContract.methods
      .likeComment(_videoId, _commentId)
      .send({ from: _currentAccount });
  },

  async dislikeComment(_videoId, _commentId, _currentAccount) {
    await YoutubeContract.methods
      .dislikeComment(_videoId, _commentId)
      .send({ from: _currentAccount });
  },

  async getVideoComments(_videoId, _commentsIds) {
    let _videoComments = [];

    for (let i = 0; i < _commentsIds.length; i++) {
      if (Number(_commentsIds[i]) > 0) {
        const _Comment = await YoutubeContract.methods
          .getVideoComment(_videoId, _commentsIds[i])
          .call();

        let _commentReplies = [];
        if (_Comment.repliesIds.length > 0) {
          _commentReplies = await this.getCommentReplies(
            _videoId,
            _commentsIds[i],
            _Comment.repliesIds
          );
        }
        const _owner = await this.getUserByAddress(_Comment.owner);
        let _likes = [];
        if (_Comment.likes.length) {
          _Comment.likes.map((address) => {
            if (address != "0x0000000000000000000000000000000000000000") {
              _likes.push(address);
            }
          });
        }
        let _dislike = [];
        if (_Comment.dislike.length) {
          _Comment.dislike.map((address) => {
            if (address != "0x0000000000000000000000000000000000000000") {
              _dislike.push(address);
            }
          });
        }
        _videoComments.push({
          id: _Comment.id,
          owner: _owner,
          comment: _Comment.comment,
          timestamp: _Comment.timestamp,
          likes: _likes,
          dislike: _dislike,
          replies: _commentReplies,
        });
      }
    }
    return _videoComments.reverse();
  },

  /*..........................  Replies functions  .................................. */

  async addReply(_videoId, _commentId, _replyComent, _currentAccount) {
    await YoutubeContract.methods
      .addReply(_videoId, _commentId, _replyComent)
      .send({ from: _currentAccount });
  },

  async getCommentReplies(_videoId, _commentId, _repliesIds) {
    let _commentReplies = [];

    for (let i = 0; i < _repliesIds.length; i++) {
      if (Number(_repliesIds[i]) > 0) {
        const _reply = await YoutubeContract.methods
          .getCommentReply(_videoId, _commentId, _repliesIds[i])
          .call();
        const _owner = await this.getUserByAddress(_reply.owner);
        let _likes = [];
        if (_reply.likes.length) {
          _reply.likes.map((address) => {
            if (address != "0x0000000000000000000000000000000000000000") {
              _likes.push(address);
            }
          });
        }
        let _dislike = [];
        if (_reply.dislike.length) {
          _reply.dislike.map((address) => {
            if (address != "0x0000000000000000000000000000000000000000") {
              _dislike.push(address);
            }
          });
        }
        _commentReplies.push({
          id: _reply.id,
          owner: _owner,
          reply: _reply.reply,
          timestamp: _reply.timestamp,
          likes: _likes,
          dislike: _dislike,
        });
      }
    }
    return _commentReplies.reverse();
  },

  async likeReply(_videoId, _commentId, _replyId, _currentAccount) {
    await YoutubeContract.methods
      .likeReply(_videoId, _commentId, _replyId)
      .send({ from: _currentAccount });
  },

  async dislikeReply(_videoId, _commentId, _replyId, _currentAccount) {
    await YoutubeContract.methods
      .dislikeReply(_videoId, _commentId, _replyId)
      .send({ from: _currentAccount });
  },
};
