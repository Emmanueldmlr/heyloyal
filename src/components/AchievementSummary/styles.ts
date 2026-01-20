import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card.background,
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        marginBottom: spacing['2xl'],
        borderWidth: 1,
        borderColor: colors.border.light,
    },
    header: {
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.tertiary,
        letterSpacing: 1,
        marginBottom: spacing.lg,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statItem: {
        flex: 1,
    },
    statValue: {
        fontSize: typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    pointsValue: {
        color: colors.primary[600],
    },
    statLabel: {
        fontSize: typography.fontSize.sm,
        color: colors.text.tertiary,
    },
    divider: {
        width: 1,
        height: 48,
        backgroundColor: colors.border.light,
        marginHorizontal: spacing.lg,
    },
});
