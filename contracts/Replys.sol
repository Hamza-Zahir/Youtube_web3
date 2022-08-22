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
        require(userId[msg.sender] != 0);

        uint256 _replyId = videoComments[_videoId][_commentId]
            .repliesIds
            .length + 1;

        reply storage _reply = commentReplies[_videoId][_commentId][_replyId];

        _reply.id = _replyId;
        _reply.owner = msg.sender;
        _reply.reply = _replyComent;
        _reply.timestamp = block.timestamp;

        videoComments[_videoId][_commentId].repliesIds.push(_replyId);
    }

    function getCommentReply(
        uint256 _videoId,
        uint256 _commentId,
        uint256 _replyId
    ) public view returns (reply memory) {
        return commentReplies[_videoId][_commentId][_replyId];
    }

    function deletReply(
        uint256 _videoId,
        uint256 _commentId,
        uint256 _replyId
    ) public {
        require(userId[msg.sender] != 0);
        require(
            commentReplies[_videoId][_commentId][_replyId].owner ==
                msg.sender ||
                videos[_videoId].owner == msg.sender
        );
        require(_commentId > 0 && _videoId > 0 && _replyId > 0);

        delete (commentReplies[_videoId][_commentId][_replyId]);

        for (
            uint256 i = 0;
            i < videoComments[_videoId][_commentId].repliesIds.length;
            i++
        ) {
            if (videoComments[_videoId][_commentId].repliesIds[i] == _replyId) {
                delete (videoComments[_videoId][_commentId].repliesIds[i]);
            }
        }
    }

    function likeReply(
        uint256 _videoId,
        uint256 _commentId,
        uint256 _replyId
    ) public {
        require(userId[msg.sender] != 0);

        uint256 _LikesIndex = _alreadyReact(
            commentReplies[_videoId][_commentId][_replyId].likes,
            msg.sender
        );
        uint256 _DislikeIndex = _alreadyReact(
            commentReplies[_videoId][_commentId][_replyId].dislike,
            msg.sender
        );

        if (_LikesIndex == 0) {
            commentReplies[_videoId][_commentId][_replyId].likes.push(
                msg.sender
            );

            if (_DislikeIndex > 0) {
                delete (
                    commentReplies[_videoId][_commentId][_replyId].dislike[
                        _DislikeIndex - 1
                    ]
                );
            }
        } else {
            delete (
                commentReplies[_videoId][_commentId][_replyId].likes[
                    _LikesIndex - 1
                ]
            );
        }
    }

    function dislikeReply(
        uint256 _videoId,
        uint256 _commentId,
        uint256 _replyId
    ) public {
        require(userId[msg.sender] != 0);

        uint256 _LikesIndex = _alreadyReact(
            commentReplies[_videoId][_commentId][_replyId].likes,
            msg.sender
        );
        uint256 _DislikeIndex = _alreadyReact(
            commentReplies[_videoId][_commentId][_replyId].dislike,
            msg.sender
        );

        if (_DislikeIndex == 0) {
            commentReplies[_videoId][_commentId][_replyId].dislike.push(
                msg.sender
            );

            if (_LikesIndex > 0) {
                delete (
                    commentReplies[_videoId][_commentId][_replyId].likes[
                        _LikesIndex - 1
                    ]
                );
            }
        } else {
            delete (
                commentReplies[_videoId][_commentId][_replyId].dislike[
                    _DislikeIndex - 1
                ]
            );
        }
    }
}
