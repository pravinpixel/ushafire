import { Ref, forwardRef } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Box, TextField, InputLabel } from '@mui/material';

import { InputFieldType } from 'helper/types/FormType';

type FormValues = {
  [key: string]: unknown;
};

/**
 * This file is part of AutoPack.
 *
 * Its is form Text Field
 *
 */
const InputField = forwardRef(
  <T extends FormValues>(
    { name, control, fieldProps, label, onChange }: UseControllerProps<T> & { control: Control<T> } & InputFieldType,
    ref: Ref<HTMLDivElement>
  ) => {
    const {
      field: { ref: fieldRef, ...field },
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: '' as PathValue<T, Path<T>>,
    });
    return (
      <Box width={'100%'} ref={ref} onChange={onChange}>
        {label && <InputLabel required={fieldProps?.required}>{label}</InputLabel>}
        <TextField
          size={'small'}
          variant="outlined"
          fullWidth
          error={!!error?.message}
          helperText={error?.message}
          {...field}
          {...fieldProps}
          onChange={(e) => {
            field.onChange(e);
            fieldProps?.onChange && fieldProps?.onChange(e);
          }}
          inputRef={fieldRef}
          required={false}
        />
      </Box>
    );
  }
);

InputField.displayName = 'InputField';
/**
 * This file is part of AutoPack.
 *
 * Its is form Text Field
 *
 */
export default InputField as <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & InputFieldType) => JSX.Element;
