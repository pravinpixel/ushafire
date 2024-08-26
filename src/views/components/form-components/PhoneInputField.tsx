/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { Ref, forwardRef } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { Box, TextField, InputLabel } from '@mui/material';

import { InputFieldType } from 'helper/types/FormType';

type FormValues = {
  [key: string]: unknown;
};

// type FieldType = {
//   label?: string;
//   fieldProps?: TextFieldProps;
//   onChange?: FormEventHandler<HTMLDivElement>;
// };

const PhoneInputField = forwardRef(
  <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & InputFieldType, ref: Ref<HTMLDivElement>) => {
    const { name, control, fieldProps, label, onChange } = props;

    const {
      field: { ref: fieldRef, ...field },
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: '' as PathValue<T, Path<T>>,
    });

    const formatPhoneNumber = (value: string) => {
      const cleaned = ('' + value).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{4})(\d{4})$/);
      if (match) {
        return `+65 ${match[1]} ${match[2]}`;
      }
      return value;
    };

    return (
      <Box width={'100%'} ref={ref} onChange={onChange}>
        {label && <InputLabel required={fieldProps?.required}>{label}</InputLabel>}
        <TextField
          size={'small'}
          variant="outlined"
          fullWidth
          error={!!error?.message}
          helperText={error?.message}
          {...field}
          inputRef={fieldRef}
          {...fieldProps}
          onChange={(e) => {
            const formattedValue = formatPhoneNumber(e.target.value);
            field.onChange(formattedValue);
            fieldProps?.onChange && fieldProps?.onChange(e);
          }}
          onBlur={(e) => {
            const formattedValue = formatPhoneNumber(e.target.value);
            field.onChange(formattedValue);
            fieldProps?.onBlur && fieldProps?.onBlur(e);
          }}
          required={false}
        />
      </Box>
    );
  }
);

PhoneInputField.displayName = 'PhoneInputField';

export default PhoneInputField as <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & InputFieldType) => JSX.Element;

// import { MuiTelInput } from 'mui-tel-input';
// import { Ref, forwardRef, FormEventHandler } from 'react';
// import { Path, PathValue, useController, UseControllerProps } from 'react-hook-form';

// import { Box, InputLabel, TextFieldProps } from '@mui/material';

// type FormValues = {
//   [key: string]: unknown;
// };

// const PhoneInputField = forwardRef (<T extends FormValues>(
//   props: UseControllerProps<T> & { label: string } & { fieldProps?: TextFieldProps } & {
//     onChange?: FormEventHandler<HTMLDivElement>;
//   },
//   ref: Ref<HTMLDivElement>
// ) => {
//   const { name, control, fieldProps, label, onChange } = props;
//   const {
//     field: { ref: fieldRef, value, onChange: fieldOnChange, onBlur },
//     fieldState: { error },
//   } = useController({
//     name,
//     control,
//     defaultValue: '' as PathValue<T, Path<T>>,
//   });

//   return (
//     <Box width={'100%'} ref={ref} onChange={onChange}>
//       {label && <InputLabel required={fieldProps?.required}>{label}</InputLabel>}
//       <MuiTelInput
//         size={'small'}
//         variant="outlined"
//         fullWidth
//         {...fieldProps}
//         value={value ?? ''}
//         inputRef={fieldRef}
//         defaultCountry="SG"
//         error={!!error?.message}
//         helperText={error?.message}
//         onChange={(e) => {
//           fieldOnChange(e);
//           fieldProps?.onChange && fieldProps?.onChange(e);
//         }}
//         onBlur={(e) => {
//           onBlur();
//           fieldProps?.onBlur && fieldProps?.onBlur(e);
//         }}
//         required={false}
//       />
//     </Box>
//   );
// }
// );

// PhoneInputField.displayName = 'PhoneInputField';

// export default PhoneInputField as <T extends FormValues>(
//   props: UseControllerProps<T> &  { fieldProps?: TextFieldProps } & { label?: string } & {
//     onChange?: FormEventHandler<HTMLDivElement>;
//   }
// ) => JSX.Element;
