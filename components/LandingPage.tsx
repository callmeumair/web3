import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ethers } from 'ethers';
import SocialNetwork from '../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json';

interface LandingPageProps {
  onConnect: (account: string, contract: ethers.Contract) => void;
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 }
};

const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 }
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
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800"
    >
      <motion.div 
        {...scaleIn}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto px-4 py-16"
      >
        <motion.div
          {...slideUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-md mx-auto bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-purple-500/20"
        >
          <div className="p-8">
            <motion.div
              {...scaleIn}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-bold text-white mb-2">
                Decentralized Social Network
              </h1>
              <motion.p 
                {...fadeIn}
                transition={{ delay: 0.8 }}
                className="text-gray-400"
              >
                Connect, share, and interact in a decentralized world
              </motion.p>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {!isLogin && (
                  <>
                    <motion.div
                      {...slideUp}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-gray-300 text-sm font-bold mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        placeholder="Enter your name"
                      />
                    </motion.div>
                    <motion.div
                      {...slideUp}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-gray-300 text-sm font-bold mb-2">
                        Bio
                      </label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        placeholder="Tell us about yourself"
                        rows={3}
                      />
                    </motion.div>
                    <motion.div
                      {...slideUp}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-gray-300 text-sm font-bold mb-2">
                        Avatar URL
                      </label>
                      <input
                        type="text"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        placeholder="Enter your avatar URL"
                      />
                    </motion.div>
                  </>
                )}

                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 20px rgba(147, 51, 234, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={connectWallet}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-semibold shadow-lg"
                >
                  {isLogin ? 'Connect Wallet' : 'Create Profile'}
                </motion.button>

                <motion.div
                  {...fadeIn}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-purple-400 hover:text-purple-300 font-medium"
                  >
                    {isLogin
                      ? "Don't have a profile? Sign up"
                      : 'Already have a profile? Log in'}
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          {...slideUp}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.h2 
            {...fadeIn}
            transition={{ delay: 0.8 }}
            className="text-2xl font-bold mb-4 text-white"
          >
            Why Choose Us?
          </motion.h2>
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
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                {...slideUp}
                transition={{ delay: 0.8 + index * 0.2 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(147, 51, 234, 0.2)"
                }}
                className="p-6 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-purple-500/20"
              >
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 