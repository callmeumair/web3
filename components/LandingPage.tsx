import { motion } from 'framer-motion';
import { useState } from 'react';
import { ethers } from 'ethers';
import SocialNetwork from '../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json';

interface LandingPageProps {
  onConnect: (account: string, contract: ethers.Contract) => void;
}

// Simple fade in animation
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 }
};

// Simple slide up animation
const slideUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function LandingPage({ onConnect }: LandingPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = 'YOUR_CONTRACT_ADDRESS';
        const socialContract = new ethers.Contract(contractAddress, SocialNetwork.abi, signer);

        onConnect(account, socialContract);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  return (
    <motion.div
      {...fadeIn}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          {...slideUp}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Decentralized Social Network
          </h1>
          <p className="text-xl text-gray-300">
            Connect, share, and interact in a decentralized world
          </p>
        </motion.div>

        <motion.div 
          {...fadeIn}
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-purple-500/20 mb-12"
        >
          {!isLogin && (
            <div className="space-y-6 mb-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  placeholder="Tell us about yourself"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Avatar URL</label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  placeholder="Enter your avatar URL"
                />
              </div>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={connectWallet}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            {isLogin ? 'Connect Wallet' : 'Create Profile'}
          </motion.button>

          <p className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              {isLogin ? "Don't have a profile? Sign up" : 'Already have a profile? Log in'}
            </button>
          </p>
        </motion.div>

        <motion.div 
          {...slideUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Decentralized",
              description: "Your data is stored securely on the blockchain"
            },
            {
              title: "Censorship Resistant",
              description: "No central authority can control your content"
            },
            {
              title: "Community Owned",
              description: "Built and governed by the community"
            }
          ].map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -3 }}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-purple-400">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
} 