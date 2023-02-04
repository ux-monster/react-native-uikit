import {Dimensions} from 'react-native';
import {isTablet} from 'react-native-device-info';

export const colors = {
  primary: '#EC8B57',
  black: '#191919',
  red: '#FF3636',
  lightBlue: '#36D2FF',
  green: '#8FEF73',
  grey: '#767676',
  borderGrey: '#C9C9C9',
  statusGrey: '#666666',
  textGrey: '#A2A2A2',
  darkBlue: '#83abeb',
};

export const fonts = {
  noto_sans_kr: {
    thin: 'NotoSansKR-Thin',
    light: 'NotoSansKR-Light',
    medium: 'NotoSansKR-Medium',
    regular: 'NotoSansKR-Regular',
    bold: 'NotoSansKR-Bold',
    black: 'NotoSansKR-Black',
  },
  roboto: {
    thin: 'Roboto-Thin',
    light: 'Roboto-Light',
    medium: 'Roboto-Medium',
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
  },
};

// Design file size
export const basicDimensions = {
  height: 900,
  width: 360,
};

export const hp = (mobileValue: number, tabletValue?: number) => {
  const value = isTablet() && tabletValue ? tabletValue : mobileValue;
  return Math.floor(
    Dimensions.get('screen').height * (1 / basicDimensions.height) * value,
  );
};

export const wp = (mobileValue: number, tabletValue?: number) => {
  const value = isTablet() && tabletValue ? tabletValue : mobileValue;
  return Math.floor(
    Dimensions.get('screen').width * (1 / basicDimensions.width) * value,
  );
};
