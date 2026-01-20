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
    containerCollected: {
        backgroundColor: colors.background.secondary,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: borderRadius.full,
    },
    imageCollected: {
        opacity: 0.5,
    },
    imagePlaceholder: {
        width: 64,
        height: 64,
        borderRadius: borderRadius.full,
        backgroundColor: colors.background.tertiary,
    },
    checkOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: colors.background.primary,
        borderRadius: borderRadius.full,
    },
    content: {
        flex: 1,
        marginLeft: spacing.lg,
        marginRight: spacing.md,
    },
    name: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    nameCollected: {
        color: colors.text.tertiary,
    },
    pointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pointsIcon: {
        width: 18,
        height: 18,
        borderRadius: borderRadius.full,
        backgroundColor: colors.primary[500],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.xs,
    },
    pointsIconText: {
        fontSize: 10,
        color: colors.text.inverse,
        fontWeight: typography.fontWeight.bold,
    },
    pointsText: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
        color: colors.primary[500],
    },
    collectedText: {
        fontSize: typography.fontSize.md,
        color: colors.text.muted,
    },
    collectButton: {
        backgroundColor: colors.primary[500],
        borderRadius: borderRadius.full,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
    },
    collectButtonText: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.inverse,
    },
    ownedButton: {
        borderWidth: 1,
        borderColor: colors.border.default,
        borderRadius: borderRadius.full,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
    },
    ownedButtonText: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.medium,
        color: colors.text.muted,
        textTransform: 'uppercase',
    },
});
