import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import type { RewardsScreenProps } from '@/navigation/types';
import { useAppSelector } from '@/store/hooks';
import { selectCollectedRewards, selectCollectedRewardsCount, selectTotalCollectedPoints } from '@/store';
import type { CollectedReward } from '@/types/storeTypes';
import CollectedRewardCard from '@/components/CollectedRewardCard';
import AchievementSummary from '@/components/AchievementSummary';
import { colors } from '@/theme';
import { styles } from '@/screens/reward/styles';

const RewardsScreen = ({ navigation }: RewardsScreenProps) => {
    const insets = useSafeAreaInsets();
    const collectedRewards = useAppSelector(selectCollectedRewards);
    const rewardsCount = useAppSelector(selectCollectedRewardsCount);
    const totalPoints = useAppSelector(selectTotalCollectedPoints);

    const renderItem = ({ item }: { item: CollectedReward }) => (
        <CollectedRewardCard
            name={item.name}
            imageUrl={item.pictures?.[0]?.image}
            collectedAt={item.collectedAt}
        />
    );

    const renderHeader = () => (
        <>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
                activeOpacity={0.7}
            >
                <ChevronLeft size={20} color={colors.primary[500]} />
                <Text style={styles.backText}>Back to Rewards</Text>
            </TouchableOpacity>

            <View style={styles.titleSection}>
                <Text style={styles.title}>Collected Rewards</Text>
                <Text style={styles.subtitle}>View all your unlocked benefits</Text>
            </View>

            <AchievementSummary 
                rewardsCount={rewardsCount} 
                totalPoints={totalPoints} 
            />
        </>
    );

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No rewards collected yet</Text>
            <Text style={styles.emptySubtext}>
                Start collecting rewards from the home screen!
            </Text>
        </View>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <FlatList
                data={collectedRewards}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmpty}
                contentContainerStyle={[
                    styles.listContent,
                    { paddingBottom: insets.bottom + 20 },
                ]}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default RewardsScreen;
