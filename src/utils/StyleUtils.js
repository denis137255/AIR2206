import { Dimensions, PixelRatio, StatusBar, Platform } from 'react-native';

const responsiveFontSize = (fontSize) => {
  const { width: screenWidth } = Dimensions.get('window');
  const designWidth = 375; // Width of the design mockup
  const scaleFactor = screenWidth / designWidth;
  const adjustedFontSize = fontSize * scaleFactor;
  return PixelRatio.roundToNearestPixel(adjustedFontSize);
};

export const getStatusBarHeight = () => {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight || 0;
  } else {
    // On iOS, there's no need to account for the status bar height
    return 0;
  }
};

export const FONT_SIZE_SMALL = responsiveFontSize(14);
export const FONT_SIZE_MEDIUM = responsiveFontSize(16);
export const FONT_SIZE_LARGE = responsiveFontSize(18);

export const FONT_FAMILY_REGULAR = 'Roboto-Regular';
export const FONT_FAMILY_BOLD = 'Roboto-Bold';
export const FONT_FAMILY_ITALIC = 'Roboto-Italic';

export const PRIMARY_COLOR = '#FFC107'; // A variant of yellow
export const SECONDARY_COLOR = '#121212'; // A variant of black
export const TEXT_COLOR = 'white';

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
  height: '10%',
  alignContent: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: SPACING_MEDIUM,
};

export const BUTTON_WRAPPER = {
  flex: 1,
  marginHorizontal: SPACING_MEDIUM,
  marginTop: SPACING_MEDIUM,
};

export const BORDER_RADIUS = 8;
export const SPACING_SMALL = 8;
export const SPACING_MEDIUM = 16;
export const SPACING_LARGE = 24;

export const CENTERED_CONTAINER = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: getStatusBarHeight(),
  backgroundColor: SECONDARY_COLOR,
};

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
};

export default StyleUtils;
