/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */

import { Ref, forwardRef, ChangeEvent, FormEventHandler } from 'react';
import { Path, Control, PathValue, FieldError, useController, UseControllerProps } from 'react-hook-form';

import { Box, InputLabel, SelectChangeEvent } from '@mui/material';
import { MenuItem, TextField, CircularProgress } from '@mui/material';

import { StyledSelect } from 'theme/styled-compounet';

import { handleNumberInput } from 'helper/GlobalHelper';
import { InputSelectFieldType } from 'helper/types/FormType';

type FormValues = {
  [key: string]: unknown;
};
// type FieldType = {
//   label?: string;
//   position?: 'startAdornment' | 'endAdornment';
//   codeName: string;
//   loading?: boolean;
//   options?: OptionsType[] | string[];
//   fieldProps?: TextFieldProps;
//   onChange?: FormEventHandler<HTMLDivElement>;
// };
const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];
type FieldValue = {
  [key: string]: string;
};
type CustomErrorType = FieldError & {
  [key: string]: FieldError;
};
const InputSelectField = forwardRef(
  <T extends FormValues>(
    props: UseControllerProps<T> & { control: Control<T> } & {
      onChange?: FormEventHandler<HTMLDivElement>;
    } & InputSelectFieldType,
    ref: Ref<HTMLDivElement>
  ) => {
    const { name, control, fieldProps, label, onChange, codeName, position = 'startAdornment', loading = false, options = currencies } = props;

    const {
      field: { ref: fieldRef, ...field },
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: {
        [name]: '',
        [codeName]: typeof options?.[0] === 'string' ? options?.[0] : options?.[0]?.value,
      } as PathValue<T, Path<T>>,
    });
    const handleDimensionChange = (
      { target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<unknown>,
      name: string
    ) => {
      const dimensionValue = {
        ...(field.value as FieldValue),
        [name]: target.value,
      };
      field.onChange(dimensionValue);
    };
    return (
      <Box width={'100%'} ref={ref} onChange={onChange}>
        {label && <InputLabel required={fieldProps?.required}>{label}</InputLabel>}
        <TextField
          size={'small'}
          variant="outlined"
          fullWidth
          onInput={handleNumberInput}
          error={!!(error as CustomErrorType)?.[name]?.message}
          helperText={(error as CustomErrorType)?.[name]?.message}
          {...fieldProps}
          inputRef={fieldRef}
          onBlur={field.onBlur}
          value={(field.value as FieldValue)?.[name]}
          onChange={(e) => {
            handleDimensionChange(e, name);
            fieldProps?.onChange && fieldProps?.onChange(e);
          }}
          InputProps={{
            ...fieldProps?.InputProps,
            [position]: loading ? (
              <CircularProgress size={25} />
            ) : (
              <StyledSelect
                name={codeName}
                value={(field.value as FieldValue)?.[codeName]}
                onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<unknown>) => {
                  handleDimensionChange(e, codeName);
                }}
              >
                {options.map((option) => {
                  const condition = typeof option === 'string';
                  return (
                    <MenuItem key={condition ? option : option.value} value={condition ? option : option.value}>
                      {condition ? option : option?.label}
                    </MenuItem>
                  );
                })}
              </StyledSelect>
            ),
          }}
          required={false}
        />
      </Box>
    );
  }
);

InputSelectField.displayName = 'InputSelectField';

export default InputSelectField as <T extends FormValues>(
  props: UseControllerProps<T> & { control: Control<T> } & InputSelectFieldType
) => JSX.Element;
