import {spacing, typography} from './theme';

export const createStyles = (colors, isDark) => ({
  // Common container styles
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  // Card styles
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.primary,
    shadowColor: colors.shadow.color,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: isDark ? 0.4 : 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  // Button styles
  button: {
    primary: {
      backgroundColor: colors.primary.main,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondary: {
      backgroundColor: 'transparent',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary.main,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },

  // Text styles
  text: {
    h1: {
      fontSize: typography.sizes.h1,
      fontFamily: typography.fonts.bold,
      color: colors.text.primary,
    },
    body1: {
      fontSize: typography.sizes.body1,
      fontFamily: typography.fonts.medium,
      color: colors.text.primary,
    },
    body2: {
      fontSize: typography.sizes.body2,
      fontFamily: typography.fonts.regular,
      color: colors.text.secondary,
    },
    caption: {
      fontSize: typography.sizes.caption,
      fontFamily: typography.fonts.regular,
      color: colors.text.tertiary,
    },
  },

  // Input styles
  input: {
    backgroundColor: colors.background.tertiary,
    borderRadius: 8,
    padding: spacing.md,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
});
