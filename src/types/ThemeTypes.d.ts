import { Theme as DefaultTheme } from "@mui/material";
import { PaletteOptions as DefaultPaletteOptions } from "@mui/material/styles";
import {
	TypographyStyleOptions,
	FontStyleOptions,
	Variant as DefaultVariants,
	FontStyle,
	TypographyUtils,
} from "@mui/material/styles/createTypography";

type CustomVariants = "f10" | "f12" | "f14" | "f16" | "f18" | "f20" | "f23" | "f24" | "f28" | "f32" | 'f40' | 'f52';
type CustomColorKey = "blue" | "yellow" | "organge" | "red" | "green"| "low" | "medium" | "high" | "darkGreyOne" ;

export interface Typography
	extends Record<DefaultVariants | CustomVariants, TypographyStyleOptions>,
	FontStyle,
	TypographyUtils { }

interface ModifiedTypography
	extends Partial<Record<DefaultVariants | CustomVariants, TypographyStyleOptions> & FontStyleOptions> {
	[key in CustomVariants]: TypographyStyleOptions;
	secondaryFont?: string;
	fontWeight?: 400 | 500 | 600 | 700;
	fontSizeList: {
		[key in CustomVariants]: number;
	};
}

type CustomColorProps = {
	[key in CustomColorKey]: string;
};

declare module "@mui/material/styles" {
	interface Palette extends DefaultPaletteOptions {
		customColor: CustomColorProps;
	}
}

declare module "@mui/material/styles/createTypography" {
	interface TypographyOptions extends ModifiedTypography { }
}

declare module "@mui/material" {
	interface PaperPropsVariantOverrides {
		task: true;
	}

	interface Theme extends DefaultTheme {
		typography: ModifiedTypography;
	}

	// interface ChipPropsColorOverrides {
	// 	yellow: [
    //         "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"
	// 	]
	// }
}

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		f12: true;
		f14: true;
		f16: true;
		f18: true;
		f20: true;
		f23: true;
		f24: true;
		f28: true;
		f32: true;
		f40: true;
	}
}

declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		white: true;
	}
}
