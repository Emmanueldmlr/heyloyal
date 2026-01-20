import { useState, useCallback, useRef, useEffect } from 'react';
import { fetchRewards as fetchRewardsApi } from '@/services/RewardsSrv';
import type { Reward } from '@/types/storeTypes';

interface RewardsState {
    rewards: Reward[];
    isLoading: boolean;
    isRefreshing: boolean;
    isLoadingMore: boolean;
    error: string | null;
    hasMore: boolean;
}

interface UseRewardsReturn extends RewardsState {
    fetchRewards: () => Promise<void>;
    fetchMore: () => Promise<void>;
    refresh: () => Promise<void>;
}

const ITEMS_PER_PAGE = 10;
const FETCH_MORE_DELAY = 1500;

const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(() => resolve(), ms));

export const useRewards = (): UseRewardsReturn => {
    const [state, setState] = useState<RewardsState>({
        rewards: [],
        isLoading: true, // Start with loading true to prevent flash of empty state
        isRefreshing: false,
        isLoadingMore: false,
        error: null,
        hasMore: true,
    });

    const pageRef = useRef(1);
    const isFetchingRef = useRef(false);
    const hasMoreRef = useRef(state.hasMore);
    const hasInitialLoadedRef = useRef(false); // Track if initial load completed

    // Keep hasMoreRef in sync with state
    useEffect(() => {
        hasMoreRef.current = state.hasMore;
    }, [state.hasMore]);

    const fetchRewards = useCallback(async () => {
        if (isFetchingRef.current) return;

        isFetchingRef.current = true;
        pageRef.current = 1;

        setState((prev) => ({
            ...prev,
            isLoading: true,
            error: null,
        }));

        try {
            const response = await fetchRewardsApi({
                page: 1,
                limit: ITEMS_PER_PAGE,
            });

            hasInitialLoadedRef.current = true; // Mark initial load as complete

            setState((prev) => ({
                ...prev,
                rewards: response.results,
                isLoading: false,
                hasMore: response.next !== null,
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch rewards';
            hasInitialLoadedRef.current = true; // Even on error, allow retries via fetchMore
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: errorMessage,
            }));
        } finally {
            isFetchingRef.current = false;
        }
    }, []);

    const fetchMore = useCallback(async () => {
        // Don't fetch more until initial load completes
        if (!hasInitialLoadedRef.current || isFetchingRef.current || !hasMoreRef.current) return;

        isFetchingRef.current = true;
        const nextPage = pageRef.current + 1;

        setState((prev) => ({
            ...prev,
            isLoadingMore: true,
        }));

        try {
            // Add delay before fetching more
            await delay(FETCH_MORE_DELAY);

            const response = await fetchRewardsApi({
                page: nextPage,
                limit: ITEMS_PER_PAGE,
            });

            pageRef.current = nextPage;

            setState((prev) => ({
                ...prev,
                rewards: [...prev.rewards, ...response.results],
                isLoadingMore: false,
                hasMore: response.next !== null,
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to load more rewards';
            setState((prev) => ({
                ...prev,
                isLoadingMore: false,
                error: errorMessage,
            }));
        } finally {
            isFetchingRef.current = false;
        }
    }, []);

    const refresh = useCallback(async () => {
        if (isFetchingRef.current) return;

        isFetchingRef.current = true;
        pageRef.current = 1;

        setState((prev) => ({
            ...prev,
            isRefreshing: true,
            error: null,
        }));

        try {
            const response = await fetchRewardsApi({
                page: 1,
                limit: ITEMS_PER_PAGE,
            });

            hasInitialLoadedRef.current = true;

            setState((prev) => ({
                ...prev,
                rewards: response.results,
                isRefreshing: false,
                hasMore: response.next !== null,
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to refresh rewards';
            setState((prev) => ({
                ...prev,
                isRefreshing: false,
                error: errorMessage,
            }));
        } finally {
            isFetchingRef.current = false;
        }
    }, []);

    return {
        ...state,
        fetchRewards,
        fetchMore,
        refresh,
    };
};
