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
  async downlodVideo(_videoHash, _videoTayp, _videoTitle, _currentAccount) {
    try {
      await YoutubeContract.methods
        .downloadVideo(_videoHash, _videoTayp, _videoTitle)
        .send({ from: _currentAccount });
    } catch (error) {
      console.log(error);
    }
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
          _Video = {
            id: Number(_video.id),
            videoHash: _video.videoHash,
            videoTayp: _video.videoTayp,
            videoTitle: _video.videoTitle,
            timestamp: _video.timestamp,
            owner: _owner,
            likes: _video.likes,
            dislike: _video.dislike,
            comments: _videoComments,
          };
        }
      }
      return _Video;
    } catch (error) {
      console.log(error);
    }
  },

  // ....................................

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

        _videoComments.push({
          id: _Comment.id,
          owner: _owner,
          comment: _Comment.comment,
          timestamp: _Comment.timestamp,
          likes: _Comment.likes.likes,
          dislike: _Comment.dislike.length,
          replies: _commentReplies,
        });
      }
    }
    return _videoComments;
  },
  async getCommentReplies(_videoId, _commentId, _repliesIds) {
    let _commentReplies = [];

    for (let i = 0; i < _repliesIds.length; i++) {
      if (Number(_repliesIds[i]) > 0) {
        const _reply = await YoutubeContract.methods
          .getCommentReply(_videoId, _commentId, _repliesIds[i])
          .call();
        const _owner = await this.getUserByAddress(_reply.owner);
        _commentReplies.push({
          id: _reply.id,
          owner: _owner,
          reply: _reply.reply,
          timestamp: _reply.timestamp,
          likes: _reply.likes,
          dislike: _reply.dislike,
        });
      }
    }
    return _commentReplies;
  },

 
};
