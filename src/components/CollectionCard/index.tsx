import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Gift, ChevronRight } from 'lucide-react-native';
import { colors } from '@/theme';
import { styles } from '@/components/CollectionCard/styles';

interface CollectionCardProps {
  onPress: () => void;
  itemCount?: number;
}

const CollectionCard = ({ onPress, itemCount }: CollectionCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Collection</Text>
        <Text style={styles.subtitle}>View your earned rewards</Text>
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Open Collection</Text>
          <ChevronRight size={16} color={colors.text.inverse} />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Gift size={36} color={colors.primary[500]} />
        </View>
        {itemCount !== undefined && itemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{itemCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CollectionCard;
