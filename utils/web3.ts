import { BrowserProvider, Contract, type JsonRpcSigner } from 'ethers';
import type { ContractInterface } from 'ethers';

interface Web3State {
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  account: string | null;
}

export class Web3Handler {
  private state: Web3State = {
    provider: null,
    signer: null,
    account: null
  };

  async initialize(): Promise<boolean> {
    if (typeof window === 'undefined' || !window.ethereum) {
      console.error('MetaMask is not installed');
      return false;
    }

    try {
      this.state.provider = new BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      }) as string[];
      
      this.state.account = accounts[0];
      this.state.signer = await this.state.provider.getSigner();
      
      return true;
    } catch (error) {
      console.error('Failed to initialize Web3:', error);
      return false;
    }
  }

  async createContract(
    address: string,
    abi: ContractInterface
  ): Promise<Contract | null> {
    if (!this.state.signer || !address) {
      console.error('Signer or contract address not available');
      return null;
    }

    try {
      return new Contract(address, abi, this.state.signer);
    } catch (error) {
      console.error('Failed to create contract instance:', error);
      return null;
    }
  }

  getAccount(): string | null {
    return this.state.account;
  }

  async handleAccountsChanged(accounts: string[]): Promise<void> {
    if (accounts.length === 0) {
      this.state.account = null;
      this.state.signer = null;
    } else if (accounts[0] !== this.state.account) {
      this.state.account = accounts[0];
      if (this.state.provider) {
        this.state.signer = await this.state.provider.getSigner();
      }
    }
  }

  setupAccountChangeListener(callback: (accounts: string[]) => void): void {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', callback);
    }
  }

  removeAccountChangeListener(callback: (accounts: string[]) => void): void {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.removeListener('accountsChanged', callback);
    }
  }
} 