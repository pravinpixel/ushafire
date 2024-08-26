/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { Ref, Fragment, forwardRef } from 'react';
import { Path, Control, PathValue, FieldError, useController, UseControllerProps } from 'react-hook-form';

import { Box, Stack, TextField, InputLabel, Typography } from '@mui/material';

import { handleNumberInput } from 'helper/GlobalHelper';
import { DimensionFieldType } from 'helper/types/FormType';

type FormValues = {
  [key: string]: unknown;
};
type FieldValue = {
  [key: string]: string;
};
// type FieldType = {
//   label?: string;
//   fieldProps?: TextFieldProps;
//   onChange?: FormEventHandler<HTMLDivElement>;
//   dimension: string[];
// };
type CustomErrorType = FieldError & {
  [key: string]: FieldError;
};
const DimensionField = forwardRef(
  <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & DimensionFieldType, ref: Ref<HTMLDivElement>) => {
    const { name, control, fieldProps, label, onChange, dimension = [] } = props;

    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: {} as PathValue<T, Path<T>>,
    });
    const handleDimensionChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
      const dimensionValue = {
        ...(field.value as FieldValue),
        [name]: target.value,
      };
      field.onChange(dimensionValue);
    };
    return (
      <Box width={'100%'} ref={ref} onChange={onChange}>
        {label && <InputLabel required={fieldProps?.required}>{label}</InputLabel>}
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          {dimension.map((name, i) => (
            <Fragment key={i}>
              <TextField
                name={name}
                size={'small'}
                variant="outlined"
                fullWidth
                error={!!(error as CustomErrorType)?.[name]?.message as never}
                helperText={(error as CustomErrorType)?.[name]?.message}
                placeholder={name}
                ref={field.ref}
                onBlur={field.onBlur}
                onInput={handleNumberInput}
                value={(field.value as FieldValue)?.[name]}
                onChange={(e) => {
                  handleDimensionChange(e, name);
                  fieldProps?.onChange && fieldProps?.onChange(e);
                }}
                {...fieldProps}
                required={false}
              />
              <Typography variant="subtitle1" textTransform={'capitalize'}>
                {name}
              </Typography>
              {dimension.length - 1 !== i && (
                <Typography variant="subtitle3" color={'GrayText'}>
                  x
                </Typography>
              )}
            </Fragment>
          ))}
        </Stack>
      </Box>
    );
  }
);

DimensionField.displayName = 'DimensionField';

export default DimensionField as <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & DimensionFieldType) => JSX.Element;
