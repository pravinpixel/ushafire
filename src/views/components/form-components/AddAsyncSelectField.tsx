/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { debounce } from 'lodash';
import React, { Ref, useRef, useState, forwardRef, useCallback } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { Stack, MenuItem, TextField, InputLabel, FormControl, Autocomplete, CircularProgress } from '@mui/material';

import { filterOptions } from 'helper/GlobalHelper';
import { AddAsyncSelectFieldType } from 'helper/types/FormType';
import { ErrorType, OptionsType } from 'helper/types/GlobalTypes';

import useMyProfieStore from 'zustand-config/MyProfileZustand';

import { useEssentialSearch, useCreateGenerateIdApi } from 'store/hooks/EssentialHooks';

import EssentailAddPopup from '../popups/EssentailAddPopup';

type FormValues = {
  [key: string]: unknown;
};

export interface EssentailAddPopupformDetailsTypes {
  url?: string;
  method?: string;
}

const AddAsyncSelectField = forwardRef(
  <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & AddAsyncSelectFieldType, ref: Ref<HTMLDivElement>) => {
    const {
      loading = false,
      name,
      control,
      fieldProps,
      options,
      label,
      textFieldProps,
      addName,
      mutateAsync,
      formDetails,
      fend_component,
      inputOptions,
      searchFilters,
      schema,
    } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState(options?.[addName] ?? []);
    const [values, setValues] = useState(inputOptions);
    const {
      field: { ref: fieldRef, ...field },
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: null as PathValue<T, Path<T>>,
    });
    const errorMessage = (error as ErrorType)?.value ? (error as ErrorType)?.value?.message : (error as ErrorType)?.message;
    const supplierCondition = name !== 'supplier';

    const permissions = useMyProfieStore((state) => {
      return supplierCondition
        ? state.user?.role_id.access_manage
            .find((access) => access.fend_component === 'master')
            ?.child?.find((access) => access?.fend_component === fend_component)?.add?.access ?? false
        : state.user?.role_id.access_manage.find((access) => access.fend_component === fend_component)?.add?.access ?? false;
    });
    const handleAddItem = ({ essential }: { essential: OptionsType }) => {
      field.onChange(essential);
      handleClose();
    };

    const { mutateAsync: essentialSearchApi, isPending } = useEssentialSearch();
    const { mutateAsync: generateCode, isPending: generateLoading } = useCreateGenerateIdApi();

    const handleClickOpen = () => {
      if (supplierCondition) {
        setOpen(true);
      } else {
        generateCode(
          {
            vision: 'Supplier',
          },
          {
            onSuccess: (res) => {
              setValues((state) => ({
                ...state,
                defaultValues: {
                  ...state.defaultValues,
                  code: res.code,
                },
              }));
              setOpen(true);
            },
          }
        );
      }

      // setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDebonceSearch = useCallback(
      debounce(
        (query?: string) =>
          essentialSearchApi(
            {
              search: query || '',
              include: [addName],
              ...searchFilters,
            },
            {
              onSuccess: (res) => {
                //Api data work as Promise so Set default value while select value is empty
                inputRef?.current?.value !== '' && inputRef?.current?.value === query && setOption(res[addName] || []);
              },
            }
          ),
        500
      ),
      [field, options]
    );
    //FIlter basend on label and fetch api while no options
    const handleFilterOptions = (filterOption: OptionsType[], inputValue: string) => {
      const displayOptions: OptionsType[] = filterOptions(filterOption, {
        inputValue,
        getOptionLabel: function (option: OptionsType | unknown) {
          return (option as OptionsType)?.label as string;
        },
      }) as unknown as OptionsType[];
      displayOptions?.length > 0
        ? setOption(displayOptions)
        : inputValue
          ? handleDebonceSearch(inputValue)
          : setOption(options?.[addName] as unknown as OptionsType[]);
    };

    return (
      <>
        <InputLabel required={textFieldProps?.required}>{label}</InputLabel>
        <Stack
          direction={'row'}
          gap={2}
          justifyContent={'space-between'}
          sx={{
            height: '2.8125rem',
          }}
        >
          <FormControl fullWidth>
            <Autocomplete
              size="small"
              options={option as OptionsType[]}
              filterOptions={filterOptions}
              loading={loading || isPending}
              onOpen={() => setOption(options?.[addName] ?? [])}
              popupIcon={<ExpandMoreOutlined />}
              loadingText="Loading..."
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...textFieldProps}
                  error={!!errorMessage}
                  helperText={errorMessage}
                  required={false}
                  inputRef={errorMessage ? fieldRef : inputRef}
                  onChange={({ target }) => handleFilterOptions(option, target.value)}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading || isPending ? <CircularProgress color="primary" size={16} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
              {...field}
              onChange={(_event, newValue: unknown) => {
                field.onChange(newValue);
                textFieldProps?.onChange && textFieldProps?.onChange(newValue as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
              }}
              renderOption={(props, option) => {
                const label = (option as OptionsType)?.label ?? (option as unknown as string);
                return <MenuItem {...props}>{label}</MenuItem>;
              }}
              ref={ref}
              {...fieldProps}
              // onInputChange={(_, value) => handleFilterOptions(option, value)}
            />
          </FormControl>
          {permissions ? (
            <LoadingButton
              loading={generateLoading}
              sx={{ width: '8rem' }}
              onClick={handleClickOpen}
              startIcon={'+'}
              color="secondary"
              variant="outlined"
            >
              Add Item
            </LoadingButton>
          ) : null}
        </Stack>
        {open && (
          <EssentailAddPopup
            name={name}
            schema={schema as never}
            addName={addName}
            label={label}
            handleClose={handleClose}
            handleAddItem={handleAddItem}
            open={open}
            options={options}
            mutateAsync={mutateAsync}
            formDetails={formDetails}
            fend_component={fend_component}
            inputOptions={values}
            loading={loading}
          />
        )}
      </>
    );
  }
);
AddAsyncSelectField.displayName = 'AddAsyncSelectField';

export default AddAsyncSelectField as <T extends FormValues>(
  props: UseControllerProps<T> & { control: Control<T> } & AddAsyncSelectFieldType
) => JSX.Element;
