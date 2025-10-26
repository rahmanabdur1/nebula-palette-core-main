import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ISlot extends Document {
  slotId: number;
  slotName: string;
  slotType: 'future_matrix' | 'future_global';
  price: number; // in USDT
  usersRequired: number;
  isActive: boolean;
  isCompleted: boolean;
  earnings: number;
  level: number;
  activationCount: number;
  totalEarnings: number;
  createdAt: Date;
  updatedAt: Date;
}

const SlotSchema: Schema = new Schema({
  slotId: {
    type: Number,
    required: true,
    unique: true
  },
  slotName: {
    type: String,
    required: true,
    enum: ['SILVER', 'GOLD', 'DIAMOND', 'PLATINUM', 'RUBY'],
    trim: true
  },
  slotType: {
    type: String,
    required: true,
    enum: ['future_matrix', 'future_global'],
    default: 'future_matrix'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  usersRequired: {
    type: Number,
    required: true,
    min: 1
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  earnings: {
    type: Number,
    default: 0,
    min: 0
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  activationCount: {
    type: Number,
    default: 0,
    min: 0
  },
  totalEarnings: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Indexes
SlotSchema.index({ slotId: 1 });
SlotSchema.index({ slotType: 1 });
SlotSchema.index({ isActive: 1 });
SlotSchema.index({ level: 1 });

const Slot: Model<ISlot> = mongoose.model<ISlot>('Slot', SlotSchema);
export default Slot;