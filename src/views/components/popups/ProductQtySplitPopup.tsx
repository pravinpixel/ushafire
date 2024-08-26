import { useEffect, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, useFieldArray, SubmitHandler } from 'react-hook-form';

import { Paper, Stack, Dialog, Button, TableRow, TableBody, Typography } from '@mui/material';

import { formPaper } from 'theme/css';

import { setValueConfig } from 'helper/GlobalHelper';
import { PopupNames } from 'helper/types/GlobalTypes';
import { stockInwardUpdateQuantitySchema } from 'helper/ValidationSchema';
import { ProductQtySplit } from 'helper/types/inventory-management/StockInwardType';

import FormFooter from '../ui-componet/FormFooter';
import DummyField from '../form-components/DummyField';
import NumberInputField from '../form-components/NumberInputField';
import DeleteFieldButton from '../form-components/DeleteFieldButton';
import { BSRBRow, BSRBGroup } from '../form-components/group-field/bsrb-group';
import { TableItem, TableHeader, TableWrapper } from '../table-componet/form-table';

type Props = {
  name?: PopupNames;
  handleClose: () => void;
  open: boolean;
  modelName?: PopupNames;
  defaultValues?: FormSplit;
  handleDataSumbit: (res: FormSplit) => void;
};

type FormSplit = {
  quantity: number;
  productQtySplit: ProductQtySplit[];
  productQtySplit_deleted_ids: string[];
  tempQuanity?: number;
  warehouseId?: string;
};

const InitialFieldArray: ProductQtySplit = {
  bayId: null,
  rackId: null,
  shelvesId: null,
  binId: null,
  availableQuantity: 0,
  addQuantity: 0,
};

const InitalValue = {
  quantity: 0,
  productQtySplit: [{ ...InitialFieldArray }],
};

const ProductQtySplitPopoup = ({ handleClose, open, name, modelName, defaultValues, handleDataSumbit }: Props) => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSplit>({
    defaultValues: defaultValues ?? InitalValue,
    resolver: yupResolver(stockInwardUpdateQuantitySchema) as unknown as Resolver<FormSplit>,
    mode: 'all',
  });
  const { fields, remove, append } = useFieldArray({
    name: 'productQtySplit',
    control,
  });
  const quantity = watch('quantity') || null;
  const showQuantity = quantity && quantity > 0 ? quantity : 0;

  const handleFormSumbit: SubmitHandler<FormSplit> = useCallback(
    (data) => {
      handleDataSumbit(data);
    },
    [handleDataSumbit]
  );
  const handleTotalQty = useCallback(() => {
    const QuantityCount = watch('productQtySplit').reduce((total, data) => {
      return parseFloat(`${data?.addQuantity || 0}`) + total;
    }, 0);
    const InwardQty = parseFloat(`${defaultValues?.quantity}` ?? '0') - QuantityCount;
    setValue('quantity', InwardQty, setValueConfig);
  }, [defaultValues?.quantity, setValue, watch]);

  const handleRemove = useCallback(
    (index: number) => {
      remove(index);
      handleTotalQty();
    },
    [handleTotalQty, remove]
  );

  useEffect(() => {
    handleTotalQty();
  }, [handleTotalQty]);

  return (
    <Dialog onClose={handleClose} fullWidth maxWidth="lg" aria-labelledby="customized-dialog-title" open={name ? name === modelName && open : open}>
      <Paper
        sx={{
          ...formPaper,
        }}
      >
        <Stack justifyContent={'space-between'} alignItems={'center'} direction={{ xs: 'column', md: 'row' }}>
          <Typography variant="h6">Update Quantity</Typography>
          <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
            <Typography
              variant="subtitle1"
              color={'lightgrey'}
              sx={{
                mb: errors?.quantity?.message && 2.5,
              }}
            >
              Total Inward Quantity
            </Typography>
            <DummyField
              errorMessage={errors?.quantity?.message}
              value={showQuantity}
              sx={{
                minWidth: 160,
                display: 'flex',
                flexDirection: 'column',
              }}
            />
          </Stack>
        </Stack>
        {fields.length > 0 && (
          <TableWrapper
            scrollSx={{
              overflow: 'auto',
              minHeight: '20rem',
              maxHeight: 'calc(80vh - 220px)',
            }}
            stickyHeader
          >
            <TableHeader
              headLabel={[
                ...BSRBRow,
                { id: 'available_qty', label: 'Available Quantity' },
                { id: 'add_qty', label: 'Add Quantity' },
                { id: '', label: '' },
              ]}
            />
            <TableBody>
              {fields.map((row, index) => (
                <TableRow key={row.id}>
                  <BSRBGroup
                    key={`productQtySplit-${row.id}`}
                    watch={watch}
                    control={control}
                    setValue={setValue}
                    bayName={`productQtySplit.${index}.bayId`}
                    binName={`productQtySplit.${index}.binId`}
                    rackName={`productQtySplit.${index}.rackId`}
                    shelveName={`productQtySplit.${index}.shelvesId`}
                    wholeProps={{
                      fieldProps: {
                        fieldProps: {
                          readOnly: watch(`productQtySplit.${index}`).status,
                        },
                      },
                    }}
                    // emptyBin={{
                    //   showEmptyBin: true,
                    //   wareHouseId: defaultValues?.warehouseId,
                    // }}
                  />
                  <TableItem>
                    <NumberInputField
                      name={`productQtySplit.${index}.availableQuantity`}
                      control={control}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                        InputProps: {
                          readOnly: true,
                        },
                      }}
                    />
                  </TableItem>
                  <TableItem>
                    <NumberInputField
                      name={`productQtySplit.${index}.addQuantity`}
                      control={control}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                      }}
                      toFixed={0}
                      // onBlur={handleTotalQty}
                      onChange={handleTotalQty}
                      // max={defaultValues.}
                    />
                  </TableItem>
                  <TableItem minWidth={20}>
                    {!watch(`productQtySplit.${index}`).status && (
                      <DeleteFieldButton
                        key={'productQtySplit' + row.id}
                        name={'productQtySplit'}
                        control={control}
                        _id={row?._id}
                        onClick={() => handleRemove(index)}
                      />
                    )}
                  </TableItem>
                </TableRow>
              ))}
            </TableBody>
          </TableWrapper>
        )}
        <Button
          variant="outlined"
          onClick={() =>
            append({
              ...InitialFieldArray,
            })
          }
          sx={{
            mt: 2,
          }}
        >
          Add Row
        </Button>
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

export default ProductQtySplitPopoup;
