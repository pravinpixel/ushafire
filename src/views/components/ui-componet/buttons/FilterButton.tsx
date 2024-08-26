import * as React from 'react';

import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { Box, alpha, Checkbox, Typography, FormControlLabel } from '@mui/material';

import { StyledAutocompleteOptions } from 'theme/styled-compounet';

import { OptionsType } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';

import FilterCount from '../filters/FilterCount';

type FilterButtonType = {
  label: string;
  menus?: OptionsType[];
  name: string;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  defaultValue: OptionsType;
  multiple?: boolean;
};
type StateProps = {
  anchorEl: null | HTMLElement;
  model: boolean;
};

type MenuChildrenType = {
  paramName?: string[];
  label?: string;
  value?: string;
  defaultValue?: OptionsType | null;
  handleSingleSelect: (value: string) => void;
  width?: number;
};

const MenuChildren = ({ value, label, handleSingleSelect, paramName, width, defaultValue }: MenuChildrenType) => {
  const ref = React.useRef<HTMLButtonElement | null>(null);
  const checkCondition = paramName?.includes(value as string)  || defaultValue?.value === value
  return (
    <StyledAutocompleteOptions
      sx={{
        width: width,
        marginLeft: 0,
        paddingLeft: '10px !important ',
      }}
      onClick={(e) => {
        e.preventDefault();
        handleSingleSelect(value as string);
      }}
    >
      <FormControlLabel
        label={
          <label
            style={{
              fontSize: '0.8rem',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleSingleSelect(value as string);
            }}
          >
            {label}
          </label>
        }
        ref={ref}
        id={value}
        control={<Checkbox id={value} key={String(paramName)} size="small" checked={checkCondition} />}
      />
    </StyledAutocompleteOptions>
  );
};

export default function FilterButton({ label = 'Dashboard', menus, setParams, params, name, defaultValue, multiple }: FilterButtonType) {
  const [anchorEl, setAnchorEl] = React.useState<StateProps>({ anchorEl: null, model: false });
  const ref = React.useRef<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl({ anchorEl: event.currentTarget, model: true });
  };
  const handleClose = () => {
    setAnchorEl({
      anchorEl: null,
      model: false,
    });
  };
  // const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     event.target.checked
  //         ? setParams((state) => {
  //               return {
  //                   ...state,
  //                   [name]: menus?.map((menu) => menu.value),
  //               };
  //           })
  //         : setParams((state) => {
  //               return {
  //                   ...state,
  //                   [name]: [],
  //               };
  //           });
  // };
  const handleSingleSelect = (value: string | number) => {
    const preArray = (params?.[name] as string[]) || [];
    if (multiple) {
      !preArray?.includes(value as string)
        ? setParams((state) => {
            const array: string[] = (state[name] as string[]) || [];
            array?.push((value as string) || '');
            return {
              ...state,
              [name]: [...new Set(array)],
            };
          })
        : setParams((state) => {
            const array: string[] = (state[name] as string[]) || [];
            return {
              ...state,
              [name]: array?.filter((fil) => fil !== value),
            };
          });
    } else {
      setParams((state) => {
        return {
          ...state,
          [name]: [value],
        };
      });
    }
  };
  const value = defaultValue?.value ? [defaultValue?.value] : [];
  const preArray = params?.[name] ? (params?.[name] as string[]) : [];
  const array = [...new Set([...preArray, ...value])];
  const length = array?.length || 0;
  const lengthCondition = length > 0;
  return (
    <Box
      sx={{
        '& .MuiButtonBase-root': {
          justifyContent: 'space-between',
        },
      }}
    >
      <Button
        id="basic-button"
        ref={ref}
        variant="export"
        aria-controls={anchorEl.model ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl.model ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          width: '100%',
          ...(lengthCondition && {
            background: ({ palette }) => alpha(palette.primary.main, 0.2),
            // outline: ({ palette }) => `1px solid ${alpha(palette.primary.main, 0.2)}`,
            border: ({ palette }) => `2px solid ${alpha(palette.primary.main, 0.1)}`,
          }),
          '&:hover': {
            background: ({ palette }) => (lengthCondition ? alpha(palette.primary.main, 0.2) : 'white'),
          },
        }}
        endIcon={
          <>
            <FilterCount count={length} />
            <ExpandMoreOutlined
              sx={{
                color: ({ palette }) => (lengthCondition ? 'inherit' : palette.customColor.ligthGreyOne),
              }}
            />
          </>
        }
      >
        <Typography noWrap fontSize={'0.8rem'} color={lengthCondition ? 'unset' : 'lightgray'}>
          {`Select${lengthCondition ? 'ed ' : ' '}`} {label}
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl.anchorEl}
        open={anchorEl.model}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          maxHeight: '20rem',
          width: `${(ref.current?.clientWidth || 0) + 40}px`,
          py: 0,
        }}
      >
        {menus?.map((me) => {
          const { value, label } = me;
          return (
            <MenuChildren
              label={label}
              value={value as string}
              key={value}
              handleSingleSelect={handleSingleSelect}
              paramName={array as string[]}
              width={ref?.current?.clientWidth || 0}
              defaultValue={defaultValue}
            />
          );
        })}
      </Menu>
    </Box>
  );
}
