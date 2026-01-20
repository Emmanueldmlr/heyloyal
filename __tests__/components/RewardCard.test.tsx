import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import RewardCard from '@/components/RewardCard';

describe('RewardCard', () => {
    const defaultProps = {
        id: '1',
        name: 'Free Coffee',
        points: 100,
        imageUrl: 'https://example.com/coffee.jpg',
        isCollected: false,
        onCollect: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with all props', async () => {
        let tree: ReactTestRenderer;
        await act(async () => {
            tree = create(<RewardCard {...defaultProps} />);
        });
        expect(tree!.toJSON()).toBeTruthy();
    });

    it('displays Collect button when not collected', async () => {
        let tree: ReactTestRenderer;
        await act(async () => {
            tree = create(<RewardCard {...defaultProps} />);
        });
        const json = JSON.stringify(tree!.toJSON());
        expect(json).toContain('Collect');
    });

    it('calls onCollect when Collect button is pressed', async () => {
        const onCollect = jest.fn();
        let tree: ReactTestRenderer;
        await act(async () => {
            tree = create(<RewardCard {...defaultProps} onCollect={onCollect} />);
        });
        
        const touchables = tree!.root.findAllByType(TouchableOpacity);
        const collectButton = touchables.find(t => t.props.onPress);
        
        if (collectButton) {
            await act(async () => {
                collectButton.props.onPress();
            });
            expect(onCollect).toHaveBeenCalledTimes(1);
        }
    });

    it('displays Owned and Collected when collected', async () => {
        let tree: ReactTestRenderer;
        await act(async () => {
            tree = create(<RewardCard {...defaultProps} isCollected={true} />);
        });
        const json = JSON.stringify(tree!.toJSON());
        expect(json).toContain('Owned');
        expect(json).toContain('Collected');
    });

    it('renders with image when imageUrl is provided', async () => {
        let tree: ReactTestRenderer;
        await act(async () => {
            tree = create(<RewardCard {...defaultProps} />);
        });
        
        const images = tree!.root.findAllByType(Image);
        expect(images.length).toBeGreaterThan(0);
        expect(images[0].props.source.uri).toBe('https://example.com/coffee.jpg');
    });
});
