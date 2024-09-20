/**
 * This file is part of AutoPack.
 *
 * Its is override color of the mui palette
 *
 */
import { CommonColors } from "@mui/material/styles/createPalette";
import { alpha, PaletteColorOptions } from "@mui/material/styles";

// ----------------------------------------------------------------------


export const grey = {
	100: "#F9FAFB",
	200: "#F9F9F9",
	300: "#DFE3E8",
	400: "#C4CDD5",
	500: "#919EAB",
	600: "#9F9F9F",
	700: "#454F5B",
	800: "#202020",
	900: "#161C24",
};

export const customColor = {
	organge: 'rgba(254, 96, 6, 1)',
	blue: "rgba(0, 106, 215, 1)",
	yellow: "#FFB627",
	red: "rgba(255, 13, 4, 1)",
	green: "#2ACE3A",
	low:"#B7B7B7",
	high:"#FF0000",
	medium:"#FFB627",
	duebytoday:"#FE6006",
	duebytomorrow:"#006AD7",
	overdue:"#FF0D04",
	darkGreyOne : grey[900]
};

export const greyColor = [
	"#f5f5f5",
	"#e7e7e7",
	"#cdcdcd",
	"#b2b2b2",
	"#9a9a9a",
	"#8b8b8b",
	"#848484",
	"#717171",
	"#656565",
	"#575757",
];
export const yelowColor = [
	"#fff8e0",
	"#ffefca",
	"#ffdd99",
	"#ffcb62",
	"#ffbb36",
	"#ffb118",
	"#ffac03",
	"#e49600",
	"#ca8400",
	"#b07200",
];

export const primaryColor = [
	"hsla(359, 100%, 94%, 1)",
	"#f2dde3",
	"#e1b8c4",
	"#d191a3",
	"#c37087",
	"#bb5b75",
	"#b8506d",
	"#a2415c",
	"#923851",
	"#812d46",
];


export const primary: PaletteColorOptions = {
	light: primaryColor?.[1],
	main: primaryColor?.[8],
	dark: primaryColor?.[9],
	contrastText: greyColor[0],
};

export const secondary: PaletteColorOptions = {
	// lighter: '#3cc2fe',
	light: "#23b9fe",
	main: "#00B2FF",
	dark: "#009ee4",
	// darker: '#008dcd',
	contrastText: "#FFFFFF",
	// backgoundColorLight: '#64d0ff',
};

export const info: PaletteColorOptions = {
	// lighter: '#d0cccd',
	light: "#b3b1b2",
	main: "#9F9F9F",
	dark: "#8b8b8b",
	// darker: '#858484',
	contrastText: "#FFFFFF",
	// backgoundColorLight: '#DCDCDC',
	// extralight: '#808285',
};

export const success: PaletteColorOptions = {
	// lighter: '#C8FAD6',
	light: "#DCF5E7",
	main: "#50CD89",
	dark: "#007867",
	// darker: '#004B50',
	contrastText: "#FFFFFF",
	// backgoundColorLight: '#DCDCDC',
};

export const warning: PaletteColorOptions = {
	// lighter: '#FFF5CC',
	light: yelowColor[1],
	main: yelowColor[5],
	dark: yelowColor[8],
	// darker: '#7A4100',
	// extralight: '#F25C54',
	// backgoundColorLight: '#DCDCDC',
	contrastText: grey[800],
};

export const error: PaletteColorOptions = {
	light: "#FEECF1",
	main: "#F1416C",
	dark: "#f14d44",
	contrastText: "#FFFFFF",
};

export const common: Partial<CommonColors> = {
	black: "#202020",
	white: "#FFFFFF",
};

export const action = {
	hover: alpha(grey[500], 0.08),
	selected: alpha(grey[500], 0.16),
	disabled: alpha(grey[500], 0.8),
	disabledBackground: alpha(grey[500], 0.24),
	focus: alpha(grey[500], 0.24),
	hoverOpacity: 0.08,
	disabledOpacity: 0.48,
};

const base = {
	primary,
	secondary,
	info,
	success,
	warning,
	error,
	customColor,
	grey,
	common,
	divider: alpha(grey[500], 0.2),
	action,
};

// ----------------------------------------------------------------------

export function palette() {
	const obj = {
		...base,
		primary: base.primary,
	};
	return {
		...obj,
		mode: "light",

		text: {
			primary: base.grey[800],
			secondary: base.grey[600],
			disabled: base.grey[500],
		},
		background: {
			paper: base.common.white,
			default: base.grey[100],
		},
		action: {
			...base.action,
			active: base.grey[600],
		},
	};
}
