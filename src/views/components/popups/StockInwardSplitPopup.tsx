import _ from 'lodash';
import React, { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, useFieldArray, SubmitHandler } from 'react-hook-form';

import { Box, Paper, Stack, Dialog, TableBody, Typography, IconButton, FormHelperText } from '@mui/material';

import { PlusIcon } from 'theme/svg';
import { formPaper } from 'theme/css';

import { notify } from 'helper/GlobalHelper';
import { PopupNames } from 'helper/types/GlobalTypes';
import { stockInwardSplitQuantitySchema } from 'helper/ValidationSchema';
import { FormSplit } from 'helper/types/inventory-management/StockOutwardType';
import { ProductQtySplit } from 'helper/types/inventory-management/StockInwardType';

import { useEssentialList } from 'store/hooks/EssentialHooks';
import { useWarehouseProductBRSBDetails } from 'store/hooks/InventoryManagementHook';

import FormFooter from '../ui-componet/FormFooter';
import DummyField from '../form-components/DummyField';
import StockInWardBSRB from './_utils/StockInWardBSRB';
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

// type FormSplit = {
//   quantity: number;
//   productQtySplit: ProductQtySplit[];
//   productQtySplit_deleted_ids: string[];
//   tempQuanity?: number;
//   warehouseId?: string;
// };

const InitialFieldArray: ProductQtySplit = {
  bayId: null,
  rackId: null,
  shelvesId: null,
  binId: null,
  availableQuantity: 0,
  addQuantity: 0,
};

const InitalValue: FormSplit = {
  quantity: 0,
  productQtySplit: [
    {
      warehouseId: null,
      warehouseIdData: [{ ...InitialFieldArray }],
      warehouseIdQuantity: 0,
    },
  ],
};
const FIELDNAME = 'productQtySplit';
const EssentialNeed: EssentialType[] = ['WarehouseLocation'];
const StockInwardSplitPopup = ({ handleClose, open, name, modelName, defaultValues, handleDataSumbit }: Props) => {
  const { data: options, isLoading } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSplit>({
    defaultValues: defaultValues ?? InitalValue,
    resolver: yupResolver(stockInwardSplitQuantitySchema) as unknown as Resolver<FormSplit>,
    mode: 'all',
  });
  const { fields, remove, append } = useFieldArray({
    name: 'productQtySplit',
    control,
  });

  const quantity = watch('tempQuantity') || null;
  const showQuantity = quantity && quantity > 0 ? quantity : 0;

  const handleFormSumbit: SubmitHandler<FormSplit> = useCallback(
    (data) => {
      handleDataSumbit(data);
    },
    [handleDataSumbit]
  );
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

  return (
    <Dialog onClose={handleClose} fullWidth maxWidth="lg" aria-labelledby="customized-dialog-title" open={name ? name === modelName && open : open}>
      <Paper
        sx={{
          ...formPaper,
        }}
      >
        <Stack justifyContent={'space-between'} alignItems={'center'} direction={{ xs: 'column', md: 'row' }}>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <Typography variant="h6">Update Quantity</Typography>
            <IconButton onClick={() => append({ warehouseId: null, warehouseIdData: [], warehouseIdQuantity: 0 })}>
              <PlusIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
            <Typography
              variant="subtitle1"
              color={'lightgrey'}
              sx={{
                mb: errors?.tempQuantity?.message && 2.5,
              }}
            >
              Balance Quantity
            </Typography>
            <DummyField
              errorMessage={errors?.tempQuantity?.message}
              value={showQuantity}
              sx={{
                minWidth: 160,
                display: 'flex',
                flexDirection: 'column',
              }}
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
                  options={options?.WarehouseLocation}
                  control={control}
                  loading={isPending || isLoading}
                  addName={'WarehouseLocation'}
                  onChange={(res) => handleProductDetails(index, res?.value as string)}
                />
              </Box>
              <TableBody>
                <DeleteFieldButton control={control} name={FIELDNAME} onClick={() => remove(index)} />
              </TableBody>
            </Stack>
            <StockInWardBSRB
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
        <FormHelperText error={true}>* Total Must Equal to {defaultValues?.quantity} Quantity</FormHelperText>
        <FormFooter
          leftButton={true}
          dividerRemove={false}
          type="button"
          gridProps={{
            mb: 0,
            md: 1,
          }}
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

export default StockInwardSplitPopup;
