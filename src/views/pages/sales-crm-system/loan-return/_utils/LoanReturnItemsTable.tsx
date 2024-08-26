import { useFieldArray, useFormContext } from 'react-hook-form';

import { Grid, TableRow, TableBody } from '@mui/material';

import { PROJECT_CONSTANTS } from 'helper/GlobalHelper';
import { LoanReturnFormType } from 'helper/types/sales-crm-system/LoanReturnType';
import { StockBSRBDetails } from 'helper/types/inventory-management/StockInwardType';

import MoreVertField from 'views/components/form-components/MoreVertField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import { TableItem, TableHeader, TableWrapper } from 'views/components/table-componet/form-table';
import ProductGroup from 'views/components/form-components/group-field/product-group/ProductGroup';

const FIELDNAME = 'loanReturnItems';

const LoanReturnItemsTable = () => {
  const { control, watch, setValue } = useFormContext<LoanReturnFormType>();

  const { fields } = useFieldArray({
    name: FIELDNAME,
    control,
  });

  return (
    <Grid item xs={12}>
      {fields.length > 0 && (
        <TableWrapper>
          <TableHeader
            headLabel={[
              { id: 'product_id', label: 'Product Name' },
              { id: 'sku', label: 'SKU' },
              { id: 'quantity', label: 'Quantity' },
              { id: 'returnquantity', label: 'Return Quantity' },
              { id: 'damagedquantity', label: 'Damaged Quantity' },
              { id: '', label: '' },
            ]}
          />
          <TableBody>
            {fields.map((row, index) => (
              <TableRow key={row.id}>
                <ProductGroup key={`${FIELDNAME}-${index}`} productName={`${FIELDNAME}.${index}.productId`} skuName={`${FIELDNAME}.${index}.sku`} />

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
                    // onChange={() => handleReturnQuatity(index)}
                    fieldProps={{
                      placeholder: 'Enter Return Quantity',
                    }}
                    toFixed={0}
                  />
                </TableItem>
                <TableItem minWidth={100}>
                  <NumberInputField
                    name={`${FIELDNAME}.${index}.damagedQuantity`}
                    // onChange={() => handleReturnQuatity(index)}
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
                    ]}
                    popupProps={[
                      {
                        name: 'StockInwardSplitPopup',
                        defaultValue: {
                          productId: watch(`${FIELDNAME}.${index}`).productId,
                          quantity: watch(`${FIELDNAME}.${index}`)?.tempQuantity ?? (watch(`${FIELDNAME}.${index}`)?.returnQuantity || 0),
                          tempQuantity:
                            (watch(`${FIELDNAME}.${index}`)?.tempQuantity || 0) <= (watch(`${FIELDNAME}.${index}`)?.returnQuantity || 0)
                              ? (watch(`${FIELDNAME}.${index}`)?.returnQuantity || 0) - (watch(`${FIELDNAME}.${index}`)?.tempQuantity || 0)
                              : watch(`${FIELDNAME}.${index}`)?.tempQuantity || watch(`${FIELDNAME}.${index}`)?.returnQuantity || 0,
                          productQtySplit: watch(`${FIELDNAME}.${index}`).returnDetails,
                        },
                        handleSumbit: (res) => {
                          const array = res?.arrayData || [];
                          setValue(`${FIELDNAME}.${index}.returnDetails`, array as StockBSRBDetails[]);
                          setValue(`${FIELDNAME}.${index}.tempQuantity`, res?.quantity as number);
                          setValue(`${FIELDNAME}.${index}.loanReturnItems${PROJECT_CONSTANTS.DeleteKey}` as never, res?.delete_id as never);
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
  );
};

/**
 * This file is part of AutoPack.
 *
 * Use of this file is prohibited except the Connect the two Form.
 * For Stock Inward  Form table
 */
export default LoanReturnItemsTable;
