/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { Ref, forwardRef } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Radio, Stack, InputLabel, RadioGroup, FormHelperText, FormControlLabel } from '@mui/material';

import { RadioGroupFieldType } from 'helper/types/FormType';

type FormValues = {
  [key: string]: unknown;
};

const RadioGroupField = forwardRef(
  <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & RadioGroupFieldType, ref: Ref<HTMLDivElement>) => {
    const { name, control, fieldProps, options = [], label, disabled = false, required = false } = props;
    const {
      field: { ref: fieldRef, ...field },
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: '' as PathValue<T, Path<T>>,
    });
    return (
      <Stack
        ref={ref}
        //  direction={'row'} alignItems={'center'} gap={3}
      >
        {label && <InputLabel required={required}>{label}</InputLabel>}
        <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" {...fieldProps} {...field} ref={fieldRef}>
          {options.map((data, index) => (
            <FormControlLabel key={index} value={data.value} control={<Radio disabled={disabled} />} label={data.label} />
          ))}
        </RadioGroup>
        {error && <FormHelperText>{error?.message}</FormHelperText>}
      </Stack>
    );
  }
);
RadioGroupField.displayName = 'RadioGroupField';
export default RadioGroupField as <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & RadioGroupFieldType) => JSX.Element;
