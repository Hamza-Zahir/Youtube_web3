// import Web3 from "web3";
// import dataContract from "../build/contracts/Youtube.json";
// const AbiCcontract = dataContract.abi;
// const contractAddres = dataContract.networks[97].address;

// const state = {
//   AllVideos: [],
// };

// const getters = {
//   AllVideos: (state) => state.AllVideos,
// };
// const actions = {
//   async getAllVideos({ commit }) {
//     try {
//       let _AllVideos = [];
//       const ethereum = await window.ethereum;
//       if (ethereum) {
//         const web3 = new Web3(Web3.givenProvider || ethereum);
//         const YoutubeContract = new web3.eth.Contract(
//           AbiCcontract,
//           contractAddres
//         );
//         const _videosCount = await DonationContract.methods
//           .videosCount()
//           .call();

//         for (let i = 1; i <= Number(_videosCount); i++) {
//           const _video = await YoutubeContract.methods.getVideo(i).call();
//           if (Number(_video.id) > 0) {
//             let _videoComments = [];
//             if (_video.commentsIds.length > 0) {
//               _videoComments = await this.getVideoComments();
//             }
//             _AllVideos.push({
//               id: Number(_video.id),
//               videoHash: _video.videoHash,
//               videoTayp: _video.videoTayp,
//               timestamp: _video.timestamp,
//               owner: _video.owner,
//               likes: _video.likes.length,
//               dislike: _video.dislike.length,
//               comments: _videoComments,
//             });
//           }
//         }
//         commit("setAllVideos", _AllVideos);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   },
//   async getVideoComments(_videoId, _commentsIds) {
//     const ethereum = await window.ethereum;
//     const web3 = new Web3(Web3.givenProvider || ethereum);
//     const YoutubeContract = new web3.eth.Contract(AbiCcontract, contractAddres);

//     let _videoComments = [];

//     for (let i = 0; i < _commentsIds.length; i++) {
//       if (Number(_commentsIds[i]) > 0) {
//         const _Comment = await YoutubeContract.methods
//           .getVideoComment(_videoId, _commentsIds[i])
//           .call();

//         let _commentReplies = [];
//         if (_Comment.repliesIds.length > 0) {
//           _commentReplies = await this.getCommentReplies();
//         }
//         _videoComments.push({
//           id: _Comment.id,
//           owner: _Comment.owner,
//           comment: _Comment.comment,
//           timestamp: _Comment.timestamp,
//           likes: _Comment.likes.likes,
//           dislike: _Comment.dislike.length,
//           replies: _commentReplies,
//         });
//       }
//     }
//     return _videoComments;
//   },
//   async getCommentReplies(_videoId, _commentId, _repliesIds) {
//     const ethereum = await window.ethereum;
//     const web3 = new Web3(Web3.givenProvider || ethereum);
//     const YoutubeContract = new web3.eth.Contract(AbiCcontract, contractAddres);

//     let _commentReplies = [];

//     for (let i = 0; i < _repliesIds.length; i++) {
//       if (Number(_repliesIds[i]) > 0) {
//         const _reply = await YoutubeContract.methods
//           .getCommentReply(_videoId, _commentId, _repliesIds[i])
//           .call();

//         _commentReplies.push({
//           id: _reply.id,
//           owner: _reply.owner,
//           reply: _reply.reply,
//           timestamp: _reply.timestamp,
//           likes: _reply.likes.likes,
//           dislike: _reply.dislike.length,
//         });
//       }
//     }
//     return _commentReplies;
//   },
// };
// const mutations = {
//   setAllVideos: (state, allVideos) => (state.AllVideos = allVideos),
// };

// export default {
//   state,
//   getters,
//   actions,
//   mutations,
// };
