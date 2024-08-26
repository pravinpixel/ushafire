/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { Ref, forwardRef } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Switch, FormControlLabel } from '@mui/material';

import { SwitchFieldType } from 'helper/types/FormType';

type FormValues = {
  [key: string]: unknown;
};

// type FieldType = {
//   labelProps?: Omit<FormControlLabelProps, 'control'>;
//   fieldProps?: SwitchProps;
// };

const SwitchField = forwardRef(
  <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & SwitchFieldType, ref: Ref<HTMLDivElement>) => {
    const {
      name,
      control,
      labelProps = {
        label: '',
      },
      fieldProps,
    } = props;
    const {
      field: { ref: fieldRef, ...field },
    } = useController({
      name,
      control,
      defaultValue: false as PathValue<T, Path<T>>,
    });
    return (
      <FormControlLabel
        labelPlacement="start"
        ref={ref}
        control={
          <Switch checked={field.value as boolean} inputRef={fieldRef} {...field} inputProps={{ 'aria-label': 'controlled' }} {...fieldProps} />
        }
        {...labelProps}
      />
    );
  }
);
SwitchField.displayName = 'SwitchField';
export default SwitchField as <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & SwitchFieldType) => JSX.Element;
