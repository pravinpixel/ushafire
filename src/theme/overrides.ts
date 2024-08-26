/**
 * This file is part of AutoPack.
 *
 * Its is override the component of the mui
 * It is the customized the component in the mui what we need
 *
 */
/* eslint-disable max-lines */
import { alpha } from '@mui/material/styles';
import { gridClasses } from '@mui/x-data-grid';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import {
  Theme,
  SxProps,
  Components,
  tabClasses,
  chipClasses,
  avatarClasses,
  drawerClasses,
  formLabelClasses,
  tableCellClasses,
  autocompleteClasses,
  formHelperTextClasses,
  formControlLabelClasses,
} from '@mui/material';

import { pxToRem, hexToRgba } from 'helper/GlobalHelper';

import { NAV } from 'views/layouts/utils/config-layout';

import { defaultImage } from '../helper/AssetHelper';

// ----------------------------------------------------------------------

interface ComponentsOverride extends Components<Omit<Theme, 'components'>> {
  MuiDataGrid: {
    styleOverrides?: SxProps;
  };
}

export const ConfigConst = {
  Input: 2.8125 - 16 / 16,
  TableInput: 1.7125 - 16 / 16,
};

// -----------------------------------------------------------------------

export function overrides(theme: Theme): ComponentsOverride {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          maxWidth: '100%',
          display: 'inline-block',
          verticalAlign: 'bottom',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[900] || '', 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
    MuiButton: {
      // styleOverrides: {
      //     containedInherit: {
      //         color: theme.palette.common.white,
      //         backgroundColor: theme.palette.grey[800],
      //         '&:hover': {
      //             color: theme.palette.common.white,
      //             backgroundColor: theme.palette.grey[800],
      //         },
      //     },
      // },
      defaultProps: {
        variant: 'contained',
      },
      variants: [
        {
          props: { variant: 'export' },
          style: {
            color: theme.palette.common.black,
            backgroundColor: theme.palette.common.white,
            border: `2px solid ${theme.palette.customColor.ligthGreyOne}`,
            '&:hover': {
              border: `2px solid ${theme.palette.customColor.ligthGreyOne}`,
              backgroundColor: theme.palette.customColor.ligthGreyOne,
            },
          },
        },
      ],
    },
    MuiCard: {
      defaultProps: {},
      variants: [
        // Product Card in search
        {
          props: { variant: 'productCard' },
          style: {
            boxShadow: 'none',
            borderRadius: Number(theme.shape.borderRadius) * 1,
            border: `1px solid ${hexToRgba(theme.palette.primary.lighter ?? '', 0.3)}`,
            width: pxToRem(260),
            height: pxToRem(332),
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
          },
        },
        {
          props: { variant: 'productCard', color: 'grey' },
          style: {
            border: `1px solid ${hexToRgba(theme.palette.customColor.darkGreyOne ?? '', 0.3)}`,
          },
        },
        // Deal card in deals list
        {
          props: { variant: 'dealCard' },
          style: {
            borderRadius: Number(theme.shape.borderRadius) * 1,
            // height: '7.3125rem',
            // backgroundColor: theme.palette.customColor.lightBlue,
            minHeight: '6.40375rem',
            width: '16.25rem',
            pl: 4,
            py: 2,
          },
        },
        {
          props: { variant: 'dealCard', color: 'lightBlue' },
          style: {
            backgroundColor: hexToRgba(theme.palette.customColor.lightBlue, 0.3),
            // opacity: '30%',
          },
        },
        {
          props: { variant: 'dealCard', color: 'primary' },
          style: {
            backgroundColor: hexToRgba(theme.palette.primary.main, 0.3),
            // opacity: '30%',
          },
        },
        {
          props: { variant: 'dealCard', color: 'darkGreyOne' },
          style: {
            backgroundColor: hexToRgba(theme.palette.customColor.darkGreyOne, 0.2),
            // opacity: '20%',
          },
        },
        {
          props: { variant: 'dealCard', color: 'darkRed' },
          style: {
            backgroundColor: hexToRgba(theme.palette.customColor.darkRed, 0.3),
            // opacity: '30%',
          },
        },
        {
          props: { variant: 'dealCard', color: 'darkPink' },
          style: {
            backgroundColor: hexToRgba(theme.palette.customColor.darkPink, 0.3),
            // opacity: '30%',
          },
        },
        {
          props: { variant: 'dealCard', color: 'secondary' },
          style: {
            backgroundColor: hexToRgba(theme.palette.secondary.main, 0.3),
            // opacity: '30%',
          },
        },
        {
          props: { variant: 'dealCard', color: 'success' },
          style: {
            backgroundColor: hexToRgba(theme.palette.success.main, 0.3),
            // opacity: '30%',
          },
        },
        {
          props: { variant: 'dealCard', color: 'warning' },
          style: {
            backgroundColor: hexToRgba(theme.palette.warning.main, 0.3),
            // opacity: '30%',
          },
        },
      ],
      styleOverrides: {
        root: {
          boxShadow: theme.customShadows.card,
          borderRadius: Number(theme.shape.borderRadius) * 2,
          position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h4' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: theme.palette.common.white,
          [`& .${outlinedInputClasses.inputSizeSmall}`]: {
            minHeight: `${ConfigConst.Input}rem`,
          },
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            border: `1px solid ${theme.palette.customColor.ligthGreyOne}`,
            borderRadius: '0.5rem',
          },
          [`& .${outlinedInputClasses.inputAdornedStart}`]: {
            margin: '0rem 0.45rem',
          },
          // [`& .${outlinedInputClasses.input}`]: {
          //   background: theme.palette.common.white,
          // },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: theme.palette.customColor.darkGreyOne,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          [`& .${gridClasses.columnHeaders}`]: {
            color: theme.palette.grey[600],
            // paddingInline: '10px',
          },
          [`& .${gridClasses.cell}`]: {
            borderBottom: 'none',
            fontWeight: 400,
          },
          [`& .${gridClasses.main}`]: {
            padding: '0.5rem 0rem',
            background: theme.palette.common.white,
            borderRadius: '0.75rem',
            boxShadow: theme.customShadows.table,
          },
          [`& .${gridClasses.virtualScroller}`]: {
            // overflow: 'hidden',
            // width: 'calc(100% + 3rem)',
          },
          [`& .${gridClasses.overlayWrapper}`]: {
            // overflowX: 'hidden',
          },
          [`& .${gridClasses.footerContainer}`]: {
            borderTop: 'none',
          },
          [`& .${gridClasses.row}:nth-child(odd)`]: {
            backgroundColor: theme.palette.grey[200],
          },
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
            outline: 'none',
          },
          [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
            outline: 'none',
          },
          [`& .${gridClasses.row}`]: {
            // marginInline: '10px',
          },
          [`& .${gridClasses.row}:hover`]: {
            backgroundColor: theme.palette.grey[100],
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          minHeight: `${ConfigConst.Input}rem`,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[800],
          fontWeight: 600,
          marginBottom: theme.spacing(0.75),
          [`& .${formLabelClasses.asterisk}`]: {
            color: theme.palette.error.main,
          },
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
        },
      },
    },
    MuiChip: {
      defaultProps: {
        variant: 'filled',
        size: 'medium',
        sx: {
          // borderRadius: theme.shape.borderRadius / 8,
          fontWeight: theme.typography.fontWeightBold,
          [`&.${chipClasses.sizeSmall}`]: {
            minHeight: '1.75rem',
            minWidth: '3.75rem',
            borderRadius: theme.shape.borderRadius / 8,
          },
          [`&.${chipClasses.sizeMedium}`]: {
            minHeight: '2.0625rem',
            minWidth: '6.875rem',
            borderRadius: theme.shape.borderRadius / 12,
          },
          [`&.${chipClasses.colorSuccess}`]: {
            color: theme.palette.success.main,
            backgroundColor: theme.palette.success.light,
          },
          [`&.${chipClasses.colorError}`]: {
            color: theme.palette.error.main,
            backgroundColor: theme.palette.error.light,
          },
          [`&.${chipClasses.colorWarning}`]: {
            color: theme.palette.warning.main,
            backgroundColor: theme.palette.warning.lighter,
          },
          [`&.${chipClasses.colorPrimary}`]: {
            color: theme.palette.primary.main,
            backgroundColor: hexToRgba(theme.palette.primary.lighter ?? '', 0.25),
          },
        },
      },
      // variants: [
      //   {
      //     props: { variant: 'form' },
      //     style: {
      //       backgroundColor: theme.palette.common.white,
      //       boxShadow: theme.shadows[11],
      //       padding: '3rem 2rem 2.5rem 2rem',
      //       height: 'calc(100vh - 220px)',
      //       overflowY: 'auto',
      //     },
      //   },
      // ],
    },
    MuiPaper: {
      defaultProps: {
        elevation: 5,
      },
      variants: [
        {
          props: { variant: 'form' },
          style: {
            backgroundColor: theme.palette.common.white,
            boxShadow: theme.shadows[11],
            // padding: '3rem 2rem 2.5rem 2rem',
            // height: 'calc(100vh - 220px)',
            overflow: 'hidden',
          },
        },
      ],
    },
    MuiDrawer: {
      variants: [
        {
          props: { variant: 'temporary', id: 'form-drawer' },
          style: {
            width: '100%',
            flexShrink: 0,
            position: 'relative',
            [`& .${drawerClasses.paper}`]: {
              backgroundColor: theme.palette.common.white,
              boxShadow: theme.shadows[11],
              overflow: 'hidden',
              boxSizing: 'border-box',
              height: `calc(85vh - ${pxToRem(NAV.MB + 2)})`,
              mx: NAV.PX,
              mb: NAV.MB,
            },
          },
        },
      ],
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[800],
        },
        arrow: {
          color: theme.palette.grey[800],
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    },
    MuiAutocomplete: {
      //   defaultProps: {
      //     renderOption: (props, option) => {
      //     console.log()
      //       const label = (option as OptionsType)?.label ?? (option as unknown as string);
      //       return <MenuItem {...props}>{label}</MenuItem>;
      //     },
      //   },
      styleOverrides: {
        root: {
          [`& .${autocompleteClasses.tagSizeSmall}`]: {
            minHeight: `${ConfigConst.Input}rem`,
          },
          [`& .${autocompleteClasses.hasPopupIcon}`]: {
            background: theme.palette.common.white,
          },
          [`& .${outlinedInputClasses.root}`]: {
            background: theme.palette.common.white,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          [`& .${avatarClasses.square}, & .${avatarClasses.fallback}`]: {
            background: `url(${defaultImage}) center no-repeat`,
            backgroundSize: '100% 100%',
            width: '100%',
            height: '100%',
            path: {
              display: 'none',
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[500],
          fontWeight: theme.typography.fontWeightBold,
          fontSize: theme.typography.subtitle1.fontSize,
          [`&.${tabClasses.selected}`]: {
            color: theme.palette.common.black,
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          [`& .${outlinedInputClasses.inputSizeSmall}`]: {
            minHeight: `${ConfigConst.TableInput}rem`,
          },
          marginBottom: '20px',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          [`& .${tableCellClasses.root}`]: {
            backgroundColor: theme.palette.common.white,
            borderBottom: `1px solid ${theme.palette.customColor.ligthGreyOne}`,
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          [`& .${tableCellClasses.root}`]: {
            paddingInline: '4px',
            paddingBlock: '8px',
            // backgroundColor: theme.palette.common.white,
            borderBottom: `none`,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
          '&:last-child td, &:last-child th': {
            border: 0,
          },
          [`& .${formHelperTextClasses.root}`]: {
            whiteSpace: 'noWrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },
      },
    },
  };
}
