import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { CircleCheck, MoveUpIcon } from 'lucide-react-native';
import { colors } from '@/theme';
import { styles } from '@/components/RewardCard/styles';

interface RewardCardProps {
    name: string;
    points: number;
    imageUrl?: string;
    isCollected?: boolean;
    onCollect?: () => void;
}

const RewardCard = memo(({
    name,
    points,
    imageUrl,
    isCollected = false,
    onCollect,
}: RewardCardProps) => {
    return (
        <View style={[styles.container, isCollected && styles.containerCollected]}>
            <View style={styles.imageContainer}>
                {imageUrl ? (
                    <Image 
                        source={{ uri: imageUrl }} 
                        style={[styles.image, isCollected && styles.imageCollected]} 
                    />
                ) : (
                    <View style={[styles.imagePlaceholder, isCollected && styles.imageCollected]} />
                )}
                {isCollected && (
                    <View style={styles.checkOverlay}>
                        <CircleCheck size={24} color={colors.primary[500]} fill={colors.background.primary} />
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <Text style={[styles.name, isCollected && styles.nameCollected]} numberOfLines={1}>
                    {name}
                </Text>
                {isCollected ? (
                    <Text style={styles.collectedText}>Collected</Text>
                ) : (
                    <View style={styles.pointsContainer}>
                        <View style={styles.pointsIcon}>
                            <MoveUpIcon size={10} color={colors.text.inverse} fill={colors.primary[500]}  />
                        </View>
                        <Text style={styles.pointsText}>{points} PTS</Text>
                    </View>
                )}
            </View>

            {isCollected ? (
                <View style={styles.ownedButton}>
                    <Text style={styles.ownedButtonText}>Owned</Text>
                </View>
            ) : (
                <TouchableOpacity 
                    style={styles.collectButton} 
                    onPress={onCollect}
                    activeOpacity={0.8}
                >
                    <Text style={styles.collectButtonText}>Collect</Text>
                </TouchableOpacity>
            )}
        </View>
    );
});

export default RewardCard;
