import _ from 'lodash';
import React, { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, useFieldArray, SubmitHandler } from 'react-hook-form';

import { Box, Paper, Stack, Dialog, TableBody, Typography, IconButton, FormHelperText } from '@mui/material';

import { PlusIcon } from 'theme/svg';
import { formPaper } from 'theme/css';

import { notify } from 'helper/GlobalHelper';
import { PopupNames } from 'helper/types/GlobalTypes';
import { stockOutwardUpdateQuantitySchema } from 'helper/ValidationSchema';
import { FormSplit } from 'helper/types/inventory-management/StockOutwardType';

import { useWarehouseProductBRSBDetails } from 'store/hooks/InventoryManagementHook';

import FormFooter from '../ui-componet/FormFooter';
import DummyField from '../form-components/DummyField';
import StockOutWardBSRB from './_utils/StockOutWardBSRB';
import AsyncSelectField from '../form-components/AsyncSelectField';
import DeleteFieldButton from '../form-components/DeleteFieldButton';

type Props = {
  name?: PopupNames;
  handleClose: () => void;
  open: boolean;
  modelName?: PopupNames;
  defaultValues?: FormSplit;
  handleDataSumbit: (res: FormSplit) => void;
};
const FIELDNAME = 'productQtySplit';
const StockOutQtySplitPopoup = ({ handleClose, open, name, modelName, defaultValues, handleDataSumbit }: Props) => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormSplit>({
    defaultValues: defaultValues,
    resolver: yupResolver(stockOutwardUpdateQuantitySchema) as unknown as Resolver<FormSplit>,
    mode: 'all',
  });
  const { mutateAsync, isPending } = useWarehouseProductBRSBDetails();
  const handleProductDetails = useCallback(
    async (index: number, res?: string) => {
      try {
        if (res) {
          const response = await mutateAsync({
            id: (defaultValues?.productId?.value as string) ?? '',
            warehouseId: res,
          });
          setValue(`${FIELDNAME}.${index}.warehouseIdData`, response?.outwardDetails);
        } else {
          setValue(`${FIELDNAME}.${index}.warehouseIdData`, []);
        }
      } catch (error) {
        notify(error);
      }
    },
    [defaultValues?.productId?.value, mutateAsync, setValue]
  );
  const QuantityCount = watch(FIELDNAME)?.reduce((total, data) => {
    return parseFloat(`${data?.warehouseIdQuantity}` || '0') + total;
  }, 0);

  const { fields, append, remove } = useFieldArray({
    name: FIELDNAME,
    control,
  });

  const handleFormSumbit: SubmitHandler<FormSplit> = (data) => {
    handleDataSumbit(data);
  };

  return (
    <Dialog onClose={handleClose} fullWidth maxWidth="lg" aria-labelledby="customized-dialog-title" open={name ? name === modelName && open : open}>
      <Paper
        sx={{
          ...formPaper,
        }}
      >
        <Stack justifyContent={'space-between'} alignItems={'center'} direction={{ xs: 'column', md: 'row' }}>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <Typography variant="h6">Withdraw Quantity</Typography>
            <IconButton onClick={() => append({ warehouseId: null, warehouseIdData: [], warehouseIdQuantity: 0 })}>
              <PlusIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
            <Typography
              variant="subtitle1"
              color={'lightgrey'}
              sx={{
                mb: errors?.quantity?.message && 2.5,
              }}
            >
              Total Outward Quantity
            </Typography>
            <DummyField
              sx={{
                minWidth: 160,
                display: 'flex',
                flexDirection: 'column',
              }}
              value={QuantityCount}
            />
          </Stack>
        </Stack>
        {_.map(fields, (field, index) => (
          <React.Fragment key={field.id}>
            <Stack justifyContent={'space-between'} alignItems={'center'} direction={{ xs: 'column', md: 'row' }}>
              <Box width={'25%'}>
                <AsyncSelectField
                  name={`${FIELDNAME}.${index}.warehouseId`}
                  textFieldProps={{
                    placeholder: 'Select the Warehouse',
                  }}
                  disabledArray={_.map(watch(FIELDNAME), ({ warehouseId }) => (warehouseId?.value as string) ?? '')}
                  options={defaultValues?.warehouseEssential ?? []}
                  control={control}
                  loading={isPending}
                  addName={'Warehouse'}
                  onChange={(res) => handleProductDetails(index, res?.value as string)}
                />
              </Box>
              <TableBody>
                <DeleteFieldButton control={control} name={FIELDNAME} onClick={() => remove(index)} />
              </TableBody>
            </Stack>
            <StockOutWardBSRB
              name={FIELDNAME}
              key={field.id}
              nestedIndex={index}
              setValue={setValue}
              watch={watch}
              control={control}
              defaultValues={defaultValues}
            />
          </React.Fragment>
        ))}
        <FormHelperText error={true}>* Total Must Equal to {defaultValues?.outwardQuantity} Quantity</FormHelperText>
        <FormFooter
          leftButton={true}
          dividerRemove={false}
          type="button"
          gridProps={{
            mb: 0,
            md: 1,
          }}
          disabled={!isValid}
          // sx={{ minWidth: 80 }}
          addMoreButton={[
            {
              label: 'Cancel',
              type: 'button',
              variant: 'outlined',
              onClick: () => handleClose(),
            },
          ]}
          onClick={handleSubmit(handleFormSumbit)}
        />
      </Paper>
    </Dialog>
  );
};

export default StockOutQtySplitPopoup;
