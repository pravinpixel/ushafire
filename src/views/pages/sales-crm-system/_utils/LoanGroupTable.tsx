import _ from 'lodash';
import React, { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Grid, Chip, Button, TableRow, TableBody, FormHelperText } from '@mui/material';

import { IconWrapper } from 'theme/svg';

import { floatValue } from 'helper/FormatHelper';
import { DynamicTablesNameType } from 'helper/types/GlobalTypes';
import { LoanItem } from 'helper/types/sales-crm-system/LoansTypes';
import { setValueConfig, PROJECT_CONSTANTS } from 'helper/GlobalHelper';

import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import DeleteFieldButton from 'views/components/form-components/DeleteFieldButton';
import { TableItem, TableHeader, TableWrapper } from 'views/components/table-componet/form-table';
import ProductGroup from 'views/components/form-components/group-field/product-group/ProductGroup';

import { checkStock } from './CheckStock';

type Props = {
  FIELDNAME: DynamicTablesNameType;
  addEditable?: boolean;
};
const FIELDINYIALVALUE: LoanItem = { productId: null, quantity: 0, sku: '', total: 0 };

type LoanType = {
  [key: string]: LoanItem[];
};
function LoanGroupTable({ FIELDNAME }: Props) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<LoanType>();
  const addEditable = FIELDNAME === 'quotationItems' && !watch('approvePage');
  const showAbleQty = FIELDNAME !== 'salesInvoiceItems';
  const { fields, append, remove } = useFieldArray({
    name: FIELDNAME,
    control,
  });
  const priceComponents = <IconWrapper py={0}>{PROJECT_CONSTANTS.DOLLER}</IconWrapper>;
  const PercentsignComponent = <IconWrapper>{PROJECT_CONSTANTS.Percentsign}</IconWrapper>;
  const handleRemoveError = (index: number) => setValue(`${FIELDNAME}.${index}.stockStatus`, 'In Stock', { shouldValidate: true });
  function percentage(partialValue: number = 0, totalValue: number = 0) {
    const partialNumber = parseFloat(`${partialValue}`);
    const totalNumber = parseFloat(`${totalValue}`);
    if (partialNumber > 0 && totalNumber > 0) {
      return (partialNumber / 100) * totalNumber;
    }
    return 0;
  }
  const handleTotal = useCallback(
    (index: number, tax: string | number = 0) => {
      const subTotal = floatValue(`${watch(`${FIELDNAME}.${index}.subTotal`)}` || '0');
      const discount = floatValue(`${watch(`${FIELDNAME}.${index}.discount`)}` || '0');
      const taxNumber = floatValue(`${tax ? tax : watch(`${FIELDNAME}.${index}.tax`)}` || '0');

      const discountPrice = discount ? percentage(discount as number, subTotal as number) : 0;
      const discountTotal = (subTotal as number) - discountPrice;
      const taxPercentage = taxNumber ? percentage(taxNumber as number, discountTotal) : 0;
      const total = discountTotal + taxPercentage;
      setValue(`${FIELDNAME}.${index}.total`, floatValue(`${total}`, 2) as never, setValueConfig);
    },
    [FIELDNAME, setValue, watch]
  );
  const handleSubTotal = useCallback(
    (index: number, value?: string | number) => {
      const rate = floatValue(`${watch(`${FIELDNAME}.${index}.rate`) || '0'}` || '0');
      const quantity = Number(value || `${watch(`${FIELDNAME}.${index}.quantity` || '1')}` || '1');
      const subTotal = (rate as number) * quantity;
      setValue(`${FIELDNAME}.${index}.subTotal`, subTotal as number, setValueConfig) as never;
      const tax = floatValue(`${watch(`${FIELDNAME}.${index}.tax`)}` || '0');
      handleTotal(index, tax);
    },
    [FIELDNAME, handleTotal, setValue, watch]
  );
  return (
    <React.Fragment>
      <Grid item xs={12} mt={2}>
        {fields.length > 0 && (
          <TableWrapper>
            <TableHeader
              headLabel={[
                { id: 'product_id', label: 'Product Name' },
                { id: 'sku', label: 'SKU' },
                { id: 'qty', label: 'Quantity' },
                ...(showAbleQty
                  ? [
                      { id: 'saqty', label: 'Total Available Quantity' },
                      { id: 'stockStatus', label: 'Stock Status' },
                    ]
                  : []),
                { id: 'uom', label: 'UOM' },
                { id: 'rate', label: 'Rate' },
                { id: 'subTotal', label: 'Sub Total' },
                { id: 'commission', label: 'Commission' },
                { id: 'totalPrice', label: 'Total Price' },
                ...(addEditable ? [{ id: '', label: '' }] : []),
              ]}
            />
            <TableBody>
              {_.map(fields, (row, index) => (
                <TableRow key={row.id}>
                  <ProductGroup
                    key={`${FIELDNAME}-${row.id}`}
                    productName={`${FIELDNAME}.${index}.productId`}
                    skuName={`${FIELDNAME}.${index}.sku`}
                    setOption={[
                      {
                        name: `${FIELDNAME}.${index}.categoryId`,
                        value: 'productCategory',
                        defaultValue: '',
                      },
                      {
                        name: `${FIELDNAME}.${index}.subCategoryId`,
                        value: 'productSubCategory',
                        defaultValue: '',
                      },
                      {
                        name: `${FIELDNAME}.${index}.brandId`,
                        value: 'brand',
                        defaultValue: '',
                      },
                      {
                        name: `${FIELDNAME}.${index}.UOM`,
                        value: 'UOM',
                        defaultValue: '',
                      },
                      {
                        name: `${FIELDNAME}.${index}.availableQuantity`,
                        value: 'quantityInStock',
                        defaultValue: '',
                      },
                    ]}
                    onChange={() => handleRemoveError(index)}
                  />
                  <TableItem width={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.quantity`}
                      onChange={(value) => {
                        handleRemoveError(index);
                        handleSubTotal(index, value);
                      }}
                      control={control}
                      toFixed={0}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                      }}
                    />
                  </TableItem>
                  {showAbleQty && (
                    <>
                      <TableItem minWidth={110}>
                        <NumberInputField
                          name={`${FIELDNAME}.${index}.availableQuantity`}
                          control={control}
                          toFixed={0}
                          fieldProps={{
                            placeholder: 'Enter QTY',
                            InputProps: {
                              readOnly: true,
                            },
                          }}
                        />
                      </TableItem>
                      {/* Common For All Quotation */}
                      <TableItem minWidth={110}>
                        <Chip
                          size="small"
                          label={
                            checkStock(watch(`${FIELDNAME}.${index}`).availableQuantity as never, watch(`${FIELDNAME}.${index}`).quantity as never)
                              .label
                          }
                          color={
                            checkStock(watch(`${FIELDNAME}.${index}`).availableQuantity as never, watch(`${FIELDNAME}.${index}`).quantity as never)
                              .color
                          }
                        />
                        {errors?.[FIELDNAME]?.[index]?.stockStatus?.message && (
                          <FormHelperText error>{errors?.[FIELDNAME]?.[index]?.stockStatus?.message}</FormHelperText>
                        )}
                      </TableItem>
                    </>
                  )}
                  <TableItem minWidth={110}>
                    <AsyncSelectField
                      name={`${FIELDNAME}.${index}.UOM`}
                      control={control}
                      fieldProps={{
                        readOnly: true,
                      }}
                      addName="Uom"
                    />
                  </TableItem>
                  <TableItem minWidth={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.rate`}
                      control={control}
                      toFixed={2}
                      fieldProps={{
                        placeholder: 'Enter Rate',
                      }}
                      onChange={() => handleSubTotal(index)}
                    />
                  </TableItem>
                  <TableItem minWidth={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.subTotal`}
                      control={control}
                      toFixed={2}
                      fieldProps={{
                        placeholder: 'Enter Sub Total',
                        InputProps: {
                          readOnly: true,
                          startAdornment: priceComponents,
                        },
                      }}
                    />
                  </TableItem>
                  <TableItem minWidth={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.commission`}
                      control={control}
                      toFixed={0}
                      onChange={() => handleTotal(index)}
                      max={100}
                      fieldProps={{
                        placeholder: 'Commision',
                        InputProps: {
                          endAdornment: PercentsignComponent,
                        },
                      }}
                    />
                  </TableItem>
                  <TableItem minWidth={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.total`}
                      control={control}
                      toFixed={0}
                      fieldProps={{
                        placeholder: 'Total',
                        InputProps: {
                          readOnly: true,
                          startAdornment: priceComponents,
                        },
                      }}
                    />
                  </TableItem>
                  {addEditable && (
                    <TableItem width={50}>
                      <DeleteFieldButton name={FIELDNAME} _id={row?._id} control={control} onClick={() => remove(index)} />
                    </TableItem>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </TableWrapper>
        )}
      </Grid>
      <Grid item xs={3}>
        {addEditable && (
          <Button variant="outlined" onClick={() => append(FIELDINYIALVALUE)}>
            Add Row
          </Button>
        )}
      </Grid>
    </React.Fragment>
  );
}

export default LoanGroupTable;
