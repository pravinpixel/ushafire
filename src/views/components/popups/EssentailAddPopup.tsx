import { yupResolver } from '@hookform/resolvers/yup';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import { CloseOutlined } from '@mui/icons-material';
import { Grid, Dialog, IconButton, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { errorSet } from 'helper/GlobalHelper';
import { DynamicPopup } from 'helper/AllComponents';
import { MasterForm } from 'helper/types/MasterType';
import { MasterInputsType } from 'helper/CustomHooks';

import { EssentailAddPopupformDetailsTypes } from '../form-components/AddAsyncSelectField';

// ------------------------------------------------------------------------

type FormValues = {
  [key: string]: string | boolean;
  type: string;
  status: boolean;
};

// ----------------------------------------------------------------------------

const EssentailAddPopup = ({
  loading = false,
  handleClose,
  open,
  name,
  label = '',
  handleAddItem,
  options,
  addName,
  mutateAsync,
  inputOptions,
  formDetails = {},
  schema,
}: {
  handleClose: () => void;
  open: boolean;
  loading?: boolean;
  label?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleAddItem: (res: any) => void;
  options?: EssentialDataType;
  addName: EssentialType;
  inputOptions: MasterInputsType;
  formDetails: EssentailAddPopupformDetailsTypes;
  fend_component?: string;
  schema: Resolver<MasterForm>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutateAsync: UseMutateAsyncFunction<any, any, any, unknown>;
}) => {
  const defaultValues = {
    type: name,
    status: true,
    ...(inputOptions?.defaultValues ?? {}),
  };

  const { control, handleSubmit, setError } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema) as unknown as Resolver<MasterForm>,
  });

  const handleFormSumbit: SubmitHandler<MasterForm> = async (formData) => {
    await mutateAsync({ formData, ...formDetails } as never, {
      onSuccess: async (res) => {
        handleAddItem(res?.data);
      },
      onError: (error) => {
        errorSet({ error: error, setError });
      },
    });
  };

  return (
    <Dialog onClose={handleClose} component={'form'} aria-labelledby="customized-dialog-title" open={open} maxWidth={'sm'} fullWidth>
      <DialogTitle sx={{ m: 0, py: 2, px: 3 }} id="customized-dialog-title">
        Add {label}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseOutlined />
      </IconButton>
      <DialogContent dividers>
        <Grid container spacing={1}>
          {DynamicPopup({
            name: addName,
            control,
            inputOptions,
            options,
            defaultValues,
          })}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3 }}>
        <LoadingButton loading={loading} type="button" onClick={handleSubmit(handleFormSumbit)} variant="contained">
          Save changes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EssentailAddPopup;
