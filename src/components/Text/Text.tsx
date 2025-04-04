import React, {ComponentProps} from 'react';
import {TextStyle} from 'react-native';

import {createText} from '@shopify/restyle';
import {Theme} from '../../theme/theme';

const SHText = createText<Theme>();
type SHTextProps = ComponentProps<typeof SHText>;

export type TextProps = SHTextProps & {
  style?: TextStyle;
  preset?: TextVariants;
  bold?: boolean;
  italic?: boolean;
  semiBold?: boolean;
};

export function Text({
  preset = 'paragraphMedium',
  bold,
  italic,
  semiBold,
  style,
  children,
  ...restProps
}: TextProps) {
  const fontFamily = getFontFamily(preset, bold, italic, semiBold);
  return (
    <SHText
      color="backgroundContrast"
      style={[$fontSizes[preset], style, {fontFamily}]}
      {...restProps}>
      {children}
    </SHText>
  );
}

function getFontFamily(
  preset: TextVariants,
  bold?: boolean,
  italic?: boolean,
  semiBold?: boolean,
) {
  if (
    preset === 'headingLarge' ||
    preset === 'headingSmall' ||
    preset === 'paragraphMedium'
  ) {
    return italic ? $fontFamily.boldItalic : $fontFamily.bold;
  }
  switch (true) {
    case bold && italic:
      return $fontFamily.boldItalic;
    case bold:
      return $fontFamily.bold;
    case italic:
      return $fontFamily.italic;
    case semiBold && italic:
      return $fontFamily.mediumItalic;
    case semiBold:
      return $fontFamily.medium;
    default:
      return $fontFamily.regular;
  }
}

type TextVariants =
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'paragraphLarge'
  | 'paragraphMedium'
  | 'paragraphSmall'
  | 'paragraphCaption'
  | 'paragraphCaptionSmall';

export const $fontSizes: Record<TextVariants, TextStyle> = {
  headingLarge: {fontSize: 32, lineHeight: 38.4},
  headingMedium: {fontSize: 22, lineHeight: 26.4},
  headingSmall: {fontSize: 18, lineHeight: 23.4},
  paragraphLarge: {fontSize: 18, lineHeight: 25.2},
  paragraphMedium: {fontSize: 16, lineHeight: 22.4},
  paragraphSmall: {fontSize: 14, lineHeight: 19.6},
  paragraphCaption: {fontSize: 12, lineHeight: 16.8},
  paragraphCaptionSmall: {fontSize: 11, lineHeight: 15},
};

export const $fontFamily = {
  black: 'Nunito-Black',
  blackItalic: 'Nunito-BlackItalic',
  bold: 'Nunito-Bold',
  boldItalic: 'Nunito-BoldItalic',
  extraBold: 'Nunito-ExtraBold',
  extraBoldItalic: 'Nunito-ExtraBoldItalic',
  extraLight: 'Nunito-ExtraLight',
  extraLightItalic: 'Nunito-ExtraLightItalic',
  italic: 'Nunito-Italic',
  light: 'Nunito-Light',
  lightItalic: 'Nunito-LightItalic',
  medium: 'Nunito-Medium',
  mediumItalic: 'Nunito-MediumItalic',
  regular: 'Nunito-Regular',
  semiBold: 'Nunito-SemiBold',
  semiBoldItalic: 'Nunito-SemiBoldItalic',
};
