import _ from 'lodash';
import { useCallback } from 'react';
import { Control, UseFormWatch, useFieldArray, UseFormSetValue } from 'react-hook-form';

import { Stack, Button, TableRow, TableBody, Typography } from '@mui/material';

import { setValueConfig } from 'helper/GlobalHelper';
import { FormSplit } from 'helper/types/inventory-management/StockOutwardType';
import { ProductQtySplit } from 'helper/types/inventory-management/StockInwardType';

import DummyField from 'views/components/form-components/DummyField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import DeleteFieldButton from 'views/components/form-components/DeleteFieldButton';
import { BSRBRow, BSRBGroup } from 'views/components/form-components/group-field/bsrb-group';
import { TableItem, TableHeader, TableWrapper } from 'views/components/table-componet/form-table';

const InitialFieldArray: ProductQtySplit = {
  bayId: null,
  rackId: null,
  shelvesId: null,
  binId: null,
  availableQuantity: 0,
  addQuantity: 0,
};
function StockInWardBSRB({
  control,
  name,
  setValue,
  defaultValues,
  watch,
  nestedIndex,
}: {
  nestedIndex: number;
  name: 'productQtySplit';
  control: Control<FormSplit>;
  setValue: UseFormSetValue<FormSplit>;
  defaultValues?: FormSplit;
  watch: UseFormWatch<FormSplit>;
}) {
  const NestedName: `productQtySplit.${number}.warehouseIdData` = `${name}.${nestedIndex}.warehouseIdData`;
  const NestedIndex: `productQtySplit.${number}` = `${name}.${nestedIndex}`;
  const NewstedValue = watch(NestedIndex);
  const { fields, append, remove } = useFieldArray({
    name: NestedName,
    control,
  });
  const handleWarehouseTotalQty = useCallback(() => {
    const totalWarehouseTotal = _.reduce(
      watch(NestedName),
      (total, { addQuantity }) => {
        return parseFloat(`${addQuantity || 0}`) + total;
      },
      0
    );
    setValue(`${NestedIndex}.warehouseIdQuantity`, totalWarehouseTotal ?? 0);
    const totalWarehouseIdTotal = _.reduce(
      watch(name),
      (total, data) => {
        return parseFloat(`${data?.warehouseIdQuantity}` || '0') + total;
      },
      0
    );
    setValue(`tempQuantity`, (defaultValues?.quantity ?? 0) - (totalWarehouseIdTotal ?? 0), setValueConfig);
  }, [NestedIndex, NestedName, name, defaultValues?.quantity, setValue, watch]);

  return (
    <>
      {fields.length > 0 && (
        <TableWrapper
          scrollSx={{
            overflow: 'auto',
            minHeight: '10rem',
            maxHeight: 'calc(60vh - 220px)',
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
                  bayName={`${NestedName}.${index}.bayId`}
                  binName={`${NestedName}.${index}.binId`}
                  rackName={`${NestedName}.${index}.rackId`}
                  shelveName={`${NestedName}.${index}.shelvesId`}
                  wholeProps={{
                    fieldProps: {
                      fieldProps: {
                        readOnly: watch(`${NestedName}.${index}`).status,
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
                    name={`${NestedName}.${index}.availableQuantity`}
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
                    name={`${NestedName}.${index}.addQuantity`}
                    control={control}
                    fieldProps={{
                      placeholder: 'Enter QTY',
                    }}
                    toFixed={0}
                    // onBlur={handleTotalQty}
                    onChange={handleWarehouseTotalQty}
                    // max={defaultValues.}
                  />
                </TableItem>
                <TableItem minWidth={20}>
                  {!watch(`${NestedName}.${index}`).status && (
                    <DeleteFieldButton
                      key={NestedName + row.id}
                      name={NestedName}
                      control={control}
                      _id={row?._id}
                      onClick={() => {
                        remove(index);
                        handleWarehouseTotalQty();
                      }}
                    />
                  )}
                </TableItem>
              </TableRow>
            ))}
          </TableBody>
        </TableWrapper>
      )}
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Button
          variant="outlined"
          onClick={() => append(InitialFieldArray)}
          disabled={!watch(`${name}.${nestedIndex}`).warehouseId?.value}
          sx={{
            mt: 2,
          }}
        >
          Add Row
        </Button>
        <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
          <Typography variant="subtitle1" color={'lightgrey'}>
            Total {NewstedValue.warehouseId?.label ?? ''} Quantity
          </Typography>
          <DummyField
            // errorMessage={errors?.quantity?.message}
            value={NewstedValue.warehouseIdQuantity}
            sx={{
              minWidth: 160,
              display: 'flex',
              flexDirection: 'column',
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default StockInWardBSRB;
