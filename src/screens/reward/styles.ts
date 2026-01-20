import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.secondary,
    },
    listContent: {
        paddingHorizontal: spacing['2xl'],
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: spacing.lg,
        marginBottom: spacing.xl,
    },
    backText: {
        fontSize: typography.fontSize.lg,
        color: colors.primary[500],
        fontWeight: typography.fontWeight.bold,
        marginLeft: spacing.xs,
    },
    titleSection: {
        marginBottom: spacing['3xl'],
    },
    title: {
        fontSize: typography.fontSize['4xl'],
        fontWeight: typography.fontWeight.extrabold,
        color: colors.text.primary,
        letterSpacing: -0.5,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: typography.fontSize.md,
        color: colors.text.tertiary,
    },
    emptyContainer: {
        paddingVertical: spacing['4xl'],
        alignItems: 'center',
    },
    emptyText: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.secondary,
        marginBottom: spacing.sm,
    },
    emptySubtext: {
        fontSize: typography.fontSize.md,
        color: colors.text.tertiary,
        textAlign: 'center',
    },
});
