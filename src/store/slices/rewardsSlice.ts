import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Reward, CollectedReward } from '@/types/storeTypes';

interface RewardsState {
  collectedRewards: CollectedReward[];
}

const initialState: RewardsState = {
  collectedRewards: [],
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    collectReward: (state, action: PayloadAction<Reward>) => {
      const reward = action.payload;
      
      const isAlreadyCollected = state.collectedRewards.some(
        (currentReward) => currentReward.id === reward.id
      );
      
      if (!isAlreadyCollected) {
        state.collectedRewards.push({
          ...reward,
          collectedAt: new Date().toISOString(),
        });
      }
    },
    
  },
});

export const { collectReward} = rewardsSlice.actions;

export const selectCollectedRewards = (state: { rewards: RewardsState }) => 
  state.rewards.collectedRewards;

export const selectIsRewardCollected = (rewardId: string) => 
  (state: { rewards: RewardsState }) => 
    state.rewards.collectedRewards.some((reward) => reward.id === rewardId);

export const selectCollectedRewardsCount = (state: { rewards: RewardsState }) => 
  state.rewards.collectedRewards.length;

export const selectTotalCollectedPoints = (state: { rewards: RewardsState }) => 
  state.rewards.collectedRewards.reduce((total, reward) => total + reward.needed_points, 0);

export default rewardsSlice.reducer;
