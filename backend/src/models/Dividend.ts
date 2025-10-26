import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IDividend extends Document {
  userId: mongoose.Types.ObjectId;
  slotId: number;
  amount: number;
  claimTime: Date;
  isClaimed: boolean;
  transactionHash?: string;
  gasFee: number;
  type: 'slot' | 'royalty' | 'referral' | 'lottery';
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const DividendSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  slotId: {
    type: Number,
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  claimTime: {
    type: Date,
    default: null
  },
  isClaimed: {
    type: Boolean,
    default: false
  },
  transactionHash: {
    type: String,
    trim: true,
    sparse: true
  },
  gasFee: {
    type: Number,
    default: 0,
    min: 0
  },
  type: {
    type: String,
    required: true,
    enum: ['slot', 'royalty', 'referral', 'lottery'],
    default: 'slot'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
DividendSchema.index({ userId: 1, isClaimed: 1 });
DividendSchema.index({ claimTime: 1 });
DividendSchema.index({ status: 1 });
DividendSchema.index({ type: 1 });
DividendSchema.index({ createdAt: 1 });

const Dividend: Model<IDividend> = mongoose.model<IDividend>('Dividend', DividendSchema);
export default Dividend;