import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Grid, Button, TableRow, TableBody } from '@mui/material';

import { setValueConfig } from 'helper/GlobalHelper';
import { PercentsignComponent } from 'helper/AllComponents';
import { LoansTypeForm } from 'helper/types/sales-crm-system/LoansTypes';

import NumberInputField from 'views/components/form-components/NumberInputField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import DeleteFieldButton from 'views/components/form-components/DeleteFieldButton';
import { TableItem, TableHeader, TableWrapper } from 'views/components/table-componet/form-table';
import ProductGroup from 'views/components/form-components/group-field/product-group/ProductGroup';

const FIELDINYIALVALUE = { brandId: null, categoryId: null, productId: null, quantity: 0, sku: '', subCategoryId: null };
const FIELDNAME = 'loanItems';
const LoanItemDetails = () => {
  const { control, watch, setValue } = useFormContext<LoansTypeForm>();
  const { fields, remove, append } = useFieldArray({
    name: FIELDNAME,
    control,
  });

  const handleTotal = (index: number) => {
    const rateValue = watch(`${FIELDNAME}.${index}.rate`) || 0;
    const quantityValue = watch(`${FIELDNAME}.${index}.quantity`) || 0;
    const subTotal = quantityValue * rateValue;
    setValue(`${FIELDNAME}.${index}.subTotal`, subTotal, setValueConfig);
    setValue(`${FIELDNAME}.${index}.total`, subTotal, setValueConfig);
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
                { id: 'saqty', label: 'Stock Available Quantity' },
                { id: 'uom', label: 'UOM' },
                { id: 'rate', label: 'Rate' },
                { id: 'sub-total', label: 'Sub Total' },
                { id: 'commission', label: 'Commission %' },
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
                    setOption={[
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
                  />
                  <TableItem width={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.quantity`}
                      control={control}
                      toFixed={0}
                      onChange={() => handleTotal(index)}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                      }}
                    />
                  </TableItem>
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
                  <TableItem minWidth={110}>
                    <AsyncSelectField
                      name={`${FIELDNAME}.${index}.UOM`}
                      control={control}
                      textFieldProps={{
                        placeholder: 'UOM',
                      }}
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
                      onChange={() => handleTotal(index)}
                      toFixed={0}
                      fieldProps={{
                        placeholder: 'Enter Rate',
                      }}
                    />
                  </TableItem>
                  <TableItem minWidth={110}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.subTotal`}
                      control={control}
                      toFixed={0}
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
                      name={`${FIELDNAME}.${index}.commission`}
                      control={control}
                      toFixed={0}
                      fieldProps={{
                        placeholder: 'Enter Commission',
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
      <Grid item xs={3}>
        <Button variant="outlined" onClick={() => append(FIELDINYIALVALUE)}>
          Add Row
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default LoanItemDetails;
