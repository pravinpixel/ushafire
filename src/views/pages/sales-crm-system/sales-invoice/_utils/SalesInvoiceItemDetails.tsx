import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Grid, Stack, Button, TableRow, TableBody, Typography } from '@mui/material';

import { floatValue } from 'helper/FormatHelper';
import { setValueConfig } from 'helper/GlobalHelper';
import { PercentsignComponent } from 'helper/AllComponents';
import { SalesInvoiceFormType } from 'helper/types/sales-crm-system/SalesInvoiceTypes';

import NumberInputField from 'views/components/form-components/NumberInputField';
import DeleteFieldButton from 'views/components/form-components/DeleteFieldButton';
import { TableItem, TableHeader, TableWrapper } from 'views/components/table-componet/form-table';
import ProductGroup from 'views/components/form-components/group-field/product-group/ProductGroup';

const FIELDINYIALVALUE = { brandId: null, categoryId: null, productId: null, quantity: 0, sku: '', subCategoryId: null };
const FIELDNAME = 'salesInvoiceItems';
const TotalCompoent = ({ title, value }: { title: string; value: string }) => {
  return (
    <Stack spacing={2} direction={'row'}>
      <Typography width={'120%'}>{title}:</Typography>
      <Typography textAlign={'start'}>{value}</Typography>
    </Stack>
  );
};

const SalesInvoiceItemDetails = () => {
  const { control, watch, setValue } = useFormContext<SalesInvoiceFormType>();
  const { fields, remove, append } = useFieldArray({
    name: FIELDNAME,
    control,
  });
  const handleSubTotal = (index: number, value?: string | number) => {
    const rate = floatValue(`${watch(`${FIELDNAME}.${index}.rate`) || '0'}` || '0');
    const quantity = Number(value || `${watch(`${FIELDNAME}.${index}.quantity` || '1')}` || '1');
    const subTotal = (rate as number) * quantity;
    setValue(`${FIELDNAME}.${index}.subTotal`, subTotal as number, setValueConfig);
    const tax = floatValue(`${watch(`${FIELDNAME}.${index}.tax`)}` || '0');
    handleTotal(index, tax);
  };

  function percentage(partialValue: number = 0, totalValue: number = 0) {
    const partialNumber = parseFloat(`${partialValue}`);
    const totalNumber = parseFloat(`${totalValue}`);
    if (partialNumber > 0 && totalNumber > 0) {
      return (partialNumber / 100) * totalNumber;
    }
    return 0;
  }

  const handleTotal = (index: number, tax: string | number = 0) => {
    const subTotal = floatValue(`${watch(`${FIELDNAME}.${index}.subTotal`)}` || '0');
    const discount = floatValue(`${watch(`${FIELDNAME}.${index}.discount`)}` || '0');
    const taxNumber = floatValue(`${tax ? tax : watch(`${FIELDNAME}.${index}.tax`)}` || '0');

    const discountPrice = discount ? percentage(discount as number, subTotal as number) : 0;
    const discountTotal = (subTotal as number) - discountPrice;
    const taxPercentage = taxNumber ? percentage(taxNumber as number, discountTotal) : 0;
    const total = discountTotal + taxPercentage;
    setValue(`${FIELDNAME}.${index}.total`, floatValue(`${total}`, 2) as never, setValueConfig);
  };

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
                { id: 'rate', label: 'Rate' },
                { id: 'sub-total', label: 'Sub Total' },
                { id: 'discount', label: 'Discount %' },
                { id: 'tax', label: 'Tax %' },
                { id: 'totalPrice', label: 'Total Price' },
                { id: '', label: '' },
              ]}
            />
            <TableBody>
              {fields.map((row, index) => (
                <TableRow key={row.id}>
                  <ProductGroup
                    key={`${FIELDNAME}-${row.id}`}
                    productName={`${FIELDNAME}.${index}.productId`}
                    skuName={`${FIELDNAME}.${index}.sku`}
                  />
                  <TableItem width={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.quantity`}
                      control={control}
                      toFixed={0}
                      onChange={(value) => handleSubTotal(index, value)}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                      }}
                    />
                  </TableItem>

                  <TableItem minWidth={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.rate`}
                      control={control}
                      onChange={() => handleSubTotal(index)}
                      fieldProps={{
                        placeholder: 'Enter Rate',
                      }}
                    />
                  </TableItem>
                  <TableItem minWidth={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.subTotal`}
                      control={control}
                      fieldProps={{
                        placeholder: 'Enter Sub Total',
                        InputProps: {
                          readOnly: true,
                        },
                      }}
                    />
                  </TableItem>
                  <TableItem minWidth={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.discount`}
                      control={control}
                      onChange={() => handleTotal(index)}
                      fieldProps={{
                        placeholder: 'Enter Discount',
                        InputProps: {
                          endAdornment: <PercentsignComponent />,
                        },
                      }}
                    />
                  </TableItem>
                  <TableItem minWidth={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.tax`}
                      control={control}
                      onChange={(value) => handleTotal(index, value)}
                      fieldProps={{
                        placeholder: 'Enter Tax',
                        InputProps: {
                          endAdornment: <PercentsignComponent />,
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
                        placeholder: 'Enter Total Price',
                        InputProps: {
                          readOnly: true,
                        },
                      }}
                    />
                  </TableItem>
                  <DeleteFieldButton name={FIELDNAME} _id={row?._id} control={control} onClick={() => remove(index)} />
                </TableRow>
              ))}
            </TableBody>
          </TableWrapper>
        )}
      </Grid>
      <Grid item xs={12}>
        <Grid direction={'row'} justifyContent={'space-between'}>
          <Grid xs={12} md={6}>
            <Button variant="outlined" onClick={() => append(FIELDINYIALVALUE)}>
              Add Row
            </Button>
          </Grid>
          <Grid xs={12} md={6}>
            <TotalCompoent title={'Tota Price'} value={'2554646'} />
            <TotalCompoent title={'Total Quantity'} value={'150'} />
            <TotalCompoent title={'Discount'} value={'12%'} />
            <TotalCompoent title={'Tax'} value={'2%'} />
            <TotalCompoent title={'Overall Task'} value={'2554646'} />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SalesInvoiceItemDetails;
