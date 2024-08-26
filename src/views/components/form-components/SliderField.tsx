/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { forwardRef } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Slider, SwitchProps } from '@mui/material';
import { OverridableTypeMap, DefaultComponentProps } from '@mui/material/OverridableComponent';

type FormValues = {
  [key: string]: unknown;
};

const InputField = <T extends FormValues>(
  props: UseControllerProps<T> & { control: Control<T> } & { fieldProps?: DefaultComponentProps<OverridableTypeMap> }
) => {
  const { name, control, fieldProps } = props;
  const { field } = useController({
    name,
    control,
    defaultValue: '' as PathValue<T, Path<T>>,
  });
  return <Slider defaultValue={field.value as number} aria-label="Default" valueLabelDisplay="auto" {...fieldProps} />;
};

export default forwardRef(InputField) as <T extends FormValues>(
  props: UseControllerProps<T> & { control: Control<T> } & { fieldProps?: SwitchProps }
) => JSX.Element;
