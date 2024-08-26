/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { Ref, forwardRef } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Checkbox, FormControlLabel } from '@mui/material';

import { CheckBoxFieldType } from 'helper/types/FormType';
type FormValues = {
  [key: string]: unknown;
};

// type FieldType = {
//   labelProps?: Omit<FormControlLabelProps, 'control'>;
//   fieldProps?: CheckboxProps;
//   onChange?: (value: boolean) => void;
// };

const CheckBoxField = forwardRef(
  <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & CheckBoxFieldType, ref: Ref<HTMLDivElement>) => {
    const {
      name,
      control,
      fieldProps,
      onChange = false,
      labelProps = {
        label: '',
      },
    } = props;
    const {
      field: { ref: fieldRef, ...field },
    } = useController({
      name,
      control,
      defaultValue: '' as PathValue<T, Path<T>>,
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      field.onChange(event.target.checked);
      onChange && onChange(event.target.checked);
    };
    return (
      <FormControlLabel
        labelPlacement="end"
        control={
          <Checkbox
            size="medium"
            checked={field.value as boolean}
            {...field}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            {...fieldProps}
            inputRef={fieldRef}
          />
        }
        {...labelProps}
        ref={ref}
      />
    );
  }
);
CheckBoxField.displayName = 'CheckBoxField';
export default CheckBoxField as <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & CheckBoxFieldType) => JSX.Element;
