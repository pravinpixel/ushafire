import { useFieldArray, useFormContext } from 'react-hook-form';

import { Grid, Button, TableRow, TableBody } from '@mui/material';

import { PROJECT_CONSTANTS } from 'helper/GlobalHelper';
import { StockBSRBDetails } from 'helper/types/inventory-management/StockInwardType';
import { SalesReturnItem, SalesReturnFormType } from 'helper/types/sales-crm-system/SalesReturnTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import MoreVertField from 'views/components/form-components/MoreVertField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import { TableItem, TableHeader, TableWrapper } from 'views/components/table-componet/form-table';
import ProductGroup from 'views/components/form-components/group-field/product-group/ProductGroup';

const FIELDNAME = 'salesReturnItems';

const EssentialNeed: EssentialType[] = ['ProductCondition'];

const FIELDINYIALVALUE: SalesReturnItem = {
  productId: null,
  sku: '',
};

const SalesReturnItemsTable = () => {
  const { control, watch, setValue } = useFormContext<SalesReturnFormType>();

  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: FIELDNAME,
    control,
  });

  const addEnable = watch('salesInvoiceId') || null;

  return (
    <Grid item xs={12}>
      {fields.length > 0 && (
        <TableWrapper>
          <TableHeader
            headLabel={[
              { id: 'product_id', label: 'Product Name' },
              { id: 'sku', label: 'SKU' },
              { id: 'quantity', label: 'Issued Quantity' },
              { id: 'returnquantity', label: 'Return Quantity' },
              { id: 'productCondition', label: 'Product Condition' },
              { id: 'damagedquantity', label: 'Damaged Quantity' },
              { id: '', label: '' },
            ]}
          />
          <TableBody>
            {fields.map((row, index) => (
              <TableRow key={row.id}>
                <ProductGroup
                  key={`${FIELDNAME}-${index}`}
                  productName={`${FIELDNAME}.${index}.productId`}
                  skuName={`${FIELDNAME}.${index}.sku`}
                  setOption={[
                    {
                      name: `${FIELDNAME}.${index}.quantity`,
                      value: 'quantity',
                    },
                    // {
                    //   name: `${FIELDNAME}.${index}.actualQuantity`,
                    //   value: 'quantity',
                    // },

                  ]}
                  essentialParams={{
                    include: ['SalesInvoiceProduct'],
                    salesInvoiceId: addEnable?.value,
                  }}
                  onChange={() => {
                    setValue(`${FIELDNAME}.${index}.returnQuantity`, 0);
                    setValue(`${FIELDNAME}.${index}.damagedQuantity`, 0);
                  }}
                />

                <TableItem minWidth={100}>
                  <NumberInputField
                    name={`${FIELDNAME}.${index}.quantity`}
                    control={control}
                    fieldProps={{
                      placeholder: 'Enter Quantity',
                      InputProps: {
                        readOnly: true,
                      },
                    }}
                    toFixed={0}
                  />
                </TableItem>

                <TableItem minWidth={100}>
                  <NumberInputField
                    name={`${FIELDNAME}.${index}.returnQuantity`}
                    control={control}
                    fieldProps={{
                      placeholder: 'Enter Return Quantity',
                    }}
                    toFixed={0}
                  />
                </TableItem>
                <TableItem minWidth={100}>
                  <AsyncSelectField
                    name={`${FIELDNAME}.${index}.productCondition`}
                    control={control}

                    textFieldProps={{
                      placeholder: 'Select Product Condition',
                    }}
                    addName={'ProductCondition'}
                   
                    options={options?.["ProductCondition"]}
                    
                  />
                </TableItem>
                <TableItem minWidth={100}>
                  <NumberInputField
                    name={`${FIELDNAME}.${index}.damagedQuantity`}
                    control={control}
                    fieldProps={{
                      placeholder: 'Enter Damaged Quantity',
                    }}
                    toFixed={0}
                  />
                </TableItem>

                <TableItem minWidth={20}>
                  <MoreVertField
                    name={FIELDNAME}
                    control={control}
                    menuItem={[
                      {
                        label: 'Update Quantity',
                        action: 'popup',
                        name: 'StockInwardSplitPopup',
                        menuItemProps: {
                          disabled: !(watch(`${FIELDNAME}.${index}.productId`) && watch(`${FIELDNAME}.${index}.returnQuantity`)),
                        },
                      },
                      {
                        label: 'Delete',
                        action: 'fieldDelete',
                        menuItemProps: {
                          onClick: () => remove(index)
                        },
                      },
                    ]}

                    popupProps={[
                      {
                        name: 'StockInwardSplitPopup',
                        defaultValue: {
                          // ...watch(`${FIELDNAME}.${index}`),
                          productId: watch(`${FIELDNAME}.${index}`).productId,
                          quantity: watch(`${FIELDNAME}.${index}`)?.tempQuantity ?? (watch(`${FIELDNAME}.${index}`)?.returnQuantity || 0),
                          tempQuantity:
                            (watch(`${FIELDNAME}.${index}`)?.tempQuantity || 0) <= (watch(`${FIELDNAME}.${index}`)?.returnQuantity || 0)
                              ? (watch(`${FIELDNAME}.${index}`)?.returnQuantity || 0) - (watch(`${FIELDNAME}.${index}`)?.tempQuantity || 0)
                              : watch(`${FIELDNAME}.${index}`)?.tempQuantity,
                          productQtySplit: watch(`${FIELDNAME}.${index}`).returnDetails,
                        },
                        handleSumbit: (res) => {
                          const array = res?.arrayData || [];
                          setValue(`${FIELDNAME}.${index}.returnDetails`, array as StockBSRBDetails[]);
                          setValue(`${FIELDNAME}.${index}.tempQuantity`, res?.quantity as number);
                          setValue(`${FIELDNAME}.${index}.returnDetails${PROJECT_CONSTANTS.DeleteKey}` as never, res?.delete_id as never);
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
      {addEnable && (
        <Grid item xs={3}>
          <Button variant="outlined" onClick={() => append(FIELDINYIALVALUE)}>
            Add Row
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

/**
 * This file is part of AutoPack.
 *
 * Use of this file is prohibited except the Connect the two Form.
 * For Stock Inward  Form table
 */
export default SalesReturnItemsTable;
