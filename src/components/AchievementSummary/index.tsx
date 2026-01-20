import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '@/components/AchievementSummary/styles';
import { formatNumber } from '@/utils/utilityFxns';

interface AchievementSummaryProps {
    rewardsCount: number;
    totalPoints: number;
}

const AchievementSummary = ({ rewardsCount, totalPoints }: AchievementSummaryProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>ACHIEVEMENT SUMMARY</Text>
            
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{formatNumber(rewardsCount)}</Text>
                    <Text style={styles.statLabel}>Rewards Earned</Text>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, styles.pointsValue]}>
                        {formatNumber(totalPoints)}
                    </Text>
                    <Text style={styles.statLabel}>Total Points Saved</Text>
                </View>
            </View>
        </View>
    );
};

export default AchievementSummary;
