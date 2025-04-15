type EthereumMethod = 'eth_requestAccounts' | 'eth_accounts';

interface RequestArguments {
  method: EthereumMethod;
  params?: unknown[];
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: RequestArguments) => Promise<unknown>;
      on: (event: 'accountsChanged', callback: (accounts: string[]) => void) => void;
      removeListener: (event: 'accountsChanged', callback: (accounts: string[]) => void) => void;
      isMetaMask?: boolean;
    };
  }
}

export {}; 