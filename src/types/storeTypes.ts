export interface RewardImage {
    id: number;
    image: string;
    thumbnail: string;
}

export interface Reward {
    id: string;
    name: string;
    needed_points: number;
    pictures: RewardImage[];
    description?: string;
    expires_at?: string;
}

export interface CollectedReward extends Reward {
    collectedAt: string;
}
