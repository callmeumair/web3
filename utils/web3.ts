import { BrowserProvider, Contract, JsonRpcSigner, Network, Interface } from 'ethers';
import SocialNetwork from '../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json';

interface Web3State {
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  account: string | null;
  network: Network | null;
  isConnected: boolean;
  error: string | null;
}

class Web3Handler {
  private state: Web3State = {
    provider: null,
    signer: null,
    account: null,
    network: null,
    isConnected: false,
    error: null
  };

  private listeners: ((state: Web3State) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && window.ethereum) {
      this.initialize();
    }
  }

  private async initialize() {
    try {
      const provider = new BrowserProvider(window.ethereum!);
      const network = await provider.getNetwork();
      const signer = await provider.getSigner();
      const account = await signer.getAddress();

      this.state = {
        provider,
        signer,
        account,
        network,
        isConnected: true,
        error: null
      };

      this.notifyListeners();

      // Listen for account changes
      window.ethereum!.on('accountsChanged', this.handleAccountsChanged);
      // Listen for chain changes
      window.ethereum!.on('chainChanged', this.handleChainChanged);
    } catch (error) {
      console.error('Failed to initialize Web3:', error);
      this.state.error = 'Failed to initialize Web3';
      this.notifyListeners();
    }
  }

  private handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      this.state = {
        ...this.state,
        account: null,
        isConnected: false
      };
    } else {
      this.state = {
        ...this.state,
        account: accounts[0]
      };
    }
    this.notifyListeners();
  };

  private handleChainChanged = () => {
    window.location.reload();
  };

  public connect = async (): Promise<boolean> => {
    if (!window.ethereum) {
      this.state.error = 'Please install MetaMask';
      this.notifyListeners();
      return false;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await this.initialize();
      return true;
    } catch (error) {
      console.error('Failed to connect:', error);
      this.state.error = 'Failed to connect to MetaMask';
      this.notifyListeners();
      return false;
    }
  };

  public getContract = (address: string): Contract | null => {
    if (!this.state.signer) {
      console.error('No signer available');
      return null;
    }

    try {
      const iface = new Interface(SocialNetwork.abi);
      return new Contract(address, iface, this.state.signer);
    } catch (error) {
      console.error('Failed to create contract instance:', error);
      return null;
    }
  };

  public getState = (): Web3State => {
    return { ...this.state };
  };

  public addListener = (listener: (state: Web3State) => void) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  };

  private notifyListeners = () => {
    this.listeners.forEach(listener => listener(this.getState()));
  };

  public disconnect = () => {
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', this.handleChainChanged);
    }
    this.state = {
      provider: null,
      signer: null,
      account: null,
      network: null,
      isConnected: false,
      error: null
    };
    this.notifyListeners();
  };
}

export const web3Handler = new Web3Handler(); 