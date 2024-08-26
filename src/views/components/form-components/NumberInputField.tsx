/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import React, { Ref, FocusEvent, forwardRef } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Box, TextField, InputLabel, InputAdornment } from '@mui/material';

import { AddIcon, MinusIcon } from 'theme/svg';

import { floatValue } from 'helper/FormatHelper';
import { handleNumberInput } from 'helper/GlobalHelper';
import { NumberInputFieldType } from 'helper/types/FormType';

type FormValues = {
  [key: string]: unknown;
};

// type FieldType = {
//   label?: string;
//   fieldProps?: TextFieldProps;
//   onChange?: (res?: string | number) => void;
//   toFixed?: number;
//   min?: number;
//   max?: number | null;
//   inputButton?: boolean;
// };

const NumberInputField = forwardRef(
  <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & NumberInputFieldType, ref: Ref<HTMLDivElement>) => {
    const { name, control, fieldProps, label, onChange, min = 0, max = null, toFixed, inputButton = false, handleMinsPlus, onBlur } = props;
    const {
      field: { ref: fieldRef, ...field },
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: '' as PathValue<T, Path<T>>,
    });

    // console.log(max, 'max');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = (toFixed === 0 ? (e?.target?.value ? parseFloat(e?.target?.value) : '') : e?.target?.value) as number;

      // const value = inputValue <= min ? min : max && inputValue >= max ? max : inputValue;
      // console.log(value, min, 'min')
      // const value = inputValue < min ? min : max && inputValue > max ? max : inputValue;
      field.onChange(inputValue);
      onChange && onChange(inputValue);
    };

    const handleAddMinus = (type: 'add' | 'minus') => {
      const addInputValue = Number(field?.value || 0) + 1;
      const minusInputValue = Number(field?.value || 0) - 1;
      if (type === 'add') {
        if (addInputValue >= min && max && max >= addInputValue) {
          field.onChange(addInputValue);
          onChange && onChange(addInputValue);
          handleMinsPlus && handleAddMinus(type);
        } else if (!max) {
          field.onChange(addInputValue);
          onChange && onChange(addInputValue);
          handleMinsPlus && handleAddMinus(type);
        }
      } else {
        const value = minusInputValue <= min ? min : minusInputValue;
        field.onChange(value);
        onChange && onChange(value);
        handleMinsPlus && handleAddMinus(type);
      }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
      let convertedValue = floatValue(e?.target?.value || '', toFixed) as number;
      if (convertedValue) {
        if (max && convertedValue >= max) {
          convertedValue = max;
        } else if (convertedValue <= min) {
          convertedValue = min;
        }
      }

      field.onChange(convertedValue);
      onChange && onChange(convertedValue);
      onBlur && onBlur(convertedValue);
    };
    return (
      <Box width={'100%'} ref={ref}>
        {label && <InputLabel required={fieldProps?.required}>{label}</InputLabel>}
        <TextField
          size={'small'}
          inputProps={{ inputMode: 'numeric' }}
          onInput={handleNumberInput}
          variant="outlined"
          fullWidth
          helperText={error?.message}
          error={!!error?.message}
          // value={parseFloat(field.value as string)}
          {...field}
          inputRef={fieldRef}
          {...fieldProps}
          required={false}
          InputProps={{
            startAdornment: inputButton && (
              <InputAdornment
                position="start"
                onClick={() => {
                  handleAddMinus('add');
                }}
              >
                <AddIcon sx={{ width: '13px', cursor: 'pointer' }} />
              </InputAdornment>
            ),
            endAdornment: inputButton && (
              <InputAdornment
                position="end"
                onClick={() => {
                  handleAddMinus('minus');
                }}
              >
                <MinusIcon sx={{ width: '13px', cursor: 'pointer' }} />
              </InputAdornment>
            ),
            ...fieldProps?.InputProps,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Box>
    );
  }
);
NumberInputField.displayName = 'NumberInputField';
export default NumberInputField as <T extends FormValues>(
  props: UseControllerProps<T> & { control: Control<T> } & NumberInputFieldType
) => JSX.Element;
