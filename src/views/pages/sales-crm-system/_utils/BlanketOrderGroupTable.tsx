/* eslint-disable max-lines */
import _ from 'lodash';
import React, { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Grid, Chip, Button, TableRow, TableBody, FormHelperText } from '@mui/material';

import { IconWrapper } from 'theme/svg';

import { floatValue } from 'helper/FormatHelper';
import { DynamicTablesNameType } from 'helper/types/GlobalTypes';
import { setValueConfig, PROJECT_CONSTANTS } from 'helper/GlobalHelper';
import { BreakUpItems, BlanketOrderItem } from 'helper/types/sales-crm-system/BlanketOrderTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';
import { useQuotationBreakUp } from 'store/hooks/SalesCrmSystemHook';

import MoreVertField from 'views/components/form-components/MoreVertField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import { TableItem, TableHeader, TableWrapper } from 'views/components/table-componet/form-table';
import ProductGroup from 'views/components/form-components/group-field/product-group/ProductGroup';

import { checkStock } from './CheckStock';

type Props = {
  FIELDNAME: DynamicTablesNameType;
};

const FIELDINYIALVALUE: BlanketOrderItem = {
  discount: 0,
  productId: null,
  quantity: 0,
  sku: '',
  month: null,
  deliverySlot: 0,
  frequency: 0,
  tax: 0,
  total: 0,
  UOM: null,
  monthWiseQuantity: 0,
  rate: 0,
  breakUps: [],
};

type BlanketType = {
  [key: string]: BlanketOrderItem[];
};

const BlanketOrderGroupTable = ({ FIELDNAME }: Props) => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<BlanketType>();
  const addEditable = FIELDNAME === 'quotationItems' && !watch('approvePage');
  const showAbleQty = FIELDNAME !== 'salesInvoiceItems';
  const { fields, append, remove } = useFieldArray({
    name: FIELDNAME,
    control,
  });
  const { data: options } = useEssentialList({
    params: {
      include: ['months'],
    },
  });
  const { mutateAsync: setBreakUp } = useQuotationBreakUp();
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
      setValue(`${FIELDNAME}.${index}.total`, floatValue(`${total}`, 2) as never, { shouldValidate: true });
    },
    [FIELDNAME, setValue, watch]
  );
  const handleSubTotal = useCallback(
    (index: number, value?: string | number) => {
      const rate = floatValue(`${watch(`${FIELDNAME}.${index}.rate`) || '0'}` || '0');
      const quantity = Number(value || `${watch(`${FIELDNAME}.${index}.quantity` || '1')}` || '1');
      const subTotal = (rate as number) * quantity;
      setValue(`${FIELDNAME}.${index}.subTotal`, subTotal as never, setValueConfig) as never;
      const tax = floatValue(`${watch(`${FIELDNAME}.${index}.tax`)}` || '0');
      handleTotal(index, tax);
    },
    [FIELDNAME, handleTotal, setValue, watch]
  );
  const handleAddBreakup = useCallback(
    async (index: number) => {
      const { frequency, deliverySlot, month, quantity } = watch(`${FIELDNAME}.${index}`);
      if (frequency && deliverySlot && month && quantity)
        setBreakUp(
          { frequency, deliverySlot, month, quantity },
          {
            onSuccess: (res) => {
              setValue(`${FIELDNAME}.${index}.monthWiseQuantity`, res?.monthWiseQuantity);
              setValue(`${FIELDNAME}.${index}.breakUps`, res.breakUps);
            },
          }
        );
    },
    [FIELDNAME, setBreakUp, setValue, watch]
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
                { id: 'month', label: 'Month' },
                { id: 'frequency', label: 'Frequency' },
                { id: 'delQty', label: 'Delivery Slot' },
                { id: 'qty', label: 'Quantity' },
                { id: 'monthQty', label: 'Month Wise Quantity' },
                ...(showAbleQty
                  ? [
                      { id: 'saqty', label: 'Total Available Quantity' },
                      { id: 'stockStatus', label: 'Stock Status' },
                    ]
                  : []),
                { id: 'uom', label: 'UOM' },
                { id: 'rate', label: 'Rate' },
                { id: 'subTotal', label: 'Sub Total' },
                { id: 'discount', label: 'Discount' },
                { id: 'tax', label: 'Tax' },
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
                  <TableItem width={150}>
                    <AsyncSelectField
                      name={`${FIELDNAME}.${index}.month`}
                      control={control}
                      options={options?.months}
                      addName="months"
                      textFieldProps={{
                        placeholder: 'Select',
                      }}
                      onChange={() => handleAddBreakup(index)}
                    />
                  </TableItem>
                  <TableItem width={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.frequency`}
                      onChange={() => handleAddBreakup(index)}
                      control={control}
                      toFixed={0}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                      }}
                    />
                  </TableItem>
                  <TableItem width={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.deliverySlot`}
                      onChange={() => handleAddBreakup(index)}
                      control={control}
                      toFixed={0}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                      }}
                    />
                  </TableItem>
                  <TableItem width={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.quantity`}
                      onChange={(value) => {
                        handleSubTotal(index, value);
                        handleAddBreakup(index);
                        handleRemoveError(index);
                      }}
                      control={control}
                      toFixed={0}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                      }}
                    />
                  </TableItem>
                  <TableItem width={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.monthWiseQuantity`}
                      control={control}
                      toFixed={0}
                      fieldProps={{
                        placeholder: 'Monthly Quantity',
                        InputProps: {
                          readOnly: true,
                        },
                      }}
                      onChange={() => handleAddBreakup(index)}
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
                            placeholder: 'AVL QTY',
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
                      name={`${FIELDNAME}.${index}.discount`}
                      control={control}
                      toFixed={0}
                      onChange={() => handleTotal(index)}
                      max={100}
                      fieldProps={{
                        placeholder: 'Discount',
                        InputProps: {
                          endAdornment: PercentsignComponent,
                        },
                      }}
                    />
                  </TableItem>
                  <TableItem minWidth={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.tax`}
                      control={control}
                      toFixed={0}
                      max={100}
                      onChange={(value) => handleTotal(index, value)}
                      fieldProps={{
                        placeholder: 'Tax',
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
                  <TableItem width={20}>
                    <MoreVertField
                      name={FIELDNAME}
                      control={control as never}
                      id={row?._id}
                      menuItem={[
                        {
                          label: 'Delete',
                          action: 'fieldDelete',
                          menuItemProps: {
                            onClick: () => remove(index),
                            disabled: !addEditable,
                          },
                        },
                        {
                          label: 'Add Breakup',
                          action: 'popup',
                          name: 'AddBreakUpPopup',
                          menuItemProps: {
                            disabled: !addEditable,
                          },
                        },
                      ]}
                      popupProps={[
                        {
                          name: 'AddBreakUpPopup',
                          defaultValue: {
                            breakUps: watch(`${FIELDNAME}.${index}.breakUps`),
                            maximumQuantity: watch(`${FIELDNAME}.${index}.quantity`),
                            // ...watch(`stockOutwardItems.${index}`),
                            // quantity: watch(`stockOutwardItems`)?.reduce((pre, singleArray) => pre + (singleArray?.withdrawQuantity || 0), 0),
                            // productQtySplit: watch(`stockOutwardItems.${index}`).outwardDetails,
                          },
                          handleSumbit: (res) => {
                            setValue(`${FIELDNAME}.${index}.breakUps`, res.breakUps as BreakUpItems[]);
                          },
                        },
                      ]}
                    />
                  </TableItem>
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
};

export default BlanketOrderGroupTable;
