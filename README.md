# Decentralized Social Network

A web3-based social network built with Next.js, Solidity, and Hardhat.

## Features

- Create and manage user profiles
- Create and view posts
- Like posts
- Follow other users
- Decentralized data storage on the blockchain

## Prerequisites

- Node.js (v14 or later)
- MetaMask browser extension
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd decentralized-social-network
```

2. Install dependencies:
```bash
npm install
```

3. Start the local blockchain:
```bash
npx hardhat node
```

4. Deploy the smart contract:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

5. Update the contract address in `pages/index.tsx` with the deployed contract address.

6. Start the development server:
```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Connect your MetaMask wallet
3. Create a profile
4. Start posting and interacting with other users

## Smart Contract

The smart contract (`SocialNetwork.sol`) includes the following functions:

- `createProfile`: Create a new user profile
- `createPost`: Create a new post
- `likePost`: Like a post
- `follow`: Follow another user
- `getProfile`: Get user profile information
- `getPost`: Get post information

## Security Considerations

- Always verify transactions in MetaMask before confirming
- Keep your private keys secure
- Be cautious when interacting with smart contracts

## License

MIT 