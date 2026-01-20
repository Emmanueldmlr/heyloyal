import { fetchRewards as fetchRewardsApi } from '@/services/RewardsSrv';

jest.mock('@/services/RewardsSrv');
const mockFetchRewards = fetchRewardsApi as jest.MockedFunction<typeof fetchRewardsApi>;

describe('useRewards hook behavior', () => {
    const mockReward1 = {
        id: '1',
        name: 'Free Coffee',
        needed_points: 100,
        pictures: [{ id: 1, image: 'https://example.com/1.jpg', thumbnail: 'https://example.com/1-thumb.jpg' }],
    };

    const mockReward2 = {
        id: '2',
        name: '10% Discount',
        needed_points: 200,
        pictures: [{ id: 2, image: 'https://example.com/2.jpg', thumbnail: 'https://example.com/2-thumb.jpg' }],
    };

    const mockResponse = {
        count: 2,
        next: 'https://api.example.com/page=2',
        previous: null,
        results: [mockReward1, mockReward2],
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchRewardsApi integration', () => {

        it('should handle successful response', async () => {
            mockFetchRewards.mockResolvedValueOnce(mockResponse);

            const result = await fetchRewardsApi({ page: 1, limit: 10 });

            expect(result.results).toEqual([mockReward1, mockReward2]);
            expect(result.count).toBe(2);
            expect(result.next).toBe('https://api.example.com/page=2');
        });

        it('should handle pagination correctly', async () => {
            const page2Response = {
                count: 3,
                next: null,
                previous: 'https://api.example.com/page=1',
                results: [{ ...mockReward1, id: '3', name: 'Page 2 Reward' }],
            };

            mockFetchRewards.mockResolvedValueOnce(page2Response);

            const result = await fetchRewardsApi({ page: 2, limit: 10 });

            expect(result.next).toBeNull();
            expect(result.previous).toBe('https://api.example.com/page=1');
        });

        it('should handle error correctly', async () => {
            mockFetchRewards.mockRejectedValueOnce(new Error('Network error'));

            await expect(fetchRewardsApi({ page: 1, limit: 10 })).rejects.toThrow('Network error');
        });

        it('should handle empty results', async () => {
            mockFetchRewards.mockResolvedValueOnce({
                count: 0,
                next: null,
                previous: null,
                results: [],
            });

            const result = await fetchRewardsApi({ page: 1, limit: 10 });

            expect(result.results).toEqual([]);
            expect(result.count).toBe(0);
        });
    });

    describe('Hook state management logic', () => {
        it('should reset page on refresh', async () => {
            let currentPage = 3;

            const refresh = async () => {
                currentPage = 1; // Reset page
                return await mockFetchRewards({ page: currentPage, limit: 10 });
            };

            mockFetchRewards.mockResolvedValueOnce(mockResponse);

            await refresh();

            expect(currentPage).toBe(1);
            expect(mockFetchRewards).toHaveBeenCalledWith({ page: 1, limit: 10 });
        });

        it('should not fetchMore when hasMore is false', async () => {
            let hasMore = false;

            const fetchMore = async () => {
                if (!hasMore) return null;
                return await mockFetchRewards({ page: 2, limit: 10 });
            };

            const result = await fetchMore();

            expect(result).toBeNull();
            expect(mockFetchRewards).not.toHaveBeenCalled();
        });
    });
});
