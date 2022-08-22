// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract YoutubeData {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    struct user {
        uint256 id;
        string userName;
        address userAddress;
        string profileImag;
        uint256[] userVideos;
        uint256[] videoSaved;
    }
    struct reply {
        uint256 id;
        address owner;
        string reply;
        uint256 timestamp;
        address[] likes;
        address[] dislike;
    }
    struct comment {
        uint256 id;
        address owner;
        string comment;
        uint256 timestamp;
        address[] likes;
        address[] dislike;
        uint256[] repliesIds;
    }

    struct video {
        uint256 id;
        string videoHash;
        string videoTayp;
        string videoTitle;
        uint256 timestamp;
        address owner;
        address[] likes;
        address[] dislike;
        uint256[] commentsIds;
    }

    uint256 public usersCount;
    uint256 public videosCount;

    mapping(address => uint256) public userId;
    mapping(uint256 => user) public users;
    mapping(uint256 => video) public videos;
    mapping(uint256 => mapping(uint256 => comment)) videoComments;
    mapping(uint256 => mapping(uint256 => mapping(uint256 => reply))) commentReplies;

    function signUp(string memory _userName, string memory _profileImag)
        public
    {
        require(userId[msg.sender] == 0);

        usersCount++;

        user storage _user = users[usersCount];
        _user.id = usersCount;
        _user.userName = _userName;
        _user.userAddress = msg.sender;
        _user.profileImag = _profileImag;

        userId[msg.sender] = usersCount;
    }

    function _alreadyReact(address[] memory _interactors, address _owner)
        public
        pure
        returns (uint256 _indexOfOwner)
    {
        if (_interactors.length > 0) {
            for (uint256 i = 0; i < _interactors.length; i++) {
                if (_interactors[i] == _owner) {
                    _indexOfOwner = i + 1;
                }
            }
        }

        return _indexOfOwner;
    }

    function getUserById(uint256 _userId) public view returns (user memory) {
        return users[_userId];
    }

    function getUserByAddress(address _userAddress)
        public
        view
        returns (user memory)
    {
        uint256 _userId = userId[_userAddress];
        return users[_userId];
    }
}
