import rewardsReducer, {
    collectReward,
    selectCollectedRewards,
    selectCollectedRewardsCount,
    selectTotalCollectedPoints,
} from '@/store/slices/rewardsSlice';
import type { Reward } from '@/types/storeTypes';

describe('rewardsSlice', () => {
    const mockReward: Reward = {
        id: '1',
        name: 'Free Coffee',
        needed_points: 100,
        pictures: [{ id: 1, image: 'https://example.com/image.jpg', thumbnail: 'https://example.com/thumb.jpg' }],
        description: 'A delicious free coffee',
    };

    const mockReward2: Reward = {
        id: '2',
        name: '10% Discount',
        needed_points: 200,
        pictures: [{ id: 2, image: 'https://example.com/image2.jpg', thumbnail: 'https://example.com/thumb2.jpg' }],
    };

    describe('reducers', () => {
        it('should return initial state', () => {
            const state = rewardsReducer(undefined, { type: 'unknown' });
            expect(state.collectedRewards).toEqual([]);
        });

        describe('collectReward', () => {
            it('should add a reward to collected rewards', () => {
                const initialState = { collectedRewards: [] };
                const state = rewardsReducer(initialState, collectReward(mockReward));

                expect(state.collectedRewards).toHaveLength(1);
                expect(state.collectedRewards[0].id).toBe(mockReward.id);
                expect(state.collectedRewards[0].name).toBe(mockReward.name);
                expect(state.collectedRewards[0].collectedAt).toBeDefined();
            });

            it('should not add duplicate rewards', () => {
                const initialState = { collectedRewards: [] };
                let state = rewardsReducer(initialState, collectReward(mockReward));
                state = rewardsReducer(state, collectReward(mockReward));

                expect(state.collectedRewards).toHaveLength(1);
            });

            it('should add multiple different rewards', () => {
                const initialState = { collectedRewards: [] };
                let state = rewardsReducer(initialState, collectReward(mockReward));
                state = rewardsReducer(state, collectReward(mockReward2));

                expect(state.collectedRewards).toHaveLength(2);
            });
        });
    });

    describe('selectors', () => {
        const stateWithRewards = {
            rewards: {
                collectedRewards: [
                    { ...mockReward, collectedAt: new Date().toISOString() },
                    { ...mockReward2, collectedAt: new Date().toISOString() },
                ],
            },
        };

        const emptyState = {
            rewards: { collectedRewards: [] },
        };

        describe('selectCollectedRewards', () => {
            it('should return all collected rewards', () => {
                const result = selectCollectedRewards(stateWithRewards);
                expect(result).toHaveLength(2);
            });
        });

        describe('selectCollectedRewardsCount', () => {
            it('should return correct count', () => {
                expect(selectCollectedRewardsCount(stateWithRewards)).toBe(2);
            });

            it('should return 0 when no rewards', () => {
                expect(selectCollectedRewardsCount(emptyState)).toBe(0);
            });
        });

        describe('selectTotalCollectedPoints', () => {
            it('should calculate total points correctly', () => {
                expect(selectTotalCollectedPoints(stateWithRewards)).toBe(300);
            });

            it('should return 0 when no rewards', () => {
                expect(selectTotalCollectedPoints(emptyState)).toBe(0);
            });
        });
    });
});
