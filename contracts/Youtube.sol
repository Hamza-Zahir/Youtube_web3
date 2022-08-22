// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Replys.sol";

contract Youtube is Replys {
    // Change personal information

    function changeName(string memory _newUserName) public {
        require(userId[msg.sender] != 0);
        uint256 _userId = userId[msg.sender];
        users[_userId].userName = _newUserName;
    }

    function changeProfileImag(string memory _profileImag) public {
        require(userId[msg.sender] != 0);

        uint256 _userId = userId[msg.sender];
        users[_userId].profileImag = _profileImag;
    }

    function saveVideo(uint256 _videoId) public {
        require(userId[msg.sender] != 0);

        uint256 _userId = userId[msg.sender];

        if (users[_userId].videoSaved.length == 0) {
            users[_userId].videoSaved.push(_videoId);
        } else {
            // --------- check if video already saved ---------------- :
            uint256 isVideoSaved;
            for (uint256 i = 0; i < users[_userId].videoSaved.length; i++) {
                if (users[_userId].videoSaved[i] == _videoId) {
                    isVideoSaved++;
                }
            }

            if (isVideoSaved == 0) {
                users[_userId].videoSaved.push(_videoId);
            }
        }
    }

    function deleteSavedVideo(uint256 _videoId) public {
        require(userId[msg.sender] != 0);

        uint256 _userId = userId[msg.sender];

        for (uint256 i = 0; i < users[_userId].videoSaved.length; i++) {
            if (users[_userId].videoSaved[i] == _videoId) {
                delete (users[_userId].videoSaved[i]);
            }
        }
    }

    function deletUser(address _userAddres) public {
        require(msg.sender == admin);
        uint256 _userId = userId[_userAddres];

        if (users[_userId].userVideos.length > 0) {
            for (uint256 i = 0; i < users[_userId].userVideos.length; i++) {
                delete (videos[users[_userId].userVideos[i]]);
            }
        }

        delete (users[_userId]);
        delete (userId[_userAddres]);
    }

    function changeAdmin(address _newAdmin) public {
        require(msg.sender == admin);
        admin = _newAdmin;
    }
}
