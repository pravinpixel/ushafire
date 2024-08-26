/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Box, MenuItem, TextField, InputLabel, outlinedInputClasses } from '@mui/material';

import { InputFieldType } from 'helper/types/FormType';

type FormValues = {
  [key: string]: unknown;
};

// type FieldType = {
//   label?: string;
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

const CounrtyCode = <T extends FormValues>(
  props: UseControllerProps<T> & { control: Control<T> } & InputFieldType
  // ref: Ref<HTMLDivElement>
) => {
  const { name, control, fieldProps, label, onChange } = props;

  const {
    field: { ref: fieldRef, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: 'USD' as PathValue<T, Path<T>>,
  });
  return (
    <Box width={'100%'} onChange={onChange}>
      {label && <InputLabel required={fieldProps?.required}>{label}</InputLabel>}
      <TextField
        size={'small'}
        // variant="inputselect"
        error={!!error?.message}
        helperText={error?.message}
        {...field}
        {...fieldProps}
        sx={{
          [`& .${outlinedInputClasses.input}`]: {
            minWidth: 30,
          },
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'transparent ',
            borderWidth: '0px ',
          },
        }}
        select
        onChange={(e) => {
          field.onChange(e);
          fieldProps?.onChange && fieldProps?.onChange(e);
        }}
        required={false}
        inputRef={fieldRef}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

CounrtyCode.displayName = 'CounrtyCode';

export default CounrtyCode as <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & InputFieldType) => JSX.Element;
