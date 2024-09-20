import {
	ButtonProps,
	Components,
	formControlLabelClasses,
	formHelperTextClasses,
	formLabelClasses,
	SxProps,
	Theme
} from "@mui/material";


// ----------------------------------------------------------------------

export const ConfigConst = {
	Input: 2.8125 - 16 / 16,
	TableInput: 1.7125 - 16 / 16,
};

// -----------------------------------------------------------------------

interface ComponentsOverride extends Components<Omit<Theme, "components">> {
	MuiLoadingButton: {
		defaultProps: Partial<ButtonProps>;
		styleOverrides?: SxProps;
	};
}

/**
 * This file is part of AutoPack.
 *
 * Its is override the component of the mui
 * It is the customized the component in the mui what we need
 *
 */
export function overrides(theme: Theme): ComponentsOverride {

	return {
		MuiCssBaseline: {
			styleOverrides: {
				"*": {
					boxSizing: "border-box",
					textTransform: "unset !important",

				},
				html: {
					margin: 0,
					padding: 0,
					WebkitOverflowScrolling: "touch",
				},
				body: {
					margin: 0,
					padding: 0,
				},
				":focus-visible" : {
					outline : "none !important"
				},

				// input: {
				//   '&[type=number]': {
				//     MozAppearance: 'textfield',
				//     '&::-webkit-outer-spin-button': {
				//       margin: 0,
				//       WebkitAppearance: 'none',
				//     },
				//     '&::-webkit-inner-spin-button': {
				//       margin: 0,
				//       WebkitAppearance: 'none',
				//     },
				//   },
				// },
				img: {
					maxWidth: "100%",
					display: "inline-block",
					verticalAlign: "bottom",
				},
			},
		},

		MuiButton: {
			defaultProps: {
				variant: "contained",
			},
			styleOverrides: {
				root: {
					fontSize: theme.typography.fontSizeList.f14,
					fontWeight: theme.typography.fontWeightBold,
					padding: "0.8rem 3.05rem",
				},
			},
			variants: [
				{
					props: {
						variant: "white",
					},
					style: {
						color: theme.palette.primary.main,
						backgroundColor: theme.palette.common.white,

						"&:hover": {
							backgroundColor: theme.palette.common.white,
							color: theme.palette.primary.main,
						},
					},
				},
			],
		},
		MuiLoadingButton: {
			defaultProps: {
				variant: "contained",
			},
		},

		MuiGrid: {
			defaultProps: {
				xs: 12,
			},
		},

		MuiIconButton: {
			styleOverrides: {
				root: {
					background: theme.palette.primary.main,
					color: theme.palette.common.white,
					":hover": {
						background: theme.palette.primary.main,
					},
				},
			},
		},


		MuiChip: {
			styleOverrides: {
				root: {
					fontSize : "12px",
					height: "24px",
					fontWeight : "400",
					minWidth : "114px",
					padding:"4px 11px 4px 11px"
				},
			},
		},

		MuiPaper: {
			styleOverrides: {
				root: {
					padding: "15px 16px 15px 16px",
					[theme.breakpoints.down("sm")]: {
						padding: "13px 13px",
					},
				},
			},
			variants: [
				{
					props: {
						variant: "task",
					},
					style: {
						background: theme?.palette?.primary?.light || "red",
						borderRadius: "8px",
					},
				},
				{
					props: {
						variant: "outlined",
					},
					style: {
						height: "100%",
						background: theme.palette.primary.main,
						color: theme.palette.primary.contrastText,
					},
				},
			],
		},

		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontSize: theme.typography.fontSizeList.f18,
					fontWeight: 400,
					[`& .${formLabelClasses.asterisk}`]: {
						color: theme.palette.error.main,
					},
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					color: "rgba(5, 5, 5)",
					top: "calc(50% - .0em)",
					fontWeight: "400",
				},
			},
		},
		MuiFormControlLabel: {
			styleOverrides: {
				root: {
					[`& .${formControlLabelClasses.label}`]: {
						fontWeight: 600,
					},
					[`& .${formLabelClasses.asterisk}`]: {
						color: theme.palette.error.main,
					},
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					[`&.${formHelperTextClasses.root}`]: {
						color: theme.palette.error.main,
					},
					marginLeft: "0px",
				},
			},
		},
		MuiStack: {
			styleOverrides: {
				root: {
					padding: "0px !important",
					width: "100%",
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: theme.palette.info.main,
					width: "270px",
					marginTop: "10px",
				},
			},
		},
		MuiCircularProgress: {
			styleOverrides: {
				root: {
					color: theme.palette.info.contrastText,
					strokeLinecap: "round",
				},
			},
		},

		MuiCheckbox: {
			styleOverrides: {
				root: {
					padding: "0px",
					paddingBottom: "7px",
				},
			},
		},
		// MuiDrawer:{
		// 	styleOverrides: {
		// 		root: {
		// 			borderRadius:'30px'
		// 		},
		// 	},
		// },

		// MuiInputLabel-root

		// MuiCard: {
		//   defaultProps: {},
		//   variants: [
		//     // Product Card in search
		//     {
		//       props: { variant: 'productCard' },
		//       style: {
		//         boxShadow: 'none',
		//         borderRadius: Number(theme.shape.borderRadius) * 1,
		//         border: `1px solid ${hexToRgba(theme.palette.primary.lighter ?? '', 0.3)}`,
		//         width: pxToRem(260),
		//         height: pxToRem(332),
		//         display: 'flex',
		//         flexDirection: 'column',
		//         cursor: 'pointer',
		//       },
		//     },
		//     {
		//       props: { variant: 'productCard', color: 'grey' },
		//       style: {
		//         border: `1px solid ${hexToRgba(theme.palette.customColor.darkGreyOne ?? '', 0.3)}`,
		//       },
		//     },
		//     // Deal card in deals list
		//     {
		//       props: { variant: 'dealCard' },
		//       style: {
		//         color: theme.palette.customColor.lightPink,
		//         borderRadius: Number(theme.shape.borderRadius) * 1,
		//         // backgroundColor: theme.palette.customColor.lightBlue,
		//         minHeight: '7.40375rem',
		//         width: '16.25rem',
		//         pl: 4,
		//         py: 2,
		//       },
		//     },
		//     {
		//       props: { variant: 'dealCard', color: 'lightBlue' },
		//       style: {
		//         backgroundColor: theme.palette.customColor.lightBlue,
		//         opacity: '30%',
		//       },
		//     },
		//     {
		//       props: { variant: 'dealCard', color: 'primary' },
		//       style: {
		//         backgroundColor: theme.palette.primary.main,
		//         opacity: '30%',
		//       },
		//     },
		//     {
		//       props: { variant: 'dealCard', color: 'darkGreyOne' },
		//       style: {
		//         backgroundColor: theme.palette.customColor.darkGreyOne,
		//         opacity: '20%',
		//       },
		//     },
		//     {
		//       props: { variant: 'dealCard', color: 'darkRed' },
		//       style: {
		//         backgroundColor: theme.palette.customColor.darkRed,
		//         opacity: '30%',
		//       },
		//     },
		//   ],
		//   styleOverrides: {
		//     root: {
		//       boxShadow: theme.customShadows.card,
		//       borderRadius: Number(theme.shape.borderRadius) * 2,
		//       position: 'relative',
		//       zIndex: 0, // Fix Safari overflow: hidden with border radius
		//     },
		//   },
		// },
		// MuiCardHeader: {
		//   defaultProps: {
		//     titleTypographyProps: { variant: 'h4' },
		//     subheaderTypographyProps: { variant: 'body2' },
		//   },
		//   styleOverrides: {
		//     root: {
		//       padding: theme.spacing(3, 3, 0),
		//     },
		//   },
		// },
		// MuiOutlinedInput: {
		//   styleOverrides: {
		//     root: {
		//       background: theme.palette.common.white,
		//       [`& .${outlinedInputClasses.inputSizeSmall}`]: {
		//         minHeight: `${ConfigConst.Input}rem`,
		//       },
		//       [`& .${outlinedInputClasses.notchedOutline}`]: {
		//         border: `1px solid ${theme.palette.customColor.ligthGreyOne}`,
		//         borderRadius: '0.5rem',
		//       },
		//       [`& .${outlinedInputClasses.inputAdornedStart}`]: {
		//         margin: '0rem 0.45rem',
		//       },
		//       // [`& .${outlinedInputClasses.input}`]: {
		//       //   background: theme.palette.common.white,
		//       // },
		//     },
		//   },
		// },
		MuiTabs: {
			styleOverrides: {
				root: {
					marginTop: "0px !important",
					fontSize : "16px",
					color : "rgba(0, 0, 0, 1) !important",
					button: {
						fontWeight:500,
						maxHeight: '54px',
						fontSize : "16px",
						width: '180px',
						// color: "#FFFFFF",
					},
					"& .Mui-selected": {
						backgroundColor: "#88344C",
						whiteSpace: "nowrap",
						color: "#FFFFFF !important",
						fontWeight: 700,
						borderRadius: "8px 8px 0px 0px",
					},
				},
			},
		},

		MuiTypography: {
			defaultProps: {
				variant: "f16",
			},
			styleOverrides: {
				root: {
					overflow: "hidden",
					textOverflow: "ellipsis",
					color: theme.palette.primary.contrastText,
				},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					fontWeight: theme.typography.fontWeightBold,
					color: theme.palette.common.black,
					variants: "f16",
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					border: `1px solid ${theme.palette.primary.main}`,
					fontSize:'1rem',
					fontWeight:'400',
					"& fieldset": {
						border: "none",
					},
					minHeight:'45px'
				},
			},
		},
		// MuiAvatar: {
		// 	styleOverrides: {
		// 		root: {
		// 			[`& .${avatarClasses.circular}, & .${avatarClasses.fallback}`]: {
		// 				// background: `url(${defaultImage}) center no-repeat`,
		// 				backgroundSize: "100% 100%",
		// 				width: "100%",
		// 				height: "100%",
		// 				path: {
		// 					display: "none",
		// 				},
		// 			},
		// 		},
		// 	},
		// },
	};
}
