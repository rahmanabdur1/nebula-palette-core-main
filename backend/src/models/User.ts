import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  walletAddress: string;
  userId: number;
  username: string;
  email?: string;
  joinDate: Date;
  referrerId?: Types.ObjectId;
  directPartners: number;
  totalTeam: number;
  totalProfit: number;
  dividedEarn: number;
  socialLinks: {
    telegram?: string;
    twitter?: string;
    instagram?: string;
  };
  avatar?: string;
  isActive: boolean;
  level: number;
  slots: {
    silver: boolean;
    gold: boolean;
    diamond: boolean;
    platinum?: boolean;
    ruby?: boolean;
  };
  royaltyLevel: number;
  lastDividendClaim?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  walletAddress: {
    type: String,
    required: [true, 'Wallet address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v: string): boolean {
        return /^0x[a-fA-F0-9]{40}$/.test(v);
      },
      message: 'Invalid wallet address format'
    }
  },
  userId: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    sparse: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v: string): boolean {
        return !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  referrerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  directPartners: {
    type: Number,
    default: 0,
    min: 0
  },
  totalTeam: {
    type: Number,
    default: 0,
    min: 0
  },
  totalProfit: {
    type: Number,
    default: 0,
    min: 0
  },
  dividedEarn: {
    type: Number,
    default: 0,
    min: 0
  },
  socialLinks: {
    telegram: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    instagram: {
      type: String,
      trim: true
    }
  },
  avatar: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 10
  },
  slots: {
    silver: {
      type: Boolean,
      default: false
    },
    gold: {
      type: Boolean,
      default: false
    },
    diamond: {
      type: Boolean,
      default: false
    }
  },
  royaltyLevel: {
    type: Number,
    default: 0,
    min: 0,
    max: 4
  },
  lastDividendClaim: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Virtual for referral link
UserSchema.virtual('referralLink').get(function(this: IUser): string {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  return `${frontendUrl}/register?ref=${this.userId}`;
});

// Indexes
UserSchema.index({ walletAddress: 1 });
UserSchema.index({ userId: 1 });
UserSchema.index({ referrerId: 1 });
UserSchema.index({ isActive: 1 });

// Auto-increment userId
UserSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastUser = await User.findOne().sort({ userId: -1 });
    this.userId = lastUser ? lastUser.userId + 1 : 10000;
  }
  next();
});

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;