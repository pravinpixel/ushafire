/**
 * This file is part of AutoPack.
 *
 * It is create own Typography customize is mui Typography
 *
 */

import { TypographyOptions } from "@mui/material/styles/createTypography";
import { pxToRem } from "../helpers/globalHelper";
import { CustomVariants } from "../../types/ThemeTypes";


type BreakpointsType = "xs"|"sm" | "md" | "lg";
type PropsType = {
	[key in BreakpointsType]: number;
};

// ----------------------------------------------------------------------

export function responsiveFontSizes({ xs,sm, md, lg }: PropsType) {
	return {
		"@media (min-width:320px)": {
			fontSize: xs,
		},
		"@media (min-width:600px)": {
			fontSize: sm,
		},
		"@media (min-width:900px)": {
			fontSize: md,
		},
		"@media (min-width:1200px)": {
			fontSize: lg,
		},
	};
}

export const fontFamily = "Satoshi-Regular";
export const secondaryFont = "Inter, sans-serif";

// ----------------------------------------------------------------------

export const fontWeightRegular = 400;
export const fontWeightMedium = 500;
export const fontWeightBold = 700;



const fontSizeList: TypographyOptions['fontSizeList'] = {
	f10: 10,
	f12: 12,
	f14: 14,
	f16: 16,
	f18: 16,
	f20: 20,
	f23: 23,
	f24: 22,
	f28: 26,
	f32: 32,
	f40: 40,
	f52: 52,
}

function createCustomFontSize() {
	const returnObj: Omit<TypographyOptions, 'fontSizeList'> = {
	}
	Object.entries(fontSizeList).forEach(([name, value]) => {
		const objectName = (name as CustomVariants)
		returnObj[objectName] = {
			fontWeight: fontWeightRegular,
			lineHeight: (value * 2) / value,
			fontSize: pxToRem(value),
			// ...responsiveFontSizes({xs :value-4, sm: value - 4, md: value - 2, lg: value }),
			...responsiveFontSizes({xs :value, sm: value, md: value, lg: value })
		}
	})

	return returnObj
}

export const typography: TypographyOptions = {
	fontFamily,
	secondaryFont,
	fontWeightRegular,
	fontWeightMedium,
	fontWeightBold,
	fontSizeList,
	...createCustomFontSize()
};
