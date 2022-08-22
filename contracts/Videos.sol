// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./YoutubeData.sol";

contract Videos is YoutubeData {
    //  -------------------- Video functions ---------------------:

    function downloadVideo(string memory _Hash, string memory _Tayp, string memory _title) public {
        require(userId[msg.sender] != 0);
        videosCount++;
        video storage _video = videos[videosCount];
        _video.id = videosCount;
        _video.videoHash = _Hash;
        _video.videoTayp = _Tayp;
        _video.videoTitle = _title;
        _video.timestamp = block.timestamp;
        _video.owner = msg.sender;

        users[userId[msg.sender]].userVideos.push(videosCount);
    }

    function deleteVideo(uint256 _videoId) public {
        require(videos[_videoId].owner == msg.sender);
        delete (videos[_videoId]);
        for (
            uint256 i = 0;
            i < users[userId[msg.sender]].userVideos.length;
            i++
        ) {
            if (users[userId[msg.sender]].userVideos[i] == _videoId) {
                delete (users[userId[msg.sender]].userVideos[i]);
            }
        }
    }

    function likeVideo(uint256 _videoId) public {
        require(userId[msg.sender] != 0);
        uint256 _LikesIndex = _alreadyReact(videos[_videoId].likes, msg.sender);
        uint256 _DislikeIndex = _alreadyReact(
            videos[_videoId].dislike,
            msg.sender
        );
        if (_LikesIndex == 0) {
            videos[_videoId].likes.push(msg.sender);

            if (_DislikeIndex > 0) {
                delete (videos[_videoId].dislike[_DislikeIndex - 1]);
            }
        } else {
            delete (videos[_videoId].likes[_LikesIndex - 1]);
        }
    }

    function dislikeVideo(uint256 _videoId) public {
        uint256 _LikesIndex = _alreadyReact(videos[_videoId].likes, msg.sender);
        uint256 _DislikeIndex = _alreadyReact(
            videos[_videoId].dislike,
            msg.sender
        );

        if (_DislikeIndex == 0) {
            videos[_videoId].dislike.push(msg.sender);
            if (_LikesIndex > 0) {
                delete (videos[_videoId].likes[_LikesIndex - 1]);
            }
        } else {
            delete (videos[_videoId].dislike[_DislikeIndex - 1]);
        }
    }

    function getVideo(uint256 _VideoId) public view returns (video memory) {
        return videos[_VideoId];
    }

    function functionPublic() public pure returns (uint256[] memory) {
        uint256[] memory newArray;

        return newArray;
    }

    function getAllVideos() public view returns (video[] memory) {
        video[] memory _AllVideos = new video[](videosCount);

        for (uint256 i = 1; i <= videosCount; i++) {
            video memory _video = getVideo(i);
            _AllVideos[i - 1] = _video;
        }

        return _AllVideos;
    }

    function _getAllIdsVideosByType(string memory _videoType)
        private
        view
        returns (uint256[] memory)
    {
        // ...........get length first :
        uint256 _length;
        for (uint256 i = 1; i <= videosCount; i++) {
            video memory _video = getVideo(i);
            if (
                keccak256(abi.encodePacked(_video.videoTayp)) ==
                keccak256(abi.encodePacked(_videoType))
            ) {
                _length++;
            }
        }
        uint256[] memory _videosId = new uint256[](_length);
        uint256 _index;
        if (_length > 0) {
            for (uint256 i = 1; i <= videosCount; i++) {
                video memory _video = getVideo(i);
                if (
                    keccak256(abi.encodePacked(_video.videoTayp)) ==
                    keccak256(abi.encodePacked(_videoType))
                ) {
                    _videosId[_index] = _video.id;
                    _index++;
                }
            }
        }
        return _videosId;
    }

    function getAllVideoByType(string memory _videoType)
        public
        view
        returns (video[] memory)
    {
        uint256[] memory _videosId = _getAllIdsVideosByType(_videoType);

        video[] memory _AllVideos = new video[](_videosId.length);

        for (uint256 i = 0; i < _videosId.length; i++) {
            video memory _video = getVideo(_videosId[i]);
            _AllVideos[i] = _video;
        }
        return _AllVideos;
    }

    function getUserVideosById(uint256 _userId)
        public
        view
        returns (video[] memory)
    {
        user memory _user = getUserById(_userId);
        require(_user.userVideos.length > 0);
        video[] memory _AllVideos = new video[](_user.userVideos.length);
        for (uint256 i = 0; i < _user.userVideos.length; i++) {
            video memory _video = getVideo(_user.userVideos[i]);

            _AllVideos[i] = _video;
        }

        return _AllVideos;
    }

    function getUserVideosByAddress(address _userAddress)
        public
        view
        returns (video[] memory)
    {
        user memory _user = getUserByAddress(_userAddress);
        require(_user.userVideos.length > 0);
        video[] memory _AllVideos = new video[](_user.userVideos.length);
        for (uint256 i = 0; i < _user.userVideos.length; i++) {
            video memory _video = getVideo(_user.userVideos[i]);

            _AllVideos[i] = _video;
        }

        return _AllVideos;
    }
}
