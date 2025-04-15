import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import dynamic from 'next/dynamic';
import SocialNetwork from '../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json';

interface LandingPageProps {
  onConnect: (account: string, contract: ethers.Contract) => void;
}

// Client-side only component
const LandingPage = ({ onConnect }: LandingPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS';
        const socialContract = new ethers.Contract(contractAddress, SocialNetwork.abi, signer);

        onConnect(account, socialContract);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  // Don't render anything until mounted (prevents hydration issues)
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 transition-all duration-500 transform translate-y-0 opacity-100">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Decentralized Social Network
          </h1>
          <p className="text-xl text-gray-300">
            Connect, share, and interact in a decentralized world
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-purple-500/20 mb-12 transition-all duration-500">
          {!isLogin && (
            <div className="space-y-6 mb-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all duration-300"
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
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all duration-300"
                  placeholder="Enter your avatar URL"
                />
              </div>
            </div>
          )}

          <button
            onClick={connectWallet}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0.5"
          >
            {isLogin ? 'Connect Wallet' : 'Create Profile'}
          </button>

          <p className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
            >
              {isLogin ? "Don't have a profile? Sign up" : 'Already have a profile? Log in'}
            </button>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <div
              key={feature.title}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              <h3 className="text-xl font-semibold mb-2 text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Export as client-side only component
export default dynamic(() => Promise.resolve(LandingPage), {
  ssr: false
}); 