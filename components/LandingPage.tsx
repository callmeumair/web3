import { useState, useEffect } from 'react';
import { Contract } from 'ethers';
import SocialNetwork from '../../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json';
import { Web3Handler } from '../utils/web3';

interface LandingPageProps {
  onConnect: (account: string, contract: Contract) => void;
}

// Pre-defined features array to avoid dynamic evaluation
const FEATURES = [
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
] as const;

const LandingPage: React.FC<LandingPageProps> = ({ onConnect }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [mounted, setMounted] = useState(false);
  const [web3Handler] = useState(() => new Web3Handler());

  useEffect(() => {
    setMounted(true);
    
    const handleAccountsChanged = async (accounts: string[]) => {
      await web3Handler.handleAccountsChanged(accounts);
    };

    web3Handler.setupAccountChangeListener(handleAccountsChanged);

    return () => {
      web3Handler.removeAccountChangeListener(handleAccountsChanged);
    };
  }, [web3Handler]);

  const connectWallet = async () => {
    const initialized = await web3Handler.initialize();
    if (!initialized) return;

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    if (!contractAddress) {
      console.error('Contract address not configured');
      return;
    }

    const contract = await web3Handler.createContract(contractAddress, SocialNetwork.abi);
    const account = web3Handler.getAccount();

    if (contract && account) {
      onConnect(account, contract);
    }
  };

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
          {FEATURES.map((feature) => (
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

// Export the component directly since we're not using dynamic import anymore
export default LandingPage; 