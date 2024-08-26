/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { Ref, useState, forwardRef } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Box, Checkbox, TextField, InputLabel, FormControlLabel, CircularProgress } from '@mui/material';

import { notify } from 'helper/GlobalHelper';
import { AutoGenerateSkuFieldType } from 'helper/types/FormType';

import { useCreateGenerateIdApi } from 'store/hooks/EssentialHooks';

type FormValues = {
  [key: string]: unknown;
};

// type FieldType = {
//   fieldProps?: TextFieldProps;
//   label?: string;
//   vision: VisionType;
//   checkBoxProps?: Omit<FormControlLabelProps, 'control'>;
// };

const AutoGenerateSkuField = forwardRef(
  <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & AutoGenerateSkuFieldType, ref: Ref<HTMLDivElement>) => {
    const {
      name,
      control,
      fieldProps,
      label,
      vision,
      checkBoxProps = {
        label: '',
      },
    } = props;
    const { mutateAsync: generateCode, isPending: loading } = useCreateGenerateIdApi();
    const [disable, setDisable] = useState(false);
    const {
      field: { ref: fieldRef, ...field },
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: '' as PathValue<T, Path<T>>,
    });

    const generateID = async () => {
      generateCode(
        {
          vision,
        },
        {
          onSuccess: (res) => {
            field.onChange(res.code);
            setDisable(true);
          },
          onError: (error) => notify(error),
        }
      );
    };

    return (
      <Box width={'100%'} ref={ref}>
        <InputLabel required={fieldProps?.required}>{label}</InputLabel>
        <TextField
          size={'small'}
          variant="outlined"
          fullWidth
          error={!!error?.message}
          helperText={error?.message}
          {...field}
          inputRef={fieldRef}
          {...fieldProps}
          required={false}
          InputProps={{
            readOnly: disable,
            endAdornment: loading && <CircularProgress color="primary" size={20} />,
          }}
        />
        <FormControlLabel
          labelPlacement="end"
          control={
            <Checkbox
              size="small"
              onChange={(e) => (e.target.checked ? generateID() : setDisable(false))}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          {...checkBoxProps}
        />
      </Box>
    );
  }
);

AutoGenerateSkuField.displayName = 'AutoGenerateSkuField';

export default AutoGenerateSkuField as <T extends FormValues>(
  props: UseControllerProps<T> & { control: Control<T> } & AutoGenerateSkuFieldType
) => JSX.Element;
