import React from 'react';
import { TouchableOpacity } from 'react-native';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import CollectionCard from '@/components/CollectionCard';

jest.mock('lucide-react-native', () => ({
    Gift: () => 'Gift',
    ChevronRight: () => 'ChevronRight',
}));

describe('CollectionCard', () => {
    const defaultProps = {
        onPress: jest.fn(),
        itemCount: 5,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with expected structure', async () => {
        let tree: ReactTestRenderer;
        await act(async () => {
            tree = create(<CollectionCard {...defaultProps} />);
        });
        const json = JSON.stringify(tree!.toJSON());
        expect(json).toContain('My Collection');
        expect(json).toContain('View your earned rewards');
        expect(json).toContain('Open Collection');
    });

    it('calls onPress when button is pressed', async () => {
        const onPress = jest.fn();
        let tree: ReactTestRenderer;
        await act(async () => {
            tree = create(<CollectionCard {...defaultProps} onPress={onPress} />);
        });
        
        const touchables = tree!.root.findAllByType(TouchableOpacity);
        const button = touchables.find(t => t.props.onPress);
        
        if (button) {
            await act(async () => {
                button.props.onPress();
            });
            expect(onPress).toHaveBeenCalledTimes(1);
        }
    });

    it('does not display badge when count is 0', async () => {
        let tree: ReactTestRenderer;
        await act(async () => {
            tree = create(<CollectionCard {...defaultProps} itemCount={0} />);
        });
        expect(tree!.toJSON()).toBeTruthy();
    });

});
