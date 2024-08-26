import { useFormContext } from 'react-hook-form';

import { Grid, Divider, GridOwnProps } from '@mui/material';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

import { AddMoreButtonProps } from 'helper/types/GlobalTypes';

type Props = LoadingButtonProps & {
  loading?: boolean;
  buttonLabel?: string;
  dividerRemove?: boolean;
  leftButton?: boolean;
  gridProps?: GridOwnProps;
  addMoreButton?: AddMoreButtonProps[];
};
/**
 * This file is part of AutoPack.
 *
 * This Footer used for form fields
 *
 */
const FormFooter = ({ buttonLabel = 'Save', loading, dividerRemove = true, leftButton = false, gridProps, addMoreButton = [], ...props }: Props) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  const addButton = addMoreButton?.filter(({ access = true }) => access);
  const Buttons: AddMoreButtonProps[] = [
    { label: buttonLabel, loading: loading ?? isSubmitting, variant: 'contained', type: 'submit', ...props },
    ...addButton,
  ];

  return (
    <Grid container spacing={2} alignItems={'center'} justifyContent={leftButton ? 'flex-end' : 'normal'}>
      {!dividerRemove && (
        <Grid item md={12} my={3}>
          <Divider variant="fullWidth" />
        </Grid>
      )}
      {/* {leftButton && <Grid item md={11 - Buttons.length}></Grid>} */}
      {Buttons.map((value, index) => (
        <Grid key={`button-${index}-id`} item {...gridProps} mb={3} {...gridProps}>
          <LoadingButton fullWidth {...value}>
            {value.label}
          </LoadingButton>
        </Grid>
      ))}
    </Grid>
  );
};

export default FormFooter;
