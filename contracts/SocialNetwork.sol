// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SocialNetwork is Ownable {
    struct Profile {
        string name;
        string bio;
        string avatar;
        uint256 postCount;
        uint256 followerCount;
        uint256 followingCount;
    }

    struct Post {
        address author;
        string content;
        uint256 timestamp;
        uint256 likeCount;
        uint256 commentCount;
    }

    mapping(address => Profile) public profiles;
    mapping(uint256 => Post) public posts;
    mapping(address => mapping(address => bool)) public following;
    mapping(uint256 => mapping(address => bool)) public postLikes;
    
    uint256 public postCount;
    
    event ProfileCreated(address indexed user, string name);
    event PostCreated(uint256 indexed postId, address indexed author, string content);
    event PostLiked(uint256 indexed postId, address indexed liker);
    event Followed(address indexed follower, address indexed following);

    constructor() Ownable(msg.sender) {}

    function createProfile(string memory _name, string memory _bio, string memory _avatar) public {
        require(bytes(profiles[msg.sender].name).length == 0, "Profile already exists");
        profiles[msg.sender] = Profile({
            name: _name,
            bio: _bio,
            avatar: _avatar,
            postCount: 0,
            followerCount: 0,
            followingCount: 0
        });
        emit ProfileCreated(msg.sender, _name);
    }

    function createPost(string memory _content) public {
        require(bytes(profiles[msg.sender].name).length > 0, "Profile does not exist");
        postCount++;
        posts[postCount] = Post({
            author: msg.sender,
            content: _content,
            timestamp: block.timestamp,
            likeCount: 0,
            commentCount: 0
        });
        profiles[msg.sender].postCount++;
        emit PostCreated(postCount, msg.sender, _content);
    }

    function likePost(uint256 _postId) public {
        require(_postId <= postCount, "Post does not exist");
        require(!postLikes[_postId][msg.sender], "Already liked");
        
        postLikes[_postId][msg.sender] = true;
        posts[_postId].likeCount++;
        emit PostLiked(_postId, msg.sender);
    }

    function follow(address _userToFollow) public {
        require(_userToFollow != msg.sender, "Cannot follow yourself");
        require(bytes(profiles[_userToFollow].name).length > 0, "Profile does not exist");
        require(!following[msg.sender][_userToFollow], "Already following");

        following[msg.sender][_userToFollow] = true;
        profiles[msg.sender].followingCount++;
        profiles[_userToFollow].followerCount++;
        emit Followed(msg.sender, _userToFollow);
    }

    function getProfile(address _user) public view returns (Profile memory) {
        return profiles[_user];
    }

    function getPost(uint256 _postId) public view returns (Post memory) {
        return posts[_postId];
    }
} 