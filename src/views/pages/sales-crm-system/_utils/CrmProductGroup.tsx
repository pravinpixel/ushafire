import { useFieldArray, useFormContext } from 'react-hook-form';

import { Grid, Button, TableRow, TableBody } from '@mui/material';

import { LeadItem } from 'helper/types/sales-crm-system/LeadManagementTypes';

import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import DeleteFieldButton from 'views/components/form-components/DeleteFieldButton';
import { TableItem, TableHeader, TableWrapper } from 'views/components/table-componet/form-table';
import ProductGroup from 'views/components/form-components/group-field/product-group/ProductGroup';
import { CategoryGroup, CategoryGroupRow } from 'views/components/form-components/group-field/category-group';

type CrmProductGroupType = {
  fieldName: string;
};

type FormArrayValues = {
  [key: string]: LeadItem[];
};

const FIELDINYIALVALUE: LeadItem = { brandId: null, categoryId: null, productId: null, quantity: 0, sku: '', subCategoryId: null };
const CrmProductGroup = ({ fieldName }: CrmProductGroupType) => {
  const { control } = useFormContext();
  const { fields, remove, append } = useFieldArray<FormArrayValues>({
    name: fieldName,
    control,
  });
  return (
    <>
      <Grid item xs={12} mt={2}>
        {fields.length > 0 && (
          <TableWrapper>
            <TableHeader
              headLabel={[
                { id: 'product_id', label: 'Product Name' },
                ...CategoryGroupRow,
                { id: 'brand', label: 'Brand' },
                { id: 'uom', label: 'UOM' },
                { id: 'sku', label: 'SKU' },
                { id: 'qty', label: 'Quantity' },
                { id: '', label: '' },
              ]}
            />
            <TableBody>
              {fields.map((row, index) => (
                <TableRow key={row.id}>
                  <ProductGroup
                    key={`${fieldName}-${row.id}`}
                    productName={`${fieldName}.${index}.productId`}
                    skuName={`${fieldName}.${index}.sku`}
                    setOption={[
                      {
                        name: `${fieldName}.${index}.categoryId`,
                        value: 'productCategory',
                        defaultValue: '',
                      },
                      {
                        name: `${fieldName}.${index}.subCategoryId`,
                        value: 'productSubCategory',
                        defaultValue: '',
                      },
                      {
                        name: `${fieldName}.${index}.brandId`,
                        value: 'brand',
                        defaultValue: '',
                      },
                      {
                        name: `${fieldName}.${index}.UOM`,
                        value: 'UOM',
                        defaultValue: '',
                      },
                    ]}
                  >
                    <CategoryGroup
                      categoryName={`${fieldName}.${index}.categoryId`}
                      subCategory={`${fieldName}.${index}.subCategoryId`}
                      control={control}
                    />
                    <TableItem minWidth={110}>
                      <AsyncSelectField
                        name={`${fieldName}.${index}.brandId`}
                        control={control}
                        fieldProps={{
                          readOnly: true,
                        }}
                        textFieldProps={{
                          placeholder: 'Select Brand',
                        }}
                        addName="Brand"
                      />
                    </TableItem>
                    <TableItem minWidth={110}>
                      <AsyncSelectField
                        name={`${fieldName}.${index}.UOM`}
                        control={control}
                        fieldProps={{
                          readOnly: true,
                        }}
                        textFieldProps={{
                          placeholder: 'Select UOM',
                        }}
                        addName="Uom"
                      />
                    </TableItem>
                  </ProductGroup>
                  <TableItem width={110}>
                    <NumberInputField
                      name={`${fieldName}.${index}.quantity`}
                      control={control}
                      toFixed={0}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                      }}
                    />
                  </TableItem>
                  <DeleteFieldButton name={fieldName} _id={row?._id} control={control} onClick={() => remove(index)} />
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
    </>
  );
};

export default CrmProductGroup;
