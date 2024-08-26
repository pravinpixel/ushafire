/**
 * This file is part of AutoPack.
 *
 * Its is override varient the component of the mui
 *
 */
import { BaseSelectProps as Props } from '@mui/material/Select';

import { PaletteTheme } from './palette';
import { CustomShadow } from './custom-shadows';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    export: true;
  }
}

declare module '@mui/material/Select' {
  export interface BaseSelectProps {
    variant?: 'custom' | Props['variant']; // Add your custom variant here
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    subtitle3: true;
    textUnderLine: true;
    boldOne: true;
  }
}
declare module '@mui/material/Card' {
  interface CardPropsColorOverrides {}
}
declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    form: true;
    productCard: true;
    dealCard: true;
  }
}
declare module '@mui/material/styles' {
  interface PaletteColor {
    darker?: string;
    lighter?: string;
    backgoundColorLight?: string;
    extralight?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
    lighter?: string;
    backgoundColorLight?: string;
    extralight?: string;
  }
  interface Palette {
    customColor: PaletteTheme['customColor'];
  }
  interface TypeBackground {
    neutral?: string;
  }
  interface PaletteOptions {
    customColor: PaletteTheme['customColor'];
  }
  interface Theme {
    customShadows: CustomShadow;
  }
}
