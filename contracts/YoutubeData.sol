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
        reply[] replis;
    }

    struct video {
        uint256 id;
        string videoHash;
        string videoTayp;
        uint256 timestamp;
        address owner;
        address[] likes;
        address[] dislike;
        comment[] comments;
    }

    uint256 public usersCount;
    uint256 public videosCount;

    mapping(address => uint256) public userId;
    mapping(uint256 => user) public users;
    mapping(uint256 => video) public videos;
    // mapping(string => video[]) public videosByType;

    function deletUser(address _user) public {
        require(msg.sender == admin);
        uint256 _userId = userId[_user];
        delete (users[_userId]);

        for (uint256 i = 0; i <= users[_userId].userVideos.length; i++) {
            delete (videos[users[_userId].userVideos[i]]);
        }
    }

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

    // Change personal information
    function changeName(string memory _newUserName) public {
        uint256 _userId = userId[msg.sender];

        require(users[_userId].userAddress == msg.sender);
        users[_userId].userName = _newUserName;
    }

    function changeProfileImag(string memory _profileImag) public {
        uint256 _userId = userId[msg.sender];

        require(users[_userId].userAddress == msg.sender);
        users[_userId].profileImag = _profileImag;
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
