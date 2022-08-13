// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Comments.sol";

contract Replys is Comments {

    //  -------------------- Reply functions ---------------------:
    function addReply(
        uint256 _videoId,
        uint256 _commentId,
        string memory _replyComent
    ) public {
        uint256 replyId = videos[_videoId]
            .comments[_commentId - 1]
            .replis
            .length + 1;

        reply storage _replyStract = videos[_videoId]
            .comments[_commentId - 1]
            .replis[replyId - 1];

        _replyStract.id = replyId;
        _replyStract.owner = msg.sender;
        _replyStract.reply = _replyComent;
        _replyStract.timestamp = block.timestamp;

        // videos[_videoId].comments[_commentId - 1].replis.push(
        //     reply(
        //         replyId,
        //         msg.sender,
        //         _reply,
        //         block.timestamp,
        //         _likes,
        //         _dislike
        //     )
        // );
    }

    function deletReply(
        uint256 _videoId,
        uint256 _commentId,
        uint256 _replyId
    ) public {
        require(_commentId > 0 && _videoId > 0 && _replyId > 0);

        if (
            videos[_videoId]
                .comments[_commentId - 1]
                .replis[_replyId - 1]
                .owner ==
            msg.sender ||
            videos[_videoId].owner == msg.sender
        ) {
            delete (
                videos[_videoId].comments[_commentId - 1].replis[_replyId - 1]
            );
        }
    }

    function likeReply(
        uint256 _videoId,
        uint256 _commentId,
        uint256 _replyId
    ) public {
        uint256 _LikesIndex = _alreadyReact(
            videos[_videoId]
                .comments[_commentId - 1]
                .replis[_replyId - 1]
                .likes,
            msg.sender
        );
        uint256 _DislikeIndex = _alreadyReact(
            videos[_videoId]
                .comments[_commentId - 1]
                .replis[_replyId - 1]
                .dislike,
            msg.sender
        );

        if (_LikesIndex == 0) {
            videos[_videoId]
                .comments[_commentId - 1]
                .replis[_replyId - 1]
                .likes
                .push(msg.sender);
        }
        if (_DislikeIndex > 0) {
            delete (
                videos[_videoId]
                    .comments[_commentId - 1]
                    .replis[_replyId - 1]
                    .dislike[_DislikeIndex - 1]
            );
        }
    }

    function dislikeReply(
        uint256 _videoId,
        uint256 _commentId,
        uint256 _replyId
    ) public {
        uint256 _LikesIndex = _alreadyReact(
            videos[_videoId]
                .comments[_commentId - 1]
                .replis[_replyId - 1]
                .likes,
            msg.sender
        );
        uint256 _DislikeIndex = _alreadyReact(
            videos[_videoId]
                .comments[_commentId - 1]
                .replis[_replyId - 1]
                .dislike,
            msg.sender
        );

        if (_DislikeIndex == 0) {
            videos[_videoId]
                .comments[_commentId - 1]
                .replis[_replyId - 1]
                .dislike
                .push(msg.sender);
        }
        if (_LikesIndex > 0) {
            delete (
                videos[_videoId]
                    .comments[_commentId - 1]
                    .replis[_replyId - 1]
                    .likes[_LikesIndex - 1]
            );
        }
    }
}
