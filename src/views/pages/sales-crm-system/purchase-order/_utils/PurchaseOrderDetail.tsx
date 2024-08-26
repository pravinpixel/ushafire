import { useFieldArray, useFormContext } from 'react-hook-form';

import { Grid, Button, TableRow, TableBody, Typography } from '@mui/material';

import { PurchaseOrderItemType, PurchaseOrderTypeForm } from 'helper/types/sales-crm-system/PurchaseOrderTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import InputField from 'views/components/form-components/InputField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import DeleteFieldButton from 'views/components/form-components/DeleteFieldButton';
import { TableItem, TableHeader, TableWrapper } from 'views/components/table-componet/form-table';
import ProductGroup from 'views/components/form-components/group-field/product-group/ProductGroup';

import PurchaseOrderTypeDetails from './PurchaseOrderTypeDetails';

const EssentialNeed: EssentialType[] = ['Supplier', 'PaymentTerms'];

const FieldIntialValue: PurchaseOrderItemType = {
  productId: null,
  SKU: '',
  quantity: 0,
};
function PurchaseOrderDetail({ formTitle = 'Purchase Order Details' }: { formTitle?: string }) {
  const { control, watch } = useFormContext<PurchaseOrderTypeForm>();
  const addEditable = !watch('approvePage');
  const { fields, append, remove } = useFieldArray({
    name: 'purchaseOrderItems',
    control: control,
  });
  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">{formTitle}</Typography>
      </Grid>
      <Typography variant="h6"></Typography>

      <Grid item xs={12} md={6}>
        <InputField
          name="poNumber"
          control={control}
          label="PO No"
          fieldProps={{
            placeholder: 'Enter PO No',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="poDate"
          control={control}
          label="PO date"
          fieldProps={{
            placeholder: 'Enter Po date',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="supplier"
          control={control}
          label="Supplier Name"
          options={options?.Supplier}
          textFieldProps={{
            placeholder: 'Select Supplier Name',
          }}
          addName={'Supplier'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="paymentTerms"
          control={control}
          label="Payment Terms"
          options={options?.PaymentTerms}
          textFieldProps={{
            placeholder: 'Select Payment Terms',
          }}
          addName={'PaymentTerms'}
        />
      </Grid>
      <PurchaseOrderTypeDetails />

      <Grid item xs={12}>
        {fields.length > 0 && (
          <TableWrapper>
            <TableHeader
              headLabel={[
                { id: 'product_id', label: 'Product Name' },
                { id: 'sku', label: 'SKU' },
                { id: 'qty', label: 'Quantity' },
                ...(addEditable ? [{ id: '', label: '' }] : []),
              ]}
            />
            <TableBody>
              {fields.map((row, index) => (
                <TableRow key={row.id}>
                  <ProductGroup
                    key={`purchaseOrderItems-${row.id}`}
                    productName={`purchaseOrderItems.${index}.productId`}
                    skuName={`purchaseOrderItems.${index}.SKU`}
                  />
                  <TableItem width={110}>
                    <NumberInputField
                      name={`purchaseOrderItems.${index}.quantity`}
                      control={control}
                      toFixed={0}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                      }}
                    />
                  </TableItem>
                  {addEditable && <DeleteFieldButton name={`purchaseOrderItems`} _id={row?._id} control={control} onClick={() => remove(index)} />}
                </TableRow>
              ))}
            </TableBody>
          </TableWrapper>
        )}
      </Grid>
      <Grid item xs={3}>
        {addEditable && (
          <Button variant="outlined" onClick={() => append(FieldIntialValue as never)}>
            Add Row
          </Button>
        )}
      </Grid>
    </>
  );
}

export default PurchaseOrderDetail;
