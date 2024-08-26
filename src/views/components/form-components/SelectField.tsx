/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { Ref, forwardRef } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { ExpandMoreOutlined } from '@mui/icons-material';
import { Select, MenuItem, InputLabel, SelectProps, FormControl, FormHelperText } from '@mui/material';

import { OptionsType } from 'helper/types/GlobalTypes';
import { SelectFieldType } from 'helper/types/FormType';

type FormValues = {
  [key: string]: unknown;
};

// type FieldType = {
//   label?: string;
//   fieldProps?: SelectProps;
//   options?: (string | number | OptionsType)[];
// };

const SelectField = forwardRef(
  <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & SelectFieldType, ref: Ref<HTMLDivElement>) => {
    const { name, control, fieldProps, options = [], label } = props;
    const defaultValue = options?.[0] || '';
    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: defaultValue as PathValue<T, Path<T>>,
    });
    return (
      <>
        {label && <InputLabel required={fieldProps?.required}>{label}</InputLabel>}
        <FormControl ref={ref} fullWidth variant="outlined" size="small">
          <Select
            IconComponent={(props) => <ExpandMoreOutlined {...props} fontSize="medium" />}
            {...field}
            {...fieldProps}
            //Setting Defaultvalue in select
            defaultValue={field?.value ?? options?.[0]}
          >
            {options.map((data, index) =>
              typeof data === 'string' || typeof data === 'number' ? (
                <MenuItem key={index} value={data}>
                  {data}
                </MenuItem>
              ) : (
                <MenuItem key={index} value={data.value}>
                  {data.label}
                </MenuItem>
              )
            )}
          </Select>
          {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      </>
    );
  }
);
SelectField.displayName = 'SelectField';
export default SelectField as <T extends FormValues>(
  props: UseControllerProps<T> & { control: Control<T> } & { label?: string } & {
    fieldProps?: SelectProps;
  } & { options?: (string | number | OptionsType)[] }
) => JSX.Element;
