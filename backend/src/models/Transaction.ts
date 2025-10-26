import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  type: 'registration' | 'slot_activation' | 'dividend_claim' | 'royalty_salary' | 'lottery_purchase' | 'lottery_win' | 'commission';
  slotId?: number;
  lotteryId?: number;
  user: string; // User ID for display
  time: Date;
  transactionHash: string;
  status: 'pending' | 'completed' | 'failed';
  gasFee: number;
  currency: 'BNB' | 'USDT';
  description: string;
  relatedUserId?: mongoose.Types.ObjectId; // For commission transactions
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'registration', 
      'slot_activation', 
      'dividend_claim', 
      'royalty_salary', 
      'lottery_purchase', 
      'lottery_win', 
      'commission'
    ]
  },
  slotId: {
    type: Number,
    sparse: true
  },
  lotteryId: {
    type: Number,
    sparse: true
  },
  user: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: Date,
    default: Date.now,
    index: true
  },
  transactionHash: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
    index: true
  },
  gasFee: {
    type: Number,
    default: 0,
    min: 0
  },
  currency: {
    type: String,
    enum: ['BNB', 'USDT'],
    default: 'BNB'
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  relatedUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    sparse: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
TransactionSchema.index({ userId: 1, type: 1 });
TransactionSchema.index({ time: -1 });
TransactionSchema.index({ transactionHash: 1 });
TransactionSchema.index({ status: 1, createdAt: 1 });

// Virtual for display time (e.g., "2d ago")
TransactionSchema.virtual('displayTime').get(function(this: ITransaction) {
  const now = new Date();
  const diffMs = now.getTime() - this.time.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays > 0) {
    return `${diffDays}d ago`;
  } else {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes}m ago`;
    }
  }
});

const Transaction: Model<ITransaction> = mongoose.model<ITransaction>('Transaction', TransactionSchema);
export default Transaction;