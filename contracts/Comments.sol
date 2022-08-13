// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Videos.sol";

contract Comments is Videos {


    //  -------------------- Comment functions ---------------------:

    function addComment(uint256 _videoId, string memory _comment) public {
        uint256 _commentId = videos[_videoId].comments.length + 1;
        comment storage _Comment = videos[_videoId].comments[_commentId - 1];
        _Comment.id = _commentId;
        _Comment.owner = msg.sender;
        _Comment.comment = _comment;
        _Comment.timestamp = block.timestamp;
        // videos[_videoId].comments.push(
        //     comment(
        //         _commentId,
        //         msg.sender,
        //         _comment,
        //         block.timestamp,
        //         _likes,
        //         _dislike,
        //         _replis
        //     )
        // );
    }

    function deletComment(uint256 _videoId, uint256 _commentId) public {
        if (
            videos[_videoId].comments[_commentId - 1].owner == msg.sender ||
            videos[_videoId].owner == msg.sender
        ) {
            delete (videos[_videoId].comments[_commentId - 1]);
        }
    }

    function likeComment(uint256 _videoId, uint256 _commentId) public {
        uint256 _LikesIndex = _alreadyReact(
            videos[_videoId].comments[_commentId - 1].likes,
            msg.sender
        );
        uint256 _DislikeIndex = _alreadyReact(
            videos[_videoId].comments[_commentId - 1].dislike,
            msg.sender
        );

        if (_LikesIndex == 0) {
            videos[_videoId].comments[_commentId - 1].likes.push(msg.sender);
        }
        if (_DislikeIndex > 0) {
            delete (
                videos[_videoId].comments[_commentId - 1].dislike[
                    _DislikeIndex - 1
                ]
            );
        }
    }

    function dislikeComment(uint256 _videoId, uint256 _commentId) public {
        uint256 _LikesIndex = _alreadyReact(
            videos[_videoId].comments[_commentId - 1].likes,
            msg.sender
        );
        uint256 _DislikeIndex = _alreadyReact(
            videos[_videoId].comments[_commentId - 1].dislike,
            msg.sender
        );

        if (_DislikeIndex == 0) {
            videos[_videoId].comments[_commentId - 1].dislike.push(msg.sender);
        }
        if (_LikesIndex > 0) {
            delete (
                videos[_videoId].comments[_commentId - 1].likes[_LikesIndex - 1]
            );
        }
    }

}
