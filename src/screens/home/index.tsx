import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { HomeScreenProps } from '@/navigation/types';
import { styles } from '@/screens/home/styles';
import CollectionCard from '@/components/CollectionCard';
import RewardCard from '@/components/RewardCard';
import { useRewards } from '@/hooks/useRewards';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { collectReward, selectCollectedRewards, selectCollectedRewardsCount } from '@/store';
import type { Reward } from '@/types/storeTypes';
import { colors } from '@/theme';


const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();
    const collectedCount = useAppSelector(selectCollectedRewardsCount);
    const collectedRewards = useAppSelector(selectCollectedRewards);
    const collectedIds = React.useMemo(
        () => new Set(collectedRewards.map((reward) => reward.id)),
        [collectedRewards]
    );
    const {
        rewards,
        isLoading,
        isLoadingMore,
        isRefreshing,
        error,
        fetchRewards,
        fetchMore,
        refresh,
    } = useRewards();

    useEffect(() => {
        fetchRewards();
    }, [fetchRewards]);

    const handleCollect = useCallback((reward: Reward) => {
        dispatch(collectReward(reward));
    }, [dispatch]);

    const renderRewardItem = useCallback(({ item }: { item: Reward }) => {
        const isCollected = collectedIds.has(item.id);
        return (
            <RewardCard
                name={item.name}
                points={item.needed_points}
                imageUrl={item.pictures?.[0]?.image}
                isCollected={isCollected}
                onCollect={() => handleCollect(item)}
            />
        );
    }, [handleCollect, collectedIds]);

    const renderHeader = () => (
        <>
            <View style={styles.header}>
                <Text style={styles.logo}>HeyLoyal</Text>
                <Text style={styles.headerSubtitle}>Your rewards, simplified.</Text>
            </View>

            <View style={styles.collectionCardContainer}>
                <CollectionCard 
                    onPress={() => navigation.navigate('Rewards')} 
                    itemCount={collectedCount}
                />
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Available Rewards</Text>
                <Text style={styles.sectionSubtitle}>Redeem your points for exclusive items</Text>
            </View>
        </>
    );

    const renderFooter = () => {
        if (!isLoadingMore) return null;
        return (
            <View style={styles.loadingMore}>
                <ActivityIndicator size="small" color={colors.primary[500]} />
            </View>
        );
    };

    const renderEmpty = () => {
        if (isLoading) return null;
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    {error || 'No rewards available'}
                </Text>
            </View>
        );
    };

    if (isLoading && rewards.length === 0) {
        return (
            <View style={[styles.container, styles.loadingContainer, { paddingTop: insets.top }]}>
                <ActivityIndicator size="large" color={colors.primary[500]} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={rewards}
                renderItem={renderRewardItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmpty}
                contentContainerStyle={[
                    styles.listContent,
                    { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }
                ]}
                onEndReached={fetchMore}
                onEndReachedThreshold={0.3}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={refresh}
                        tintColor={colors.primary[500]}
                        colors={[colors.primary[500]]}
                    />
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default HomeScreen;
