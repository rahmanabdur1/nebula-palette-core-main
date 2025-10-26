import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IRoyalty extends Document {
  level: number;
  salaryPercentage: number;
  matrixRequired: number;
  globalRequired: number;
  directPartnersRequired: number;
  totalTeamRequired: number;
  salaryAmount: number;
  isActive: boolean;
  achieversCount: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const RoyaltySchema: Schema = new Schema({
  level: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 4
  },
  salaryPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  matrixRequired: {
    type: Number,
    required: true,
    min: 0
  },
  globalRequired: {
    type: Number,
    required: true,
    min: 0
  },
  directPartnersRequired: {
    type: Number,
    required: true,
    min: 0
  },
  totalTeamRequired: {
    type: Number,
    required: true,
    min: 0
  },
  salaryAmount: {
    type: Number,
    required: true,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  achieversCount: {
    type: Number,
    default: 0,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Pre-defined royalty levels
RoyaltySchema.statics.initializeRoyaltyLevels = async function() {
  const levels = [
    {
      level: 1,
      salaryPercentage: 10,
      matrixRequired: 5,
      globalRequired: 5,
      directPartnersRequired: 20,
      totalTeamRequired: 100,
      salaryAmount: 1000,
      description: "Level 1 Royalty - Basic Achiever"
    },
    {
      level: 2,
      salaryPercentage: 20,
      matrixRequired: 10,
      globalRequired: 10,
      directPartnersRequired: 30,
      totalTeamRequired: 300,
      salaryAmount: 2500,
      description: "Level 2 Royalty - Advanced Achiever"
    },
    {
      level: 3,
      salaryPercentage: 30,
      matrixRequired: 15,
      globalRequired: 15,
      directPartnersRequired: 40,
      totalTeamRequired: 600,
      salaryAmount: 5000,
      description: "Level 3 Royalty - Expert Achiever"
    },
    {
      level: 4,
      salaryPercentage: 40,
      matrixRequired: 20,
      globalRequired: 20,
      directPartnersRequired: 60,
      totalTeamRequired: 1000,
      salaryAmount: 10000,
      description: "Level 4 Royalty - Master Achiever"
    }
  ];

  for (const levelData of levels) {
    await this.findOneAndUpdate(
      { level: levelData.level },
      levelData,
      { upsert: true, new: true }
    );
  }
};

const Royalty: Model<IRoyalty> = mongoose.model<IRoyalty>('Royalty', RoyaltySchema);
export default Royalty;