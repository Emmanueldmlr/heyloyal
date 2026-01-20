import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '@/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card.background,
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.border.light,
        ...shadows.sm,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: typography.fontSize.md,
        color: colors.primary[500],
        marginBottom: spacing.lg,
        fontWeight: typography.fontWeight.medium,
    },
    button: {
        backgroundColor: colors.primary[500],
        borderRadius: borderRadius.full,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    buttonText: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.inverse,
    },
    buttonArrow: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.inverse,
        marginLeft: spacing.xs,
    },
    iconContainer: {
        position: 'relative',
        marginLeft: spacing.lg,
    },
    iconCircle: {
        width: 90,
        height: 90,
        borderRadius: borderRadius.full,
        backgroundColor: colors.primary[50],
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 28,
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: colors.primary[500],
        borderRadius: borderRadius.full,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xs,
    },
    badgeText: {
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.inverse,
    },
});
