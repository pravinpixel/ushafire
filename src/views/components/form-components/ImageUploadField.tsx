/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 * It used for uploading image in Form Fields
 *
 */
import { Ref, useRef, forwardRef } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Box, InputLabel, Typography, IconButton, FormHelperText } from '@mui/material';

import { DeleteIcon } from 'theme/svg';

import { defaultImage } from 'helper/AssetHelper';
import { FieldType } from 'helper/types/FormType';

import ImagePreview from '../ui-componet/ImagePreview';

type FormValues = {
  [key: string]: unknown;
};

const ImageUploadField = forwardRef(
  <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & FieldType, ref: Ref<HTMLDivElement>) => {
    const { name, control, fieldProps, label } = props;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: '' as PathValue<T, Path<T>>,
    });
    const handleFileInputChange = () => {
      field.onChange(fileInputRef?.current?.files?.[0]);
    };

    const handleImage = () => {
      switch (typeof field?.value) {
        case 'string':
          return field.value;
        case 'object':
          return field.value !== null ? URL.createObjectURL(field.value as unknown as Blob | MediaSource) : defaultImage;
        default:
          return defaultImage;
      }
    };

    return (
      <Box width={'100%'} ref={ref}>
        {label && <InputLabel required={fieldProps?.required}>{label}</InputLabel>}
        <Box
          sx={({ palette, shape }) => ({
            gap: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            p: 2,
            height: '2.8125rem',
            border: `1px dashed ${error?.message ? palette.error.main : palette.grey[600]}`,
            borderRadius: shape.borderRadius * 0.05,
            cursor: 'pointer',
          })}
          onClick={() => fileInputRef?.current?.click()}
        >
          <Typography variant="subtitle2">Choose File</Typography>
          <Typography noWrap variant="subtitle3" color={({ palette }) => palette.grey[600]}>
            {'(Accept only .JPG, .JPEG, .PNG) (2500 x 1600)'}
          </Typography>
        </Box>
        <FormHelperText>{error?.message}</FormHelperText>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          gap={2}
          sx={{
            marginTop: '0.75rem',
            height: '5.75rem',
            width: '6.25rem',
            position: 'relative',
            zIndex: 10,
            '&:hover .removeButton': {
              display: 'block',
            },
            '&:hover img': {
              display: 'block',
            },
          }}
        >
          <ImagePreview
            variant="square"
            slotProps={{
              img: {
                sx: {
                  objectFit: 'contain',
                },
              },
            }}
            sx={{
              height: '5.75rem',
              width: '6.25rem',
            }}
            src={handleImage()}
          />
          {field.value && (
            <IconButton
              className="removeButton"
              sx={{
                transition: '.5s ease',
                position: 'absolute',
                top: '0',
                right: '0',
                display: 'none',
                fontSize: ({ typography }) => typography.caption.fontSize,
                backgroundColor:
                  // 'transparent'
                  ({ palette }) => palette.error.lighter,
                '&:hover': {
                  backgroundColor:
                    // 'transparent'
                    ({ palette }) => palette.error.lighter,
                },
              }}
              onClick={() => field.onChange('')}
            >
              <DeleteIcon
                sx={{
                  fontSize: ({ typography }) => typography.subtitle1.fontSize,
                  color: ({ palette }) => palette.error.main,
                }}
              />
            </IconButton>
          )}
        </Box>
        <input key={`${field.value}`} type="file" accept="image/*" ref={fileInputRef} hidden onChange={handleFileInputChange} />
      </Box>
    );
  }
);

ImageUploadField.displayName = 'ImageUploadField';

export default ImageUploadField as <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & FieldType) => JSX.Element;
