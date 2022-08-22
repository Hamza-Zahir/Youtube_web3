// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Videos.sol";

contract Comments is Videos {
    //  -------------------- Comment functions ---------------------:

    function addComment(uint256 _videoId, string memory _commentMessag) public {
        require(userId[msg.sender] != 0);
        uint256 _commentId = videos[_videoId].commentsIds.length + 1;

        comment storage _comment = videoComments[_videoId][_commentId];
        _comment.id = _commentId;
        _comment.owner = msg.sender;
        _comment.comment = _commentMessag;
        _comment.timestamp = block.timestamp;
        videos[_videoId].commentsIds.push(_commentId);
    }

    function getVideoComment(uint256 _videoId, uint256 _commentId)
        public
        view
        returns (comment memory)
    {
        return videoComments[_videoId][_commentId];
    }

    function deletComment(uint256 _videoId, uint256 _commentId) public {
        require(userId[msg.sender] != 0);
        require(
            videoComments[_videoId][_commentId].owner == msg.sender ||
                videos[_videoId].owner == msg.sender
        );

        delete (videoComments[_videoId][_commentId]);
        for (uint256 i = 0; i < videos[_videoId].commentsIds.length; i++) {
            if (videos[_videoId].commentsIds[i] == _commentId) {
                delete (videos[_videoId].commentsIds[i]);
            }
        }
    }

    function likeComment(uint256 _videoId, uint256 _commentId) public {
        require(userId[msg.sender] != 0);
        uint256 _LikesIndex = _alreadyReact(
            videoComments[_videoId][_commentId].likes,
            msg.sender
        );
        uint256 _DislikeIndex = _alreadyReact(
            videoComments[_videoId][_commentId].dislike,
            msg.sender
        );

        if (_LikesIndex == 0) {
            videoComments[_videoId][_commentId].likes.push(msg.sender);
            if (_DislikeIndex > 0) {
                delete (
                    videoComments[_videoId][_commentId].dislike[
                        _DislikeIndex - 1
                    ]
                );
            }
        } else {
            delete (videoComments[_videoId][_commentId].likes[_LikesIndex - 1]);
        }
    }

    function dislikeComment(uint256 _videoId, uint256 _commentId) public {
       require(userId[msg.sender] != 0);
        uint256 _LikesIndex = _alreadyReact(
            videoComments[_videoId][_commentId].likes,
            msg.sender
        );
        uint256 _DislikeIndex = _alreadyReact(
            videoComments[_videoId][_commentId].dislike,
            msg.sender
        );

        if (_DislikeIndex == 0) {
            videoComments[_videoId][_commentId].dislike.push(msg.sender);
            if (_LikesIndex > 0) {
                delete (
                    videoComments[_videoId][_commentId].likes[
                        _LikesIndex - 1
                    ]
                );
            }
        } else {
            delete (videoComments[_videoId][_commentId].dislike[_DislikeIndex - 1]);
        }

      
    }
}
