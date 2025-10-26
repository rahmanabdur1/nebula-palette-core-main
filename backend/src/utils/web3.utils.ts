import Web3 from 'web3';

// Custom Error Class
export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Type definitions
type WeiUnit = 'wei' | 'kwei' | 'mwei' | 'gwei' | 'szabo' | 'finney' | 'ether';
type TransactionObject = {
  from?: string;
  to: string;
  value?: string;
  gas?: number | string;
  gasPrice?: string;
  data?: string;
  nonce?: number;
};

interface Web3Account {
  address: string;
  privateKey: string;
}

interface Signature {
  message: string;
  messageHash: string;
  v: string;
  r: string;
  s: string;
  signature: string;
}

interface TransactionReceipt {
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  blockNumber: number;
  from: string;
  to: string | null;
  cumulativeGasUsed: number;
  gasUsed: number;
  effectiveGasPrice: number;
  contractAddress: string | null;
  status: boolean;
  logs: unknown[];
  logsBloom?: string;
  type?: number;
}

interface Block {
  number: number;
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  miner: string;
  difficulty: string;
  totalDifficulty: string;
  extraData: string;
  size: number;
  gasLimit: number;
  gasUsed: number;
  timestamp: number;
  transactions: string[];
  uncles: string[];
  baseFeePerGas?: string;
}

interface Transaction {
  hash: string;
  nonce: number;
  blockHash: string | null;
  blockNumber: number | null;
  transactionIndex: number | null;
  from: string;
  to: string | null;
  value: string;
  gas: number;
  gasPrice: string;
  input: string;
  type?: number;
  chainId?: number;
  v?: string;
  r?: string;
  s?: string;
}

export class Web3Utils {
  private web3: Web3;

  constructor(providerUrl: string) {
    this.web3 = new Web3(providerUrl);
  }

  // Validate Ethereum/BSC address
  isValidAddress(address: string): boolean {
    return this.web3.utils.isAddress(address);
  }

  // Convert to checksum address
  toChecksumAddress(address: string): string {
    return this.web3.utils.toChecksumAddress(address);
  }

  // Convert from wei to other units
  fromWei(amount: string | bigint, unit: WeiUnit = 'ether'): string {
    const amountString = typeof amount === 'bigint' ? amount.toString() : amount;
    return this.web3.utils.fromWei(amountString, unit);
  }

  // Convert to wei from other units
  toWei(amount: string, unit: WeiUnit = 'ether'): string {
    return this.web3.utils.toWei(amount, unit);
  }

  // Get current gas price
  async getGasPrice(): Promise<string> {
    try {
      const gasPrice = await this.web3.eth.getGasPrice();
      return this.fromWei(gasPrice, 'gwei');
    } catch (error) {
      throw new CustomError('Failed to get gas price', 500);
    }
  }

  // Get transaction receipt with proper typing
  async getTransactionReceipt(txHash: string): Promise<TransactionReceipt | null> {
    try {
      const receipt = await this.web3.eth.getTransactionReceipt(txHash);
      
      if (!receipt) {
        return null;
      }

      return {
        transactionHash: receipt.transactionHash,
        transactionIndex: Number(receipt.transactionIndex),
        blockHash: receipt.blockHash,
        blockNumber: Number(receipt.blockNumber),
        from: receipt.from,
        to: receipt.to ?? null,
        cumulativeGasUsed: Number(receipt.cumulativeGasUsed),
        gasUsed: Number(receipt.gasUsed),
        effectiveGasPrice: Number(receipt.effectiveGasPrice),
        contractAddress: receipt.contractAddress ?? null,
        status: receipt.status ? true : false,
        logs: receipt.logs,
        logsBloom: receipt.logsBloom,
        type: receipt.type ? Number(receipt.type) : undefined
      };
    } catch (error) {
      throw new CustomError('Failed to get transaction receipt', 500);
    }
  }

  // Get block number
  async getBlockNumber(): Promise<number> {
    try {
      const blockNumber = await this.web3.eth.getBlockNumber();
      return Number(blockNumber);
    } catch (error) {
      throw new CustomError('Failed to get block number', 500);
    }
  }

  // Get account balance
  async getBalance(address: string): Promise<string> {
    try {
      if (!this.isValidAddress(address)) {
        throw new CustomError('Invalid address format', 400);
      }

      const balance = await this.web3.eth.getBalance(address);
      return this.fromWei(balance, 'ether');
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('Failed to get balance', 500);
    }
  }

  // Estimate gas for transaction
  async estimateGas(transaction: TransactionObject): Promise<number> {
    try {
      const gasEstimate = await this.web3.eth.estimateGas(transaction);
      return Number(gasEstimate);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gas estimation failed';
      throw new CustomError(`Gas estimation failed: ${errorMessage}`, 400);
    }
  }

  // Create account
  createAccount(): Web3Account {
    const account = this.web3.eth.accounts.create();
    return {
      address: account.address,
      privateKey: account.privateKey
    };
  }

  // Sign message
  signMessage(message: string, privateKey: string): Signature {
    try {
      const signature = this.web3.eth.accounts.sign(message, privateKey);
      return {
        message: signature.message ?? message,
        messageHash: signature.messageHash,
        v: signature.v,
        r: signature.r,
        s: signature.s,
        signature: signature.signature
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signing failed';
      throw new CustomError(`Signing failed: ${errorMessage}`, 400);
    }
  }

  // Verify signature
  verifySignature(message: string, signature: string, address: string): boolean {
    try {
      const recoveredAddress = this.web3.eth.accounts.recover(message, signature);
      return recoveredAddress.toLowerCase() === address.toLowerCase();
    } catch (error) {
      return false;
    }
  }

  // Recover address from signature
  recoverAddress(message: string, signature: string): string {
    try {
      return this.web3.eth.accounts.recover(message, signature);
    } catch (error) {
      throw new CustomError('Failed to recover address from signature', 400);
    }
  }

  // Generate random hex
  randomHex(size: number): string {
    return this.web3.utils.randomHex(size);
  }

  // Keccak256 hash
  keccak256(data: string): string {
    return this.web3.utils.keccak256(data);
  }


// SHA3 hash
sha3(data: string): string | null {
  const result = this.web3.utils.sha3(data);
  return result ?? null;
}

  // Convert number to hex
  numberToHex(value: number | string | bigint): string {
    return this.web3.utils.numberToHex(value);
  }

  // Convert hex to number
  hexToNumber(hex: string): number {
    return Number(this.web3.utils.hexToNumber(hex));
  }

  // Check if value is hex
  isHex(value: string): boolean {
    return this.web3.utils.isHex(value);
  }

  // Check if value is hex strict
  isHexStrict(value: string): boolean {
    return this.web3.utils.isHexStrict(value);
  }

  // Get network ID
  async getNetworkId(): Promise<number> {
    try {
      const networkId = await this.web3.eth.net.getId();
      return Number(networkId);
    } catch (error) {
      throw new CustomError('Failed to get network ID', 500);
    }
  }

  // Get peer count
  async getPeerCount(): Promise<number> {
    try {
      const peerCount = await this.web3.eth.net.getPeerCount();
      return Number(peerCount);
    } catch (error) {
      throw new CustomError('Failed to get peer count', 500);
    }
  }

  // Get transaction count for address
  async getTransactionCount(address: string): Promise<number> {
    try {
      if (!this.isValidAddress(address)) {
        throw new CustomError('Invalid address format', 400);
      }

      const transactionCount = await this.web3.eth.getTransactionCount(address);
      return Number(transactionCount);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('Failed to get transaction count', 500);
    }
  }

  // Get block by number with proper type handling
  async getBlock(blockNumber: number | 'latest'): Promise<Block | null> {
    try {
      const block = await this.web3.eth.getBlock(blockNumber);
      
      if (!block) {
        return null;
      }

      // Handle all BigInt conversions safely
      const difficulty = this.convertToSafeString(block.difficulty);
      const totalDifficulty = this.convertToSafeString(block.totalDifficulty);
      const nonce = this.convertToSafeString(block.nonce);
      const baseFeePerGas = this.convertToSafeString(block.baseFeePerGas);

      return {
        number: block.number ? Number(block.number) : 0,
        hash: block.hash ?? '',
        parentHash: block.parentHash,
        nonce: nonce,
        sha3Uncles: block.sha3Uncles ?? '',
        logsBloom: block.logsBloom ?? '',
        transactionsRoot: block.transactionsRoot ?? '',
        stateRoot: block.stateRoot ?? '',
        miner: block.miner ?? '',
        difficulty: difficulty,
        totalDifficulty: totalDifficulty,
        extraData: block.extraData ?? '',
        size: Number(block.size),
        gasLimit: Number(block.gasLimit),
        gasUsed: Number(block.gasUsed),
        timestamp: Number(block.timestamp),
        transactions: block.transactions as string[],
        uncles: block.uncles,
        baseFeePerGas: baseFeePerGas || undefined
      };
    } catch (error) {
      throw new CustomError('Failed to get block', 500);
    }
  }

  // Safe conversion utility for BigInt and undefined values
  private convertToSafeString(value: bigint | string | number | undefined | null): string {
    if (value === undefined || value === null) {
      return '';
    }
    
    if (typeof value === 'bigint') {
      return value.toString();
    }
    
    if (typeof value === 'number') {
      return value.toString();
    }
    
    return value;
  }

  // Check if address is a contract
  async isContractAddress(address: string): Promise<boolean> {
    try {
      if (!this.isValidAddress(address)) {
        return false;
      }

      const code = await this.web3.eth.getCode(address);
      return code !== '0x';
    } catch (error) {
      return false;
    }
  }

  // Get gas price in wei
  async getGasPriceInWei(): Promise<number> {
    try {
      const gasPrice = await this.web3.eth.getGasPrice();
      return Number(gasPrice);
    } catch (error) {
      throw new CustomError('Failed to get gas price', 500);
    }
  }

  // Validate private key
  validatePrivateKey(privateKey: string): boolean {
    try {
      this.web3.eth.accounts.privateKeyToAccount(privateKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get account from private key
  getAccountFromPrivateKey(privateKey: string): Web3Account {
    try {
      const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
      return {
        address: account.address,
        privateKey: account.privateKey
      };
    } catch (error) {
      throw new CustomError('Invalid private key', 400);
    }
  }

  // Get transaction by hash with proper type handling
  async getTransaction(txHash: string): Promise<Transaction | null> {
    try {
      const transaction = await this.web3.eth.getTransaction(txHash);
      
      if (!transaction) {
        return null;
      }

      // Handle all value conversions safely
      const value = this.convertToSafeString(transaction.value);
      const gasPrice = this.convertToSafeString(transaction.gasPrice);
      const gas = Number(transaction.gas);
      const nonce = Number(transaction.nonce);
      const blockNumber = transaction.blockNumber ? Number(transaction.blockNumber) : null;
      const transactionIndex = transaction.transactionIndex ? Number(transaction.transactionIndex) : null;

      return {
        hash: transaction.hash,
        nonce: nonce,
        blockHash: transaction.blockHash ?? null,
        blockNumber: blockNumber,
        transactionIndex: transactionIndex,
        from: transaction.from,
        to: transaction.to ?? null,
        value: value,
        gas: gas,
        gasPrice: gasPrice,
        input: transaction.input,
        type: transaction.type ? Number(transaction.type) : undefined,
        chainId: transaction.chainId ? Number(transaction.chainId) : undefined,
        v: transaction.v?.toString(),
        r: transaction.r ?? undefined,
        s: transaction.s ?? undefined
      };
    } catch (error) {
      throw new CustomError('Failed to get transaction', 500);
    }
  }

  // Check if transaction is pending
  async isTransactionPending(txHash: string): Promise<boolean> {
    try {
      const receipt = await this.getTransactionReceipt(txHash);
      return receipt === null;
    } catch (error) {
      return false;
    }
  }

  // Check if transaction is confirmed
  async isTransactionConfirmed(txHash: string): Promise<boolean> {
    try {
      const receipt = await this.getTransactionReceipt(txHash);
      return receipt !== null && receipt.status;
    } catch (error) {
      return false;
    }
  }

  // Wait for transaction confirmation
  async waitForTransactionConfirmation(txHash: string, timeoutMs: number = 120000): Promise<TransactionReceipt> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeoutMs) {
      const receipt = await this.getTransactionReceipt(txHash);
      
      if (receipt) {
        return receipt;
      }
      
      // Wait 2 seconds before checking again
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    throw new CustomError('Transaction confirmation timeout', 408);
  }

  // Get current base fee (for EIP-1559 transactions)
  async getBaseFee(): Promise<string> {
    try {
      const block = await this.getBlock('latest');
      if (!block) {
        throw new Error('Failed to get latest block');
      }
      
      // For networks that support EIP-1559
      if (block.baseFeePerGas) {
        return this.fromWei(block.baseFeePerGas, 'gwei');
      }
      
      return this.fromWei('2000000000', 'gwei'); // Default fallback
    } catch (error) {
      // Fallback to gas price if base fee is not available
      return this.getGasPrice();
    }
  }

  // Get block with simplified data (for common use cases)
  async getBlockSimple(blockNumber: number | 'latest'): Promise<{
    number: number;
    hash: string;
    miner: string;
    timestamp: number;
    transactions: string[];
    gasUsed: number;
    gasLimit: number;
  } | null> {
    try {
      const block = await this.web3.eth.getBlock(blockNumber);
      
      if (!block) {
        return null;
      }

      return {
        number: block.number ? Number(block.number) : 0,
        hash: block.hash ?? '',
        miner: block.miner ?? '',
        timestamp: Number(block.timestamp),
        transactions: block.transactions as string[],
        gasUsed: Number(block.gasUsed),
        gasLimit: Number(block.gasLimit)
      };
    } catch (error) {
      throw new CustomError('Failed to get block', 500);
    }
  }

  // Get transaction count in a block
  async getBlockTransactionCount(blockNumber: number | 'latest'): Promise<number> {
    try {
      const transactionCount = await this.web3.eth.getBlockTransactionCount(blockNumber);
      return Number(transactionCount);
    } catch (error) {
      throw new CustomError('Failed to get block transaction count', 500);
    }
  }

  // Get transaction by block number and index
  async getTransactionFromBlock(blockNumber: number | 'latest', index: number): Promise<Transaction | null> {
    try {
      const transaction = await this.web3.eth.getTransactionFromBlock(blockNumber, index);
      
      if (!transaction) {
        return null;
      }

      return this.getTransaction(transaction.hash);
    } catch (error) {
      throw new CustomError('Failed to get transaction from block', 500);
    }
  }
}

// Create singleton instance with proper error handling
const bscNodeUrl = process.env.BSC_NODE_URL || 'https://bsc-dataseed.binance.org/';

export const web3Utils = new Web3Utils(bscNodeUrl);

// Export types for external use
export type {
  WeiUnit,
  TransactionObject,
  Web3Account,
  Signature,
  TransactionReceipt,
  Block,
  Transaction
};