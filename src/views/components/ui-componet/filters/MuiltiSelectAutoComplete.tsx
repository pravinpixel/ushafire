import { useState } from 'react';

import { ExpandMoreOutlined } from '@mui/icons-material';
import { Checkbox, MenuItem, TextField, Autocomplete, ClickAwayListener, autocompleteClasses } from '@mui/material';

import { ConfigConst } from 'theme/overrides';
import { StyledAutocompleteOptions } from 'theme/styled-compounet';

import { OptionsType } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';

type MuiltiSelectAutoCompleteType = {
  options: (OptionsType | string)[];
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  label: string;
  name: string;
  multiple?: boolean;
  defaultValue?: OptionsType | null;
};

const icon = <div className="uncheck-symbol"> </div>;
const checkedIcon = <div className="check-symbol">✔</div>;
export default function MuiltiSelectAutoComplete({
  options,
  label = 'Options',
  name,
  params,
  setParams,
  multiple = true,
  defaultValue,
  // defaultValue,
}: MuiltiSelectAutoCompleteType) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleFilter = (value: (OptionsType | string)[]) => {
    setParams((state) => ({
      ...state,
      page: 0,
      [name]: value,
    }));
  };

  const handleChange = (value?: (OptionsType | string)[]) => {
    if (!value || value?.length === 0) {
      handleFilter([]);
      setOpen(false);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      {multiple ? (
        <Autocomplete
          options={options}
          multiple={multiple}
          open={open}
          onFocus={handleOpen}
          onOpen={handleOpen}
          onClose={handleClose}
          onBlur={handleClose}
          renderTags={(value) => <div style={{ fontSize: '0.8rem' }}> {`${value.length} Option${value.length > 1 ? 's' : ''} selected`}</div>}
          sx={{
            // width: 500,
            [`& .${autocompleteClasses.tagSizeSmall}`]: {
              minHeight: `${ConfigConst.Input}rem`,
            },
          }}
          onChange={(_e, value) => handleChange(value as (OptionsType | string)[])}
          renderOption={(props, renderOption, { selected }) => {
            const label = (renderOption as OptionsType)?.label ?? (renderOption as unknown as string);
            const value = (renderOption as OptionsType)?.value ?? (renderOption as unknown as string);
            return (
              <StyledAutocompleteOptions
                {...props}
                onClick={(e) => {
                  props?.onClick && props?.onClick(e);
                  handleOpen();
                  e.stopPropagation();
                  let optionFilter: string[] = (params?.[name] as string[]) || [];
                  !selected ? optionFilter.push(value as string) : (optionFilter = optionFilter.filter((option) => option !== value));

                  handleFilter([...new Set(optionFilter)]);
                }}
              >
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} size="small" />
                {label}
              </StyledAutocompleteOptions>
            );
          }}
          popupIcon={<ExpandMoreOutlined />}
          renderInput={(renderInput) => (
            <TextField
              placeholder={`${label}`}
              {...renderInput}
              fullWidth
              size="small"
              InputProps={{
                ...renderInput.InputProps,
                style: { fontSize: '0.8rem' },
              }}
            />
          )}
        ></Autocomplete>
      ) : (
        <Autocomplete
          options={options}
          multiple={multiple}
          // open={open}
          onFocus={handleOpen}
          // onOpen={handleOpen}
          // onClose={handleClose}
          // onBlur={handleClose}
          // renderTags={(value) => <div style={{ fontSize: '0.8rem' }}> {`${value.length} Option selected`}</div>}
          sx={{
            // width: 500,
            [`& .${autocompleteClasses.tagSizeSmall}`]: {
              minHeight: `${ConfigConst.Input}rem`,
            },
          }}
          clearIcon={false}
          onChange={(_e, value) => handleChange(value as unknown as (OptionsType | string)[])}
          renderOption={(props, renderOption) => {
            const label = (renderOption as OptionsType)?.label ?? (renderOption as unknown as string);
            const value = (renderOption as OptionsType)?.value ?? (renderOption as unknown as string);
            return (
              <MenuItem
                {...props}
                onClick={(e) => {
                  props?.onClick && props?.onClick(e);
                  handleOpen();
                  e.stopPropagation();
                  const optionFilter: string[] = [value as string];

                  handleFilter(optionFilter);
                }}
              >
                {/* <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected || defaultFilters?.[name]?.value === value || (params?.[name] as string[])?.includes(value as string)}
                  size="small"
                /> */}
                {label}
              </MenuItem>
            );
          }}
          defaultValue={defaultValue || null}
          key={`${defaultValue}`}
          popupIcon={<ExpandMoreOutlined />}
          renderInput={(renderInput) => (
            <TextField
              placeholder={`${label}`}
              {...renderInput}
              fullWidth
              size="small"
              InputProps={{
                ...renderInput.InputProps,
                style: { fontSize: '0.8rem' },
              }}
            />
          )}
        />
      )}
    </ClickAwayListener>
  );
}
