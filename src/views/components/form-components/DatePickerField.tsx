/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { forwardRef } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Box, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { checkDate } from 'helper/GlobalHelper';
import { DatePickerFieldType } from 'helper/types/FormType';

type FormValues = {
  [key: string]: unknown;
};

const DatePickerField = <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & DatePickerFieldType) => {
  const { name, control, fieldProps, label, pickerProps } = props;
  const {
    field: { ref: fieldRef, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '' as PathValue<T, Path<T>>,
  });
  return (
    <Box width={'100%'}>
      {label && <InputLabel required={fieldProps?.required}>{label}</InputLabel>}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={['DatePicker']}
          sx={{
            paddingTop: '0px',
          }}
        >
          <DatePicker
            label=""
            {...field}
            value={checkDate(field.value as string)}
            slotProps={{
              field: { clearable: true, onClear: () => field.onChange(null) },
              textField: {
                helperText: error?.message,
                error: !!error?.message,
                placeholder: 'Select Date',
                fullWidth: true,
                size: 'small',
                ...fieldProps,
                required: false,
                inputRef: fieldRef,
              },
            }}
            {...pickerProps}
          />
        </DemoContainer>
      </LocalizationProvider>
      {/* <TextField size={'small'} variant="outlined" fullWidth error={!!error?.message} helperText={error?.message} {...field} {...fieldProps} /> */}
    </Box>
  );
};

export default forwardRef(DatePickerField) as <T extends FormValues>(
  props: UseControllerProps<T> & { control: Control<T> } & DatePickerFieldType
) => JSX.Element;
