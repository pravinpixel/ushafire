import { Control, useController, useFieldArray } from 'react-hook-form';

import { Box, Grid, Stack, Button, checkboxClasses } from '@mui/material';

import { CheckCloseIcon } from 'theme/svg';

import InputField from 'views/components/form-components/InputField';
import CheckBoxField from 'views/components/form-components/CheckBoxField';

export default function AddMoreFields({ name, control }: { name: string; control: Control }) {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });

  const { field } = useController({
    name: `${name}_deleted_ids`,
    control,
  });

  const handleAppend = () => {
    append({
      name: '',
      withId: false,
    });
  };

  return (
    <>
      <Grid item md={2}>
        {fields?.length === 0 && (
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mt={4}>
            <Button onClick={handleAppend}>Add More</Button>
          </Box>
        )}
      </Grid>
      <Grid item sm={12}>
        <Stack width={'100%'} direction={'row'} flexWrap={'wrap'} gap={2}>
          {fields?.map((_, index) => {
            return (
              <Stack direction={'row'} key={_.id} width={'100%'} alignItems={'center'} gap={3} flexWrap={'wrap'}>
                <Grid item>
                  <InputField
                    name={`${name}.${index}.name`}
                    control={control as never}
                    label={index === 0 ? 'Name' : ''}
                    fieldProps={{
                      required: false,
                      placeholder: 'Enter Name',
                      disabled: false,
                    }}
                  />
                </Grid>
                <Grid
                  item
                  sx={{
                    paddingTop: index === 0 ? '28px' : 0,
                  }}
                >
                  <CheckBoxField
                    control={control as never}
                    name={`${name}.${index}.withId`}
                    labelProps={{
                      label: 'WithId',
                      labelPlacement: 'end',
                    }}
                    fieldProps={{
                      color: 'success',
                      icon: <CheckCloseIcon />,
                      sx: ({ palette }) => {
                        return {
                          color: palette.error.main,
                          '&.Mui-checked': {
                            color: palette.success.main,
                          },
                          [`&.${checkboxClasses.root}.Mui-disabled `]: {
                            color: palette.error.main,
                            '&.Mui-checked': {
                              color: palette.success.main,
                            },
                          },
                        };
                      },
                    }}
                  />
                </Grid>
                <Grid
                  item
                  sx={{
                    paddingTop: index === 0 ? '28px' : 0,
                    display: 'flex',
                    gap: 2,
                  }}
                >
                  <Button
                    onClick={() => {
                      handleAppend();
                    }}
                  >
                    Add More
                  </Button>
                  {fields.length > 0 && (
                    <Button
                      onClick={() => {
                        remove(index);
                        const { _id }: { _id: string } = fields[index] as unknown as { _id: string };
                        const preData = field?.value || [];
                        if (_id) {
                          field.onChange([...new Set([...preData, _id])]);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </Grid>
              </Stack>
            );
          })}
        </Stack>
      </Grid>
    </>
  );
}
