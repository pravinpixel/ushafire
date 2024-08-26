/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 * It used for uploading document in Form Fields
 * it used drag and drop document  to upload...
 *
 */
import { Accept, useDropzone } from 'react-dropzone';
import { Ref, forwardRef, useCallback } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Box, Stack, InputLabel, Typography, FormHelperText, CircularProgress } from '@mui/material';

import { CameraIcon, DownLoadIcon } from 'theme/svg';

import { notify } from 'helper/GlobalHelper';
import { DragAndDropImportFieldType } from 'helper/types/FormType';

import { useImportApi, useSampleExcelApi } from 'store/hooks/EssentialHooks';

type FormValues = {
  [key: string]: unknown;
};

const acceptedFileTypes: Accept = {
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
};

const DragAndDropImportField = forwardRef(
  <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & DragAndDropImportFieldType, ref: Ref<HTMLDivElement>) => {
    const { name, control, fieldProps, label, onChange, url, sampleDownloadUrl, defaultImportValue } = props;
    const { mutateAsync: importApi, isPending } = useImportApi();
    const { mutateAsync: sampleDownloadApi, isPending: downloadLoading } = useSampleExcelApi();

    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      defaultValue: '' as PathValue<T, Path<T>>,
      control,
    });

    const onDrop = useCallback(
      async (newFile: File[]) => {
        await importApi(
          {
            url: url,
            formData: { import_excel: newFile?.[0], defaultImportValue },
          },
          {
            onSuccess: (res) => {
              // notify(res);
              field.onChange(res?.data as unknown);
              onChange && onChange(res as { data: unknown; error: unknown });
            },
            onError: (error) => notify(error),
          }
        );
      },
      [defaultImportValue, field, importApi, onChange, url]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: acceptedFileTypes,
      multiple: false,
      onDrop,
      disabled: isPending,
    });
    return (
      <Box ref={ref}>
        {label && (
          <Stack flexDirection={'row'} justifyContent={sampleDownloadUrl ? 'space-between' : 'normal'}>
            <InputLabel required={fieldProps?.required}>{label}</InputLabel>
            {sampleDownloadUrl && (
              <Typography
                variant="subtitle2"
                color={({ palette }) => palette.customColor.darkGreyOne}
                onClick={async () => sampleDownloadApi({ url: sampleDownloadUrl })}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={1}
                sx={{
                  cursor: 'pointer',
                }}
              >
                {downloadLoading ? (
                  <CircularProgress size={15} />
                ) : (
                  <DownLoadIcon
                    sx={{
                      color: 'inherit',
                    }}
                  />
                )}
                Download Template
              </Typography>
            )}
          </Stack>
        )}
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
                {isPending ? <CircularProgress size={33} /> : <CameraIcon fontSize="large" />}
                <Typography variant="textUnderLine">Click Here</Typography>
                <Typography variant="subtitle3" color={({ palette }) => palette.grey[600]}>
                  {'to Import'}
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
          <input {...getInputProps()} />
        </Box>
        <FormHelperText>{error?.message}</FormHelperText>
      </Box>
    );
  }
);

DragAndDropImportField.displayName = 'DragAndDropImportField';

export default DragAndDropImportField as <T extends FormValues>(
  props: UseControllerProps<T> & { control: Control<T> } & DragAndDropImportFieldType
) => JSX.Element;
