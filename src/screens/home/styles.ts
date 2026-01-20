import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  flatList: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing['2xl'],
  },
  header: {
    paddingTop: spacing['3xl'],
    paddingBottom: spacing['3xl'],
  },
  logo: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.extrabold,
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  collectionCardContainer: {
    marginBottom: spacing['4xl'],
  },
  sectionHeader: {
    marginBottom: spacing['2xl'],
  },
  sectionTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.tertiary,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMore: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: spacing['4xl'],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    color: colors.text.muted,
  },
});
