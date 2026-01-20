import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import CollectedRewardCard from '@/components/CollectedRewardCard';

// Mock lucide-react-native icons
jest.mock('lucide-react-native', () => ({
    Sparkles: () => 'Sparkles',
    ChevronRight: () => 'ChevronRight',
}));

describe('CollectedRewardCard', () => {
    const defaultProps = {
        name: 'Free Coffee',
        imageUrl: 'https://example.com/coffee.jpg',
        collectedAt: '2023-10-15T10:30:00.000Z',
        onPress: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('displays the reward name and collection info', async () => {
        let tree: ReactTestRenderer;
        await act(async () => {
            tree = create(<CollectedRewardCard {...defaultProps} />);
        });
        const json = JSON.stringify(tree!.toJSON());
        expect(json).toContain('Free Coffee');
        expect(json).toContain('Collected on');
    });

    it('renders image when imageUrl is provided', async () => {
        let tree: ReactTestRenderer;
        await act(async () => {
            tree = create(<CollectedRewardCard {...defaultProps} />);
        });
        
        const images = tree!.root.findAllByType(Image);
        expect(images.length).toBeGreaterThan(0);
        expect(images[0].props.source.uri).toBe('https://example.com/coffee.jpg');
    });

});
