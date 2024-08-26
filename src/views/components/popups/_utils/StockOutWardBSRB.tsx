import _ from 'lodash';
import { Control, UseFormWatch, useFieldArray, UseFormSetValue } from 'react-hook-form';

import { TableRow, TableBody } from '@mui/material';

import { FormSplit } from 'helper/types/inventory-management/StockOutwardType';

import NumberInputField from 'views/components/form-components/NumberInputField';
import { BSRBRow, BSRBGroup } from 'views/components/form-components/group-field/bsrb-group';
import { TableItem, TableHeader, TableWrapper } from 'views/components/table-componet/form-table';

const StockOutWardBSRB = ({
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
}) => {
  const NestedName: `productQtySplit.${number}.warehouseIdData` = `${name}.${nestedIndex}.warehouseIdData`;
  const { fields } = useFieldArray({
    name: NestedName,
    control,
  });
  const handleAvialableDrawQty = (index: number, e?: number) => {
    setValue(`${NestedName}.${index}.withdrawQuantity`, (watch(NestedName)?.[index]?.maximumQuantity as never) - (e ?? 0));
    const WareHouseQty = watch(NestedName)?.reduce((total, data) => {
      return parseFloat(`${data?.withdrawQuantity}` || '0') + total;
    }, 0);
    setValue(`${name}.${nestedIndex}.warehouseIdQuantity`, WareHouseQty || 0);
  };
  const handleWithDrawQty = (index: number, e?: number) => {
    const val = (watch(NestedName)?.[index]?.maximumQuantity as never) - (e ?? 0);
    setValue(`${NestedName}.${index}.availableQuantity`, val < 0 ? 0 : val);
    const WareHouseQuantity = watch(NestedName)?.reduce((total, data) => {
      return parseFloat(`${data?.withdrawQuantity}` || '0') + total;
    }, 0);
    setValue(`${name}.${nestedIndex}.warehouseIdQuantity`, WareHouseQuantity ?? 0);
  };
  return (
    fields?.length > 0 && (
      <TableWrapper
        scrollSx={{
          overflow: 'auto',
          minHeight: '10rem',
          maxHeight: 'calc(80vh - 220px)',
        }}
        stickyHeader
      >
        <TableHeader
          headLabel={[...BSRBRow, { id: 'available_qty', label: 'Available Quantity' }, { id: 'with_draw_qty', label: 'WithDraw Quantity' }]}
        />
        <TableBody>
          {_.map(fields, (row, index) => (
            <TableRow key={row.id}>
              <BSRBGroup
                key={`productQtySplit-${index}`}
                watch={watch}
                control={control}
                setValue={setValue}
                enabled={false}
                bayName={`${NestedName}.${index}.bayId`}
                binName={`${NestedName}.${index}.binId`}
                rackName={`${NestedName}.${index}.rackId`}
                shelveName={`${NestedName}.${index}.shelvesId`}
                wholeProps={{
                  fieldProps: {
                    fieldProps: {
                      readOnly: true,
                    },
                  },
                  tableProps: {
                    minWidth: 180,
                  },
                }}
              />
              <TableItem minWidth={100}>
                <NumberInputField
                  name={`${NestedName}.${index}.availableQuantity`}
                  control={control}
                  fieldProps={{
                    placeholder: 'Enter QTY',
                    InputProps: {
                      readOnly: true,
                    },
                  }}
                  inputButton
                  min={0}
                  max={defaultValues?.productQtySplit?.[nestedIndex]?.warehouseIdData?.[index]?.maximumQuantity}
                  onChange={(e) => handleAvialableDrawQty(index, e as number)}
                />
              </TableItem>
              <TableItem minWidth={100}>
                <NumberInputField
                  name={`${NestedName}.${index}.withdrawQuantity`}
                  control={control}
                  toFixed={0}
                  // max={defaultValues?.productQtySplit?.[index]?.maximumQuantity}
                  fieldProps={{
                    placeholder: 'Enter QTY',
                  }}
                  onChange={(e) => handleWithDrawQty(index, e as number)}
                />
              </TableItem>
            </TableRow>
          ))}
        </TableBody>
      </TableWrapper>
    )
  );
};
export default StockOutWardBSRB;
