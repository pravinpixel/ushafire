/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 * It used for uploading documents in Form Fields
 *
 */
import { Ref, useRef, forwardRef } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Box, Button, InputLabel, Typography, ButtonGroup, FormHelperText } from '@mui/material';

import { UploadDocumentFieldType } from 'helper/types/FormType';

type FormValues = {
  [key: string]: unknown;
};

// type FieldType = {
//   fieldProps?: TextFieldProps;
// };

const UploadDocumentField = forwardRef(
  <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & UploadDocumentFieldType, ref: Ref<HTMLDivElement>) => {
    const { name, control, fieldProps } = props;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
      field: { ref: fieldRef, ...field },
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: '' as PathValue<T, Path<T>>,
    });
    const handleUpload = () => {
      fileInputRef?.current?.files && field.onChange(fileInputRef?.current?.files?.[0]);
    };
    return (
      <Box width={'100%'} ref={ref}>
        {fieldProps?.label && <InputLabel required={fieldProps?.required}>{fieldProps?.label}</InputLabel>}
        <ButtonGroup
          variant="contained"
          aria-label="Button group with a nested menu"
          fullWidth
          onClick={() => {
            fileInputRef?.current?.click();
          }}
          sx={{ boxShadow: 'unset' }}
        >
          <Box
            ref={fieldRef}
            sx={({ palette }) => ({
              width: '100%',
              gap: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              p: 2,
              height: '2.8125rem',
              border: `1px solid ${error?.message ? palette.error.main : palette.grey[400]}`,
              cursor: 'pointer',
              borderRadius: `6px 0 0 6px`,
            })}
          >
            {/* <Typography variant="subtitle2">Choose File</Typography> */}
            <Typography variant="subtitle3" color={({ palette }) => palette.grey[600]}>
              {field.value ? (field.value as unknown as File).name ?? field.value : fieldProps?.placeholder}
            </Typography>
          </Box>
          <Button
            sx={{
              width: '30%',
            }}
          >
            Browse
          </Button>
        </ButtonGroup>
        {error && <FormHelperText>{error?.message}</FormHelperText>}
        <input type="file" ref={fileInputRef} hidden onChange={handleUpload} />
      </Box>
    );
  }
);

UploadDocumentField.displayName = 'UploadDocumentField';

export default UploadDocumentField as <T extends FormValues>(
  props: UseControllerProps<T> & { control: Control<T> } & UploadDocumentFieldType
) => JSX.Element;
