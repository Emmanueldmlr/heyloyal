import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Sparkles, ChevronRight } from 'lucide-react-native';
import { colors } from '@/theme';
import { styles } from '@/components/CollectedRewardCard/styles';
import { formatDate } from '@/utils/utilityFxns';

interface CollectedRewardCardProps {
    name: string;
    imageUrl?: string;
    collectedAt: string;
    onPress?: () => void;
}



const CollectedRewardCard = memo(({
    name,
    imageUrl,
    collectedAt,
    onPress,
}: CollectedRewardCardProps) => {
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={onPress}
            activeOpacity={0.7}
            disabled={!onPress}
        >
            <View style={styles.imageContainer}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                ) : (
                    <View style={styles.imagePlaceholder} />
                )}
            </View>

            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>
                    {name}
                </Text>
                <View style={styles.collectedRow}>
                    <View style={styles.sparkleCircle}>
                        <Sparkles size={10} color={colors.text.inverse} />
                    </View>
                    <Text style={styles.collectedText}>
                        Collected on {formatDate(collectedAt)}
                    </Text>
                </View>
            </View>

            <ChevronRight size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
    );
});

export default CollectedRewardCard;
