import Config from 'react-native-config';
import type { FetchRewardsParams, RewardsResponse } from '@/types/rewardsSrcTypes';

const API_BASE_URL = Config.API_BASE_URL || 'https://staging.helloagain.at/api/v1/clients/5189';

export const fetchRewards = async (params: FetchRewardsParams = {}): Promise<RewardsResponse> => {
    const { page = 1, limit = 10 } = params;

    const url = `${API_BASE_URL}/bounties/?page=${page}&limit=${limit}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch rewards");
    }

    const data: RewardsResponse = await response.json();

    const filteredResults = data.results.filter(
        (reward) => reward.pictures && reward.pictures.length > 0
    );

    return {
        ...data,
        results: filteredResults,
    };
}
