/**
 * This file is part of AutoPack.
 *
 * This layout used to wrap the form fields to all forms
 *
 */
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

import { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { Grid, Paper, Stack, Button, StackProps, Typography, GridOwnProps } from '@mui/material';

import { useRouter } from 'helper/CustomHooks';
import { AddMoreButtonProps } from 'helper/types/GlobalTypes';

import WholeTitle from './WholeTitle';
import ScrollBar from '../scroll-bar';
import FormFooter from './FormFooter';

type Props<T extends FieldValues> = {
  title: string;
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formProps: UseFormReturn<T, any, any>;
  stackProps?: StackProps;
  loading?: boolean;
  buttonLabel?: string;
  dividerRemove?: boolean;
  requiredRemove?: boolean;
  onSumbit?: React.FormEventHandler<HTMLFormElement> | undefined;
  cancelButtonDisable?: boolean;
  naviagteLink?: string;
  addMoreButton?: AddMoreButtonProps[];
  gridProps?: GridOwnProps;
  mainGridProps?: GridOwnProps;
  buttonProps?: LoadingButtonProps;
  formTitle?: string;
};

const FormLayout = <T extends FieldValues>({
  title,
  cancelButtonDisable = true,
  naviagteLink = '/',
  requiredRemove = true,
  buttonLabel,
  loading,
  dividerRemove,
  children,
  stackProps,
  onSumbit,
  addMoreButton,
  formProps,
  gridProps,
  mainGridProps,
  buttonProps,
}: Props<T>) => {
  const { push } = useRouter();
  return (
    <FormProvider {...formProps} key={`form-provider-${title}`}>
      <Stack direction={'row'} mb={3} justifyContent={'space-between'} alignItems={'center'}>
        <WholeTitle title={title} variant="h4" />
        {cancelButtonDisable && (
          <Button variant="contained" color="error" onClick={() => push(naviagteLink)}>
            Cancel
          </Button>
        )}
      </Stack>
      <Paper component={'form'} variant="form" onSubmit={onSumbit}>
        <ScrollBar
          sx={{ width: '100%', overflowX: 'hidden', minHeight: '20rem', height: 'calc(100vh - 220px)', padding: '3rem 2rem 2.5rem 2rem' }}
          other={{
            autoHide: false,
          }}
        >
          <Stack direction={'column'} gap={5} height={'100%'} {...stackProps}>
            {!requiredRemove && (
              <Typography color={({ palette }) => palette.error.main} variant="body1">
                * Required
              </Typography>
            )}
            <Grid container spacing={2} alignItems={'center'} {...mainGridProps}>
              {children}
            </Grid>
            <FormFooter
              buttonLabel={buttonLabel}
              loading={loading}
              dividerRemove={dividerRemove}
              addMoreButton={addMoreButton}
              gridProps={gridProps}
              {...buttonProps}
            />
          </Stack>
        </ScrollBar>
      </Paper>
    </FormProvider>
  );
};

export default FormLayout;
