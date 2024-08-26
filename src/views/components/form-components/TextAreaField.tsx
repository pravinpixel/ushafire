/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { Ref, forwardRef } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Box, TextField, InputLabel } from '@mui/material';

import { FieldType } from 'helper/types/FormType';

type FormValues = {
  [key: string]: unknown;
};

// type FieldType = {
//   label?: string;
//   fieldProps?: TextFieldProps;
// };

const TextAreaField = forwardRef(
  <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & FieldType, ref: Ref<HTMLDivElement>) => {
    const { name, control, fieldProps, label } = props;
    const {
      field: { ref: fieldRef, ...field },
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: '' as PathValue<T, Path<T>>,
    });
    return (
      <Box width={'100%'} ref={ref}>
        <InputLabel required={fieldProps?.required}>{label}</InputLabel>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={5}
          error={!!error?.message}
          helperText={error?.message}
          {...field}
          {...fieldProps}
          inputRef={fieldRef}
          required={false}
        />
      </Box>
    );
  }
);

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField as <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & FieldType) => JSX.Element;
