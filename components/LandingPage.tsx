import { useState, useEffect } from 'react';
import { Contract } from 'ethers';
import SocialNetwork from '../../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json';
import { web3Handler } from '../utils/web3';
import CosmosBackground from './CosmosBackground';
import ScrollText from './ScrollText';

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
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleStateChange = (state: any) => {
      setIsConnected(state.isConnected);
      setAccount(state.account);
    };

    const unsubscribe = web3Handler.addListener(handleStateChange);
    return () => unsubscribe();
  }, []);

  const connectWallet = async () => {
    await web3Handler.connect();
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen relative">
      <CosmosBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="space-y-32">
          <ScrollText text="Welcome to Web3opia" />
          <ScrollText text="Connect your wallet" />
          <ScrollText text="Join the decentralized social network" />
        </div>

        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="text-white text-center">
              <p>Connected: {account}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export the component directly since we're not using dynamic import anymore
export default LandingPage; 