import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SocialNetwork from '../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json';
import LandingPage from '../components/LandingPage';

interface Post {
  author: string;
  content: string;
  timestamp: number;
  likeCount: number;
  commentCount: number;
}

interface Profile {
  name: string;
  bio: string;
  avatar: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
}

export default function Home() {
  const [account, setAccount] = useState<string>('');
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async (connectedAccount: string, connectedContract: ethers.Contract) => {
    setAccount(connectedAccount);
    setContract(connectedContract);
    setIsConnected(true);
    loadProfile();
    loadPosts();
  };

  const loadProfile = async () => {
    if (contract) {
      const profile = await contract.getProfile(account);
      setProfile(profile);
    }
  };

  const loadPosts = async () => {
    if (contract) {
      const postCount = await contract.postCount();
      const posts: Post[] = [];
      for (let i = 1; i <= postCount; i++) {
        const post = await contract.getPost(i);
        posts.push(post);
      }
      setPosts(posts);
    }
  };

  const createPost = async () => {
    if (contract && newPost.trim() !== '') {
      try {
        await contract.createPost(newPost);
        setNewPost('');
        loadPosts();
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const likePost = async (postId: number) => {
    if (contract) {
      try {
        await contract.likePost(postId);
        loadPosts();
      } catch (error) {
        console.error('Error liking post:', error);
      }
    }
  };

  if (!isConnected) {
    return <LandingPage onConnect={handleConnect} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Decentralized Social Network</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700">{account}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!profile ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Create Your Profile</h2>
            <button
              onClick={() => contract?.createProfile('User', 'Bio', 'avatar.png')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Profile
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="What's on your mind?"
              />
              <button
                onClick={createPost}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Post
              </button>
            </div>

            <div className="space-y-4">
              {posts.map((post, index) => (
                <div key={index} className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="font-bold">{post.author}</div>
                    <div className="ml-2 text-gray-500">
                      {new Date(post.timestamp * 1000).toLocaleString()}
                    </div>
                  </div>
                  <p className="mb-4">{post.content}</p>
                  <div className="flex items-center">
                    <button
                      onClick={() => likePost(index + 1)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      Like ({post.likeCount})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 