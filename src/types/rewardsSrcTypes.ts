import type { Reward } from "@/types/storeTypes";

export interface RewardsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Reward[];
}

export interface FetchRewardsParams {
    page?: number;
    limit?: number;
}

