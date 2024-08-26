/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { Ref, forwardRef } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Box, InputLabel } from '@mui/material';

import { ActiveInactiveSwitch } from 'theme/styled-compounet';

import { ActInactSwitchFieldType } from 'helper/types/FormType';
type FormValues = {
  [key: string]: unknown;
};

// type FieldType = {
//   labelProps?: Omit<FormControlLabelProps, 'control'>;
//   fieldProps?: SwitchProps;
// };

const ActInactSwitchField = forwardRef(
  <T extends FormValues>(
    {
      name,
      control,
      disabled,
      labelProps = {
        label: '',
      },
      // fieldProps,
    }: UseControllerProps<T> & { control: Control<T> } & ActInactSwitchFieldType,
    ref: Ref<HTMLDivElement>
  ) => {
    const { field } = useController({
      name,
      control,
      defaultValue: false as PathValue<T, Path<T>>,
    });
    return (
      <Box width={'100%'} ref={ref}>
        <InputLabel
          sx={{
            marginLeft: 0,
          }}
          required={labelProps.required}
        >
          {labelProps.label}
        </InputLabel>
        <ActiveInactiveSwitch
          checked={field.value as boolean}
          inputRef={ref}
          {...field}
          inputProps={{ 'aria-label': 'controlled', disabled }}

          // {...fieldProps}
        />
      </Box>
    );
  }
);
ActInactSwitchField.displayName = 'ActInactSwitchField';
export default ActInactSwitchField as <T extends FormValues>(
  props: UseControllerProps<T> & { control: Control<T> } & ActInactSwitchFieldType
) => JSX.Element;
