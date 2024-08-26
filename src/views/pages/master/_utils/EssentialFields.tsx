import { Control } from 'react-hook-form';

import { Grid } from '@mui/material';

import { InputsType, MasterForm } from 'helper/types/MasterType';

import InputField from 'views/components/form-components/InputField';
import TextAreaField from 'views/components/form-components/TextAreaField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import ActInactSwitchField from 'views/components/form-components/ActInactField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import NumberInputField from 'views/components/form-components/NumberInputField';

export default function EssentialFields({ control, dynamicinputs }: { dynamicinputs: InputsType[]; control: Control<MasterForm> }) {
  return (
    <>
      {dynamicinputs?.map((input, index) => {
        switch (input.type) {
          case 'checkbox':
            return (
              <Grid item xs={input.xs} sm={input.sm} md={input.md} key={index}>
                <ActInactSwitchField name={input.name} control={control} labelProps={{ label: 'Status', required: true }} disabled={input.readOnly} />
              </Grid>
            );
          case 'autocomplete':
            return (
              <Grid item xs={input.xs} sm={input.sm} md={input.md} key={index}>
                <AsyncSelectField
                  name={input.name}
                  control={control}
                  label={input.label}
                  options={input?.options ?? []}
                  readOnly={input.readOnly}
                  textFieldProps={{
                    required: true,
                    placeholder: 'Select ' + input.label,
                  }}
                  addName='Address'
                />
              </Grid>
            );
          case 'number':
            return (
              <Grid item xs={input.xs} sm={input.sm} md={input.md} key={index}>
                <NumberInputField
                  key={index}
                  name={input.name}
                  control={control}
                  label={input.label}
                  fieldProps={{
                    required: true,
                    placeholder: 'Enter ' + input.label,
                    InputProps: {
                      readOnly: input.readOnly,
                    },
                  }}
                />
              </Grid>
            );
          case 'date':
            return (
              <Grid item xs={input.xs} sm={input.sm} md={input.md} key={index}>
                <DatePickerField
                  control={control}
                  name={input.name}
                  label={input.label}
                  fieldProps={{
                    required: true,
                    placeholder: 'Enter ' + input.label,
                    InputProps: {
                      readOnly: input.readOnly,
                    },
                  }}
                />
              </Grid>
            );
          case 'textarea':
            return (
              <Grid item xs={input.xs} sm={input.sm} md={input.md} key={index}>
                <TextAreaField
                  control={control}
                  name={input.name}
                  label={input.label}
                  fieldProps={{
                    required: true,
                    placeholder: 'Enter ' + input.label,
                    InputProps: {
                      readOnly: input.readOnly,
                    },
                  }}
                />
              </Grid>
            );
          default:
            return (
              <Grid item xs={input.xs} sm={input.sm} md={input.md} key={index}>
                <InputField
                  key={index}
                  name={input.name}
                  control={control}
                  label={input.label}
                  fieldProps={{
                    required: true,
                    placeholder: 'Enter ' + input.label,
                    InputProps: {
                      readOnly: input.readOnly,
                    },
                  }}
                />
              </Grid>
            );
        }
      })}
    </>
  );
}
