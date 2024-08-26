/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 * It used for uploading image in Form Fields
 * it used drag and drop image  to upload...
 *
 */
import { useDropzone } from 'react-dropzone';
import { Ref, forwardRef, useCallback } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Box, Grid, Stack, InputLabel, IconButton, Typography, FormHelperText } from '@mui/material';

import { CameraIcon, DeleteIcon } from 'theme/svg';

import { defaultImage } from 'helper/AssetHelper';
import { DragAndDropImageFieldType } from 'helper/types/FormType';
import { ImageResponse, DeletedIdsType } from 'helper/types/GlobalTypes';

import ImagePreview from '../ui-componet/ImagePreview';

type FormValues = {
  [key: string]: unknown;
};
// type FieldType = {
//   label?: string;
//   fieldProps?: TextFieldProps;
//   onChange?: (file: File[]) => void;
// };
type ImageValue = ImageResponse[] | File[] | string[];

const DragAndDropImageField = forwardRef(
  <T extends FormValues>(
    props: UseControllerProps<T> & { deleteName: Path<T> } & { control: Control<T> } & DragAndDropImageFieldType,
    ref: Ref<HTMLDivElement>
  ) => {
    const { name, control, fieldProps, label, onChange, deleteName } = props;
    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      defaultValue: [] as PathValue<T, Path<T>>,
      control,
    });
    const { field: deleteField } = useController({
      name: deleteName,
      defaultValue: [] as PathValue<T, Path<T>>,
      control,
    });
    const onDrop = useCallback(
      (newFile: File[]) => {
        field.onChange([...(field.value as ImageValue), ...newFile]);
        onChange && onChange(field.value as File[]);
      },
      [field, onChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        'image/jpeg': ['.jpeg', '.png'],
      },
    });

    const handleImage = (src: ImageResponse | string | object) => {
      const image = (src as ImageResponse)?.imagePath ?? src;
      switch (typeof image) {
        case 'string':
          return image;
        case 'object':
          return image !== null ? URL.createObjectURL(image as unknown as Blob | MediaSource) : defaultImage;
        default:
          return defaultImage;
      }
    };

    const handleDelete = (index: number, fileData: ImageResponse | string | File) => {
      const updatedImages = (field.value as ImageValue).filter((_, i) => i !== index);
      field.onChange(updatedImages);
      (fileData as ImageResponse)?._id && deleteField.onChange([...((deleteField.value ?? []) as DeletedIdsType), (fileData as ImageResponse)?._id]);
    };

    return (
      <Box ref={ref}>
        {label && <InputLabel required={fieldProps?.required}>{label}</InputLabel>}
        <Box
          {...getRootProps()}
          sx={({ palette, shape }) => ({
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: 2,
            border: `2px dashed ${error?.message ? palette.error.main : palette.grey[600]}`,
            borderStyle: `dashed`,
            borderRadius: shape.borderRadius * 0.05,
            cursor: 'pointer',
            minHeight: '4.875rem',
            opacity: isDragActive ? 0.4 : 1,
          })}
        >
          <Stack flexDirection={'row'} gap={1} alignItems={'center'} justifyContent={'center'}>
            {!isDragActive ? (
              <>
                <CameraIcon fontSize="large" />
                <Typography variant="textUnderLine">Click Here</Typography>
                <Typography variant="subtitle3" color={({ palette }) => palette.grey[600]}>
                  {'or drag and drop an image.'}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="textUnderLine">Drop the files here ...</Typography>
                <Typography variant="subtitle3" color={'GrayText'}>
                  Drag 'n' drop some files here, or click to select files
                </Typography>
              </>
            )}
          </Stack>
          <Grid container spacing={1}>
            {!!(field.value as ImageValue)?.length &&
              (field.value as ImageValue).map((fileObject, i) => {
                return (
                  <Grid
                    key={`${'file'}-${i}`}
                    xs={2}
                    item={true}
                    maxWidth={'100%'}
                    sx={{
                      position: 'relative',
                      zIndex: 10,
                      maxWidth: '100%',
                      textAlign: 'center',
                      '&:hover .removeButton': {
                        display: 'block',
                      },
                      '&:hover img': {
                        display: 'block',
                      },
                    }}
                  >
                    <ImagePreview
                      src={handleImage(fileObject)}
                      sx={{
                        height: '5.2rem',
                        width: '5.2rem',
                      }}
                    />
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(i, fileObject);
                      }}
                      className="removeButton"
                      aria-label="Delete"
                      sx={{
                        transition: '.5s ease',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        display: 'none',
                        padding: '6px 5px 5px 6px',
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
                    >
                      <DeleteIcon
                        sx={{
                          fontSize: ({ typography }) => typography.subtitle1.fontSize,
                          color: ({ palette }) => palette.error.main,
                        }}
                      />
                    </IconButton>
                  </Grid>
                );
              })}
          </Grid>
          <input type="file" accept="image/*" multiple hidden {...getInputProps()} />
        </Box>
        <FormHelperText>{error?.message}</FormHelperText>
      </Box>
    );
  }
);

DragAndDropImageField.displayName = 'DragAndDropImageField';

export default DragAndDropImageField as <T extends FormValues>(
  props: UseControllerProps<T> & { deleteName: Path<T> } & { control: Control<T> } & DragAndDropImageFieldType
) => JSX.Element;
