import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '@/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card.background,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
        ...shadows.sm,
    },
    imageContainer: {
        marginRight: spacing.lg,
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: borderRadius.full,
        backgroundColor: colors.background.tertiary,
    },
    imagePlaceholder: {
        width: 56,
        height: 56,
        borderRadius: borderRadius.full,
        backgroundColor: colors.background.tertiary,
    },
    content: {
        flex: 1,
        marginRight: spacing.md,
    },
    name: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    collectedRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sparkleCircle: {
        width: 18,
        height: 18,
        borderRadius: borderRadius.full,
        backgroundColor: colors.primary[500],
        justifyContent: 'center',
        alignItems: 'center',
    },
    collectedText: {
        fontSize: typography.fontSize.sm,
        color: colors.primary[500],
        marginLeft: spacing.xs,
    },
});
