/**
 * This file is part of AutoPack.
 *
 * It is create own Typography customize is mui Typography
 *
 */

import { TypographyOptions, TypographyStyleOptions } from '@mui/material/styles/createTypography';

import { pxToRem } from 'helper/GlobalHelper';

export interface TypographyType extends TypographyOptions {
  fontSecondaryFamily: string;
  fontWeightSemiBold: number;
  subtitle3: TypographyStyleOptions;
  boldOne: TypographyStyleOptions;
  textUnderLine: TypographyStyleOptions;
}

type PropsType = {
  sm: number;
  md: number;
  lg: number;
};

// ----------------------------------------------------------------------

export function responsiveFontSizes({ sm, md, lg }: PropsType) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

export const primaryFont = 'Inter, sans-serif';
export const secondaryFont = 'Barlow, sans-serif';

// ----------------------------------------------------------------------

export const typography: TypographyType = {
  fontFamily: primaryFont,
  fontSecondaryFamily: secondaryFont,
  fontWeightRegular: 450,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 600,
  h1: {
    fontWeight: 600,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 600,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 550,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 550,
    lineHeight: 1.5,
    fontSize: pxToRem(22),
    ...responsiveFontSizes({ sm: 20, md: 26, lg: 28 }),
  },
  h5: {
    fontWeight: 550,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 19, md: 22, lg: 24 }),
  },
  h6: {
    fontWeight: 550,
    lineHeight: 28 / 18,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 18, md: 20, lg: 22 }),
  },
  boldOne: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
  },
  subtitle1: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 500,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  subtitle3: {
    fontWeight: 400,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  textUnderLine: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    textDecoration: 'underline',
    color: 'GrayText',
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 450,
    lineHeight: 24 / 14,
    fontSize: '0.875rem',
    textTransform: 'unset',
  },
};
