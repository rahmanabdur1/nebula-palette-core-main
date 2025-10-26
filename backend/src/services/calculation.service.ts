import User from '../models/User';
import Slot from '../models/Slot';
import { CustomError } from '../middleware/error.middleware';

export class CalculationService {
  
  // Calculate user's total team size (direct + indirect)
  async calculateTotalTeam(userId: string): Promise<number> {
    const user = await User.findById(userId);
    if (!user) return 0;

    let totalTeam = user.directPartners;
    
    // Recursively calculate indirect team members
    const directReferrals = await User.find({ referrerId: user._id });
    
    for (const referral of directReferrals) {
      totalTeam += await this.calculateTotalTeam(referral._id.toString());
    }

    return totalTeam;
  }

  // Calculate available dividends for a user
  async calculateAvailableDividends(userId: string): Promise<number> {
    const user = await User.findById(userId);
    if (!user) return 0;

    let totalDividends = 0;

    // Calculate from activated slots
    const activatedSlots = Object.entries(user.slots).filter(([_, isActive]) => isActive);
    
    for (const [slotName] of activatedSlots) {
      const slot = await Slot.findOne({ 
        slotName: slotName.toUpperCase() 
      });
      
      if (slot && slot.isActive) {
        // Base dividend from slot activation
        totalDividends += slot.earnings * 0.1; // 10% of slot earnings
        
        // Bonus from team performance
        const teamBonus = await this.calculateTeamBonus(userId, slot.slotId);
        totalDividends += teamBonus;
      }
    }

    // Add royalty earnings if eligible
    const royaltyEarnings = await this.calculateRoyaltyEarnings(userId);
    totalDividends += royaltyEarnings;

    return totalDividends;
  }

  // Calculate team performance bonus
  private async calculateTeamBonus(userId: string, slotId: number): Promise<number> {
    const user = await User.findById(userId);
    if (!user) return 0;

    let teamBonus = 0;
    const directReferrals = await User.find({ referrerId: user._id });

    for (const referral of directReferrals) {
      const referralSlotKey = `slots.${slotId}`;
      const hasSlot = await User.findOne({
        _id: referral._id,
        [referralSlotKey]: true
      });

      if (hasSlot) {
        teamBonus += 0.05; // 5% bonus for each direct referral with same slot
      }
    }

    return teamBonus;
  }

  // Calculate royalty earnings based on level and performance
  async calculateRoyaltyEarnings(userId: string): Promise<number> {
    const user = await User.findById(userId);
    if (!user || user.royaltyLevel === 0) return 0;

    const royaltyLevels = [
      { level: 1, percentage: 0.10, base: 1000 },  // 10%
      { level: 2, percentage: 0.20, base: 2500 },  // 20%
      { level: 3, percentage: 0.30, base: 5000 },  // 30%
      { level: 4, percentage: 0.40, base: 10000 }  // 40%
    ];

    const level = royaltyLevels.find(l => l.level === user.royaltyLevel);
    if (!level) return 0;

    // Calculate based on team performance and level
    const teamPerformance = user.totalTeam / 1000; // Normalize team size
    return level.base * level.percentage * Math.min(teamPerformance, 1);
  }

  // Calculate commission distribution
  calculateCommissionDistribution(amount: number) {
    const distribution = {
      admin: amount * 0.20,      // 20%
      upline1: amount * 0.40,    // 40%
      upline2: amount * 0.10,    // 10%
      upline3: amount * 0.05,    // 5%
      upline4: amount * 0.05,    // 5%
      upline5: amount * 0.05,    // 5%
      salaryFund: amount * 0.10, // 10%
      dividendFund: amount * 0.05 // 5%
    };

    // Verify total is 100%
    const total = Object.values(distribution).reduce((sum, value) => sum + value, 0);
    if (Math.abs(total - amount) > 0.01) {
      throw new CustomError('Commission distribution error: total not 100%');
    }

    return distribution;
  }

  // Check if user qualifies for royalty level upgrade
  async checkRoyaltyQualification(userId: string): Promise<number> {
    const user = await User.findById(userId);
    if (!user) return 0;

    const royaltyRequirements = [
      {
        level: 1,
        matrixSlots: 5,
        globalSlots: 5,
        directPartners: 20,
        totalTeam: 100
      },
      {
        level: 2,
        matrixSlots: 10,
        globalSlots: 10,
        directPartners: 30,
        totalTeam: 300
      },
      {
        level: 3,
        matrixSlots: 15,
        globalSlots: 15,
        directPartners: 40,
        totalTeam: 600
      },
      {
        level: 4,
        matrixSlots: 20,
        globalSlots: 20,
        directPartners: 60,
        totalTeam: 1000
      }
    ];

    const activatedSlots = Object.values(user.slots).filter(Boolean).length;
    const globalSlots = 0; // This would come from global slot activations

    for (let i = royaltyRequirements.length - 1; i >= 0; i--) {
      const requirement = royaltyRequirements[i];
      
      if (activatedSlots >= requirement.matrixSlots &&
          globalSlots >= requirement.globalSlots &&
          user.directPartners >= requirement.directPartners &&
          user.totalTeam >= requirement.totalTeam) {
        return requirement.level;
      }
    }

    return 0;
  }
}

export const calculationService = new CalculationService();