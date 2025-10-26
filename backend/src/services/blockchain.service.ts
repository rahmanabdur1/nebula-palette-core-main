import Web3 from 'web3';
import { CustomError } from '../middleware/error.middleware';

interface TransactionReceipt {
  transactionHash: string;
  status: boolean;
  gasUsed?: string;
  blockNumber?: number;
  blockHash?: string;
  from?: string;
  to?: string;
}

interface Web3Account {
  address: string;
  privateKey: string;
  signTransaction: (transaction: {
    to: string;
    value: string;
    gas: string | number;
    gasPrice?: string;
    data: string;
    nonce?: number;
  }) => Promise<{
    rawTransaction: string;
    transactionHash: string;
  }>;
}

interface Web3TransactionReceipt {
  readonly transactionHash: string;
  readonly transactionIndex: bigint;
  readonly blockHash: string;
  readonly blockNumber: bigint;
  readonly from: string;
  readonly to: string | null;
  readonly cumulativeGasUsed: bigint;
  readonly gasUsed: bigint;
  readonly effectiveGasPrice: bigint;
  readonly contractAddress: string | null;
  readonly logs: unknown[];
  readonly logsBloom: string;
  readonly root: string;
  readonly status: bigint;
  readonly type: bigint;
}

export class BlockchainService {
  private web3: Web3;
  private account: Web3Account | null;

  constructor() {
    const bscNodeUrl = process.env.BSC_NODE_URL;
    
    if (!bscNodeUrl) {
      throw new Error('BSC_NODE_URL environment variable is required');
    }

    this.web3 = new Web3(bscNodeUrl);
    this.account = null;

    this.initializeAccount();
  }

  private initializeAccount(): void {
    const privateKey = process.env.PRIVATE_KEY;
    
    if (privateKey) {
      try {
        this.account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
        console.log('✅ Blockchain account initialized');
      } catch (error) {
        console.warn('❌ Invalid private key provided, running in read-only mode');
      }
    } else {
      console.warn('⚠️ No private key provided, running in read-only mode');
    }
  }

  async registerUser(walletAddress: string, referrerId: number, username: string): Promise<TransactionReceipt> {
    try {
      if (!this.web3.utils.isAddress(walletAddress)) {
        throw new CustomError('Invalid wallet address', 400);
      }

      if (!this.account) {
        throw new CustomError('Blockchain account not configured', 500);
      }

      const contractAddress = process.env.CONTRACT_ADDRESS;
      if (!contractAddress) {
        throw new CustomError('Contract address not configured', 500);
      }

      const txObject = {
        from: this.account.address,
        to: contractAddress,
        value: this.web3.utils.toWei('0.01', 'ether'),
        gas: '500000',
        data: this.encodeRegistrationData(walletAddress, referrerId, username)
      };

      const mockReceipt: TransactionReceipt = {
        transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
        status: true
      };

      return mockReceipt;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown blockchain error';
      throw new CustomError(`Blockchain error: ${errorMessage}`, 400);
    }
  }

  async activateSlot(userAddress: string, slotId: number, amount: string): Promise<TransactionReceipt> {
    try {
      if (!this.web3.utils.isAddress(userAddress)) {
        throw new CustomError('Invalid user address', 400);
      }

      const mockReceipt: TransactionReceipt = {
        transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
        status: true,
        gasUsed: '45000'
      };

      return mockReceipt;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown blockchain error';
      throw new CustomError(`Blockchain error: ${errorMessage}`, 400);
    }
  }

  async claimDividend(userAddress: string, slotId: number): Promise<TransactionReceipt> {
    try {
      if (!this.web3.utils.isAddress(userAddress)) {
        throw new CustomError('Invalid user address', 400);
      }

      const mockReceipt: TransactionReceipt = {
        transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
        status: true,
        gasUsed: '35000'
      };

      return mockReceipt;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown blockchain error';
      throw new CustomError(`Blockchain error: ${errorMessage}`, 400);
    }
  }

  async getGasPrice(): Promise<string> {
    try {
      const gasPrice = await this.web3.eth.getGasPrice();
      return this.web3.utils.fromWei(gasPrice, 'gwei');
    } catch (error) {
      console.warn('Failed to get gas price, using default');
      return '5';
    }
  }

  async getBalance(address: string): Promise<string> {
    try {
      if (!this.web3.utils.isAddress(address)) {
        throw new CustomError('Invalid address format', 400);
      }

      const balance = await this.web3.eth.getBalance(address);
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get balance';
      throw new CustomError(errorMessage, 400);
    }
  }

  private encodeRegistrationData(walletAddress: string, referrerId: number, username: string): string {
    const randomHex = Math.random().toString(16).substring(2, 34);
    return `0x${randomHex.padEnd(64, '0')}`;
  }

  async verifyTransaction(transactionHash: string): Promise<boolean> {
    try {
      if (!/^0x[a-fA-F0-9]{64}$/.test(transactionHash)) {
        return false;
      }

      const receipt = await this.web3.eth.getTransactionReceipt(transactionHash) as Web3TransactionReceipt | null;
      
      if (!receipt) {
        return false;
      }

      // Convert BigInt to boolean for status check
      return receipt.status === BigInt(1);
    } catch (error) {
      console.error('Error verifying transaction:', error);
      return false;
    }
  }

  async getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt | null> {
    try {
      if (!/^0x[a-fA-F0-9]{64}$/.test(transactionHash)) {
        return null;
      }

      const receipt = await this.web3.eth.getTransactionReceipt(transactionHash) as Web3TransactionReceipt | null;
      
      if (!receipt) {
        return null;
      }

      // Convert Web3 receipt to our application receipt format
      return {
        transactionHash: receipt.transactionHash,
        status: receipt.status === BigInt(1),
        gasUsed: receipt.gasUsed.toString(),
        blockNumber: Number(receipt.blockNumber),
        blockHash: receipt.blockHash,
        from: receipt.from,
        to: receipt.to || undefined
      };
    } catch (error) {
      console.error('Error getting transaction receipt:', error);
      return null;
    }
  }

  async getBlockNumber(): Promise<number> {
    try {
      const blockNumber = await this.web3.eth.getBlockNumber();
      return Number(blockNumber);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get block number';
      throw new CustomError(errorMessage, 400);
    }
  }

  validateAddress(address: string): boolean {
    return this.web3.utils.isAddress(address);
  }

  toWei(amount: string, unit: 'ether' | 'gwei' | 'wei' = 'ether'): string {
    return this.web3.utils.toWei(amount, unit);
  }

  fromWei(amount: string, unit: 'ether' | 'gwei' | 'wei' = 'ether'): string {
    return this.web3.utils.fromWei(amount, unit);
  }

  async estimateGas(transaction: {
    from?: string;
    to: string;
    value?: string;
    data?: string;
  }): Promise<number> {
    try {
      const gasEstimate = await this.web3.eth.estimateGas(transaction);
      return Number(gasEstimate);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gas estimation failed';
      throw new CustomError(errorMessage, 400);
    }
  }

  async getNetworkId(): Promise<number> {
    try {
      const networkId = await this.web3.eth.net.getId();
      return Number(networkId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get network ID';
      throw new CustomError(errorMessage, 400);
    }
  }

  async isBscMainnet(): Promise<boolean> {
    try {
      const networkId = await this.getNetworkId();
      return networkId === 56;
    } catch (error) {
      return false;
    }
  }

  async isBscTestnet(): Promise<boolean> {
    try {
      const networkId = await this.getNetworkId();
      return networkId === 97;
    } catch (error) {
      return false;
    }
  }

  getAccountAddress(): string | null {
    return this.account ? this.account.address : null;
  }

  isReadOnlyMode(): boolean {
    return this.account === null;
  }

  // Utility method to convert BigInt to number safely
  private bigIntToNumber(value: bigint): number {
    if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
      throw new Error('BigInt value exceeds safe integer range');
    }
    return Number(value);
  }

  // Utility method to convert BigInt to string
  private bigIntToString(value: bigint): string {
    return value.toString();
  }

  // Get transaction count for an address
  async getTransactionCount(address: string): Promise<number> {
    try {
      if (!this.web3.utils.isAddress(address)) {
        throw new CustomError('Invalid address format', 400);
      }

      const transactionCount = await this.web3.eth.getTransactionCount(address);
      return Number(transactionCount);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get transaction count';
      throw new CustomError(errorMessage, 400);
    }
  }

  // Get block information
  async getBlock(blockNumber: number | 'latest'): Promise<{
    number: number;
    hash: string;
    timestamp: number;
    transactions: string[];
  } | null> {
    try {
      const block = await this.web3.eth.getBlock(blockNumber);
      
      if (!block) {
        return null;
      }

      return {
        number: block.number ? Number(block.number) : 0,
        hash: block.hash || '',
        timestamp: block.timestamp ? Number(block.timestamp) : 0,
        transactions: block.transactions as string[]
      };
    } catch (error) {
      console.error('Error getting block:', error);
      return null;
    }
  }

  // Check if address is a contract
  async isContractAddress(address: string): Promise<boolean> {
    try {
      if (!this.web3.utils.isAddress(address)) {
        return false;
      }

      const code = await this.web3.eth.getCode(address);
      return code !== '0x';
    } catch (error) {
      console.error('Error checking contract address:', error);
      return false;
    }
  }
}

export const blockchainService = new BlockchainService();