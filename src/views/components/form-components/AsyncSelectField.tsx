/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import _ from 'lodash';
import { debounce } from 'lodash';
import React, { Ref, useRef, useState, forwardRef, useCallback } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { ExpandMoreOutlined } from '@mui/icons-material';
import { Box, Checkbox, MenuItem, TextField, InputLabel, Autocomplete, CircularProgress } from '@mui/material';

import { StyledAutocompleteOptions } from 'theme/styled-compounet';

import { AsyncSelectFieldType } from 'helper/types/FormType';
import { ErrorType, OptionsType } from 'helper/types/GlobalTypes';

import { useEssentialSearch } from 'store/hooks/EssentialHooks';

type FormValues = {
  [key: string]: unknown;
};

const icon = <div className="uncheck-symbol"> </div>;
const checkedIcon = <div className="check-symbol">✔</div>;

const AsyncSelectField = forwardRef(
  <T extends FormValues>(
    props: UseControllerProps<T> & {
      control: Control<T>;
    } & AsyncSelectFieldType,
    ref: Ref<HTMLDivElement>
  ) => {
    const {
      name,
      control,
      fieldProps = {},
      options = [],
      label,
      textFieldProps,
      loading = false,
      onChange,
      readOnly = false,
      disableClearable = false,
      addName,
      searchFilters,
      disabledArray = [],
      onSearchChange,
    } = props;
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => {
    //   setOpen(true);
    // };

    // const handleClose = () => {
    //   setOpen(false);
    // };
    const inputRef = useRef<HTMLInputElement>(null);
    const [optionData, setOptionData] = useState<OptionsType[]>([]);
    const multiple = fieldProps?.multiple || false;

    const {
      field: { ref: fieldRef, ...field },
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: (multiple ? [] : null) as PathValue<T, Path<T>>,
    });
    const errorMessage = (error as ErrorType)?.value ? (error as ErrorType)?.value?.message : (error as ErrorType)?.message;
    const { mutateAsync: essentialSearchApi, isPending } = useEssentialSearch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const handleDebonceSearch = useCallback(
    //   debounce(
    //     (search?: string) =>
    //       essentialSearchApi(
    //         {
    //           search,
    //           include: [addName],
    //           ...searchFilters,
    //         },
    //         {
    //           onSuccess: (res) => {
    //             //Api data work as Promise so Set default value while select value is empty
    //             if (field?.value !== '') {
    //               setOptionData(res[addName]);
    //             } else {
    //               setOptionData(options as OptionsType[]);
    //             }
    //           },
    //           onError: () => {
    //             setOptionData([]);
    //           },
    //         }
    //       ),
    //     400
    //   ),
    //   [searchFilters, addName]
    // );
    // const handleFilterOptions = (inputValue: string) => {
    //   //New Filter
    //   // const displayOptions: OptionsType[] = filterOptions(optionData, {
    //   //   inputValue,
    //   //   getOptionLabel: function (option: OptionsType | unknown) {
    //   //     return (option as OptionsType)?.label as string;
    //   //   },
    //   // }) as unknown as OptionsType[];
    //   // displayOptions?.length > 0
    //   //   ? setOptionData(displayOptions)
    //   //   : inputValue
    //   //     ? handleDebonceSearch(inputValue)
    //   //     : setOptionData(options as OptionsType[]);
    //   //Old Filter
    //   if (inputValue === '') {
    //     options.length > 0 ? setOptionData(options as OptionsType[]) : handleDebonceSearch(inputValue);
    //   }
    //   if (inputValue) {
    //     const displayOptions = optionData.filter((option) =>
    //       (option as { label: string }).label.toLowerCase().trim().includes(inputValue.toLowerCase().trim())
    //     );
    //     displayOptions?.length > 0
    //       ? setOptionData(displayOptions)
    //       : inputValue
    //         ? handleDebonceSearch(inputValue)
    //         : setOptionData(options as OptionsType[]);
    //   }
    // };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDebouncedSearch = useCallback(
      debounce((search?: string) => {
        essentialSearchApi(
          {
            search,
            include: [addName],
            ...searchFilters,
          },
          {
            onSuccess: (res) => {
              inputRef?.current?.value !== '' && inputRef?.current?.value === search && setOptionData(res[addName] || []);
            },
            onError: () => {
              setOptionData([]);
            },
          }
        );
      }, 400),
      [essentialSearchApi, addName, searchFilters]
    );

    const handleFilterOptions = (inputValue: string) => {
      if (inputValue === '') {
        setOptionData(options);
      } else {
        const displayOptions = options.filter((option) => (option as { label: string }).label.toLowerCase().includes(inputValue.toLowerCase()));
        if (displayOptions.length > 0) {
          setOptionData(displayOptions);
        } else {
          handleDebouncedSearch(inputValue);
        }
      }
      onSearchChange && onSearchChange(inputValue);
    };

    return (
      <Box width={'100%'} ref={ref}>
        {label && typeof label === 'string' ? <InputLabel required={textFieldProps?.required}>{label}</InputLabel> : label}
        <Autocomplete
          size="small"
          options={optionData?.map((option) => ({
            ...option,
            disabled: disabledArray?.length >= 1 && disabledArray.includes(option.value as string),
          }))
          // .sort((a) => (a?.disabled ? 1 : -1))
          }
          popupIcon={<ExpandMoreOutlined />}
          loading={loading || isPending}
          disableClearable={disableClearable}
          getOptionDisabled={(option) => {
            const condition: boolean = (option as OptionsType)?.disabled || false;
            return condition;
          }}
          readOnly={readOnly}
          filterOptions={(x) => x}
          onOpen={() => setOptionData(options as unknown as OptionsType[])}
          // open={open}
          // onFocus={handleOpen}
          // onClose={handleClose}

          renderInput={(params) => (
            <TextField
              {...params}
              error={!!errorMessage}
              helperText={errorMessage}
              {...textFieldProps}
              inputRef={errorMessage ? fieldRef : inputRef}
              onChange={({ target }) => handleFilterOptions(target.value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading || isPending ? <CircularProgress color="primary" size={16} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
                ...textFieldProps?.InputProps,
              }}
              required={false}
            />
          )}
          {...field}
          onChange={(_event, newValue: unknown | OptionsType) => {
            if (!multiple) {
              field.onChange(newValue);
              onChange && onChange(newValue as OptionsType);
            } else if ((newValue as OptionsType[])?.length === 0) {
              field.onChange([]);
              onChange && onChange([] as OptionsType);
            }
          }}
          renderTags={(value) => <div style={{ fontSize: '0.8rem' }}> {`${value.length} Option${value.length > 1 ? 's' : ''} selected`}</div>}
          // onBlur={handleClose}
          renderOption={(props, renderOption, { selected }) => {
            const label = (renderOption as OptionsType)?.label || (renderOption as string);
            const value = (renderOption as OptionsType)?.value || (renderOption as string);

            const preValues = _.isArray(field?.value) ? (field?.value as OptionsType[])?.map(({ value }) => value) : [];
            const checked = selected || preValues?.includes(value);
            const Component = multiple ? StyledAutocompleteOptions : MenuItem;
            return (
              <Component
                {...props}
                onClick={(e) => {
                  if (multiple) {
                    e.stopPropagation();
                    e.preventDefault();
                    let array: OptionsType[] = field?.value as OptionsType[];
                    if (preValues?.includes(value)) {
                      array = array.filter((a) => a?.value !== value);
                    } else {
                      array.push(renderOption as unknown as OptionsType);
                    }
                    field.onChange(array);
                    onChange && onChange(array as OptionsType);
                  } else {
                    props?.onClick && props?.onClick(e);
                  }
                }}
              >
                {multiple && <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={checked} size="small" />}
                {label}
              </Component>
            );
          }}
          {...fieldProps}
        />
      </Box>
    );
  }
);

AsyncSelectField.displayName = 'AsyncSelectField';

export default AsyncSelectField as <T extends FormValues>(
  props: UseControllerProps<T> & {
    control: Control<T>;
  } & AsyncSelectFieldType
) => JSX.Element;
