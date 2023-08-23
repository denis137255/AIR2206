import { Dimensions, PixelRatio } from 'react-native';

// Calculate responsive font size based on device width
const responsiveFontSize = (fontSize) => {
  const { width: screenWidth } = Dimensions.get('window');
  const designWidth = 375; // Width of the design mockup
  const scaleFactor = screenWidth / designWidth;
  const adjustedFontSize = fontSize * scaleFactor;
  return PixelRatio.roundToNearestPixel(adjustedFontSize);
};

// Font sizes
export const FONT_SIZE_SMALL = responsiveFontSize(14);
export const FONT_SIZE_MEDIUM = responsiveFontSize(16);
export const FONT_SIZE_LARGE = responsiveFontSize(18);

// Font families
export const FONT_FAMILY_REGULAR = 'Roboto-Regular';
export const FONT_FAMILY_BOLD = 'Roboto-Bold';
export const FONT_FAMILY_ITALIC = 'Roboto-Italic';

// Common colors
export const PRIMARY_COLOR = '#FFC107'; // A variant of yellow
export const SECONDARY_COLOR = '#121212'; // A variant of black
export const TEXT_COLOR = 'white';

// Button style

// Text input style

export const TEXT_INPUT_STYLE = {
  width: '100%',
  height: 48,
  borderWidth: 1,
  borderColor: PRIMARY_COLOR,
  paddingHorizontal: SPACING_MEDIUM,
  marginBottom: SPACING_MEDIUM,
  fontSize: FONT_SIZE_MEDIUM,
  fontFamily: FONT_FAMILY_REGULAR,
  borderRadius: BORDER_RADIUS,
  color: TEXT_COLOR,
  backgroundColor: 'transparent',
};

export const BUTTON_CONTAINER = {
  flexDirection: 'column',
  height: '15%',
  alignContent: 'center',
  justifyContent: 'center',
  marginTop: SPACING_MEDIUM,
  width: '50%',
};

export const BUTTON_WRAPPER = {
  flex: 1,
  marginHorizontal: SPACING_MEDIUM,
};

// Other styles
export const BORDER_RADIUS = 8;
export const SPACING_SMALL = 8;
export const SPACING_MEDIUM = 16;
export const SPACING_LARGE = 24;

// Centered container style
export const CENTERED_CONTAINER = {
  flex: 1,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 35,
  backgroundColor: SECONDARY_COLOR,
};

// Export the complete object as well
export const StyleUtils = {
  responsiveFontSize,
  FONT_SIZE_SMALL,
  FONT_SIZE_MEDIUM,
  FONT_SIZE_LARGE,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_ITALIC,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TEXT_COLOR,
  BORDER_RADIUS,
  SPACING_SMALL,
  SPACING_MEDIUM,
  SPACING_LARGE,
  CENTERED_CONTAINER,
   // Add the centered container style
  // Export more styles as needed
};

export default StyleUtils;
