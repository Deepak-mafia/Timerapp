// theme/colors.js
const palette = {
  // Brand colors remain constant regardless of theme
  primary: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
  },
  secondary: {
    main: '#FF4081',
    light: '#FF80AB',
    dark: '#F50057',
  },
  // Status colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
};

export const lightColors = {
  ...palette,
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    tertiary: '#EEEEEE',
  },
  text: {
    primary: '#000000',
    secondary: '#757575',
    tertiary: '#9E9E9E',
    inverse: '#FFFFFF',
  },
  border: {
    primary: '#E0E0E0',
    secondary: '#BDBDBD',
  },
  shadow: {
    color: '#000000',
  },
};

export const darkColors = {
  ...palette,
  background: {
    primary: '#121212',
    secondary: '#1E1E1E',
    tertiary: '#2C2C2C',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    tertiary: '#808080',
    inverse: '#000000',
  },
  border: {
    primary: '#2C2C2C',
    secondary: '#404040',
  },
  shadow: {
    color: '#000000',
  },
};

// theme/typography.js
export const typography = {
  fonts: {
    regular: 'InterRegular',
    medium: 'InterMedium',
    bold: 'InterBold',
  },
  sizes: {
    h1: 32,
    h2: 24,
    h3: 20,
    h4: 18,
    h5: 16,
    body1: 16,
    body2: 14,
    caption: 12,
    button: 16,
  },
};

// theme/spacing.js
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
