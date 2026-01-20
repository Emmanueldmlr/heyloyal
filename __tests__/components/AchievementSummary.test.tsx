import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import AchievementSummary from '@/components/AchievementSummary';

describe('AchievementSummary', () => {
    const defaultProps = {
        rewardsCount: 12,
        totalPoints: 8400,
    };

    it('displays achievement summary content', async () => {
        let tree: ReactTestRenderer;
        await act(async () => {
            tree = create(<AchievementSummary {...defaultProps} />);
        });
        const json = JSON.stringify(tree!.toJSON());
        expect(json).toContain('ACHIEVEMENT SUMMARY');
        expect(json).toContain('12');
        expect(json).toContain('Rewards Earned');
        expect(json).toContain('Total Points Saved');
    });

    it('handles zero values', async () => {
        let tree: ReactTestRenderer;
        await act(async () => {
            tree = create(<AchievementSummary rewardsCount={0} totalPoints={0} />);
        });
        const json = JSON.stringify(tree!.toJSON());
        expect(json).toContain('0');
    });
});
