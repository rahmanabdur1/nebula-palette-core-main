import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface ILottery extends Document {
  lotteryId: number;
  lotteryType: 'daily' | 'weekly' | 'jackpot';
  ticketPrice: number;
  prizePool: number;
  drawTime: Date;
  isDrawn: boolean;
  participants: Array<{
    userId: Types.ObjectId;
    ticketNumber: string;
    purchaseTime: Date;
  }>;
  winner?: Types.ObjectId;
  winningTicket?: string;
  transactionHash?: string;
  status: 'active' | 'completed' | 'cancelled';
  ticketsSold: number;
  maxTickets?: number;
  createdAt: Date;
  updatedAt: Date;
  
  // Add virtual properties to interface
  timeUntilDraw: number;
  isActive: boolean;
}

const LotterySchema: Schema = new Schema({
  lotteryId: {
    type: Number,
    required: true,
    unique: true
  },
  lotteryType: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'jackpot'],
    default: 'daily'
  },
  ticketPrice: {
    type: Number,
    required: true,
    min: 0
  },
  prizePool: {
    type: Number,
    default: 0,
    min: 0
  },
  drawTime: {
    type: Date,
    required: true
  },
  isDrawn: {
    type: Boolean,
    default: false
  },
  participants: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    ticketNumber: {
      type: String,
      required: true
    },
    purchaseTime: {
      type: Date,
      default: Date.now
    }
  }],
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    sparse: true
  },
  winningTicket: {
    type: String,
    sparse: true
  },
  transactionHash: {
    type: String,
    sparse: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  ticketsSold: {
    type: Number,
    default: 0,
    min: 0
  },
  maxTickets: {
    type: Number,
    min: 1
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
LotterySchema.index({ lotteryId: 1 });
LotterySchema.index({ lotteryType: 1 });
LotterySchema.index({ drawTime: 1 });
LotterySchema.index({ status: 1 });
LotterySchema.index({ isDrawn: 1 });

// Virtual for time until draw
LotterySchema.virtual('timeUntilDraw').get(function(this: ILottery) {
  return this.drawTime.getTime() - Date.now();
});

// Virtual for isActive
LotterySchema.virtual('isActive').get(function(this: ILottery) {
  return this.status === 'active' && !this.isDrawn && this.drawTime > new Date();
});

const Lottery: Model<ILottery> = mongoose.model<ILottery>('Lottery', LotterySchema);
export default Lottery;