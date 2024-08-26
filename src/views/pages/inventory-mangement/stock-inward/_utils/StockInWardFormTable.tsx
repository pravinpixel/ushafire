import { useFieldArray, useFormContext } from 'react-hook-form';

import { Grid, TableRow, TableBody } from '@mui/material';

import { IconWrapper } from 'theme/svg';

import { floatValue } from 'helper/FormatHelper';
import { setValueConfig, PROJECT_CONSTANTS } from 'helper/GlobalHelper';
import { StockInwardTypeForm } from 'helper/types/inventory-management/StockInwardType';

import InputField from 'views/components/form-components/InputField';
import MoreVertField from 'views/components/form-components/MoreVertField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import { TableItem, TableHeader, TableWrapper } from 'views/components/table-componet/form-table';
import ProductGroup from 'views/components/form-components/group-field/product-group/ProductGroup';
import { CategoryGroup, CategoryGroupRow } from 'views/components/form-components/group-field/category-group';


const StockInWardFormTable = () => {
  const { control, setValue, watch } = useFormContext<StockInwardTypeForm>();
  const { fields } = useFieldArray({
    name: 'stockInwardItems',
    control: control,
  });
  const priceComponents = <IconWrapper py={0}>{PROJECT_CONSTANTS.DOLLER}</IconWrapper>;
  const PercentsignComponent = <IconWrapper>{PROJECT_CONSTANTS.Percentsign}</IconWrapper>;
  const handleSubTotal = (index: number, value?: string | number) => {
    const rate = floatValue(`${watch(`stockInwardItems.${index}.rate`) || '0'}` || '0');
    const quantity = Number(value || `${watch(`stockInwardItems.${index}.inwardQuantity` || '1')}` || '1');
    const subTotal = (rate as number) * quantity;
    setValue(`stockInwardItems.${index}.subTotal`, subTotal as number, setValueConfig);
    const tax = floatValue(`${watch(`stockInwardItems.${index}.tax`)}` || '0');
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
    const subTotal = floatValue(`${watch(`stockInwardItems.${index}.subTotal`)}` || '0');
    const discount = floatValue(`${watch(`stockInwardItems.${index}.discount`)}` || '0');
    const taxNumber = floatValue(`${tax ? tax : watch(`stockInwardItems.${index}.tax`)}` || '0');

    const discountPrice = discount ? percentage(discount as number, subTotal as number) : 0;
    const discountTotal = (subTotal as number) - discountPrice;
    const taxPercentage = taxNumber ? percentage(taxNumber as number, discountTotal) : 0;
    const total = discountTotal + taxPercentage;
    setValue(`stockInwardItems.${index}.total`, floatValue(`${total}`, 2) as never, setValueConfig);
  };
  return (
    <Grid item xs={12}>
      {fields.length > 0 && (
        <TableWrapper>
          <TableHeader
            headLabel={[
              { id: 'product_id', label: 'Product Name' },
              ...CategoryGroupRow,
              { id: 'hsn', label: 'HSN Code' },
              { id: 'sku', label: 'SKU' },
              { id: 'existing', label: 'Existing Quantity' },
              { id: 'inward', label: 'Inward Quantity' },
              { id: 'added', label: 'Added Quantity' },
              { id: 'totalquantity', label: 'Total Quantity' },
              { id: 'uom', label: 'UOM' },
              { id: 'rate', label: 'Rate' },
              { id: 'sub_total', label: 'SubTotal' },
              { id: 'discount', label: 'Discount' },
              { id: 'tax', label: 'Tax' },
              { id: 'total', label: 'Total' },
              { id: '', label: '' },
            ]}
          />
          <TableBody>
            {fields.map((row, index) => (
              <TableRow key={row.id}>
                <ProductGroup
                  key={`stockInwardItems-${index}`}
                  productName={`stockInwardItems.${index}.productId`}
                  skuName={`stockInwardItems.${index}.sku`}
                  setOption={[
                    {
                      name: `stockInwardItems.${index}.rate`,
                      value: 'costPrice',
                      defaultValue: '',
                    },
                    {
                      name: `stockInwardItems.${index}.categoryId`,
                      value: 'productCategory',
                      defaultValue: '',
                    },
                    {
                      name: `stockInwardItems.${index}.subCategoryId`,
                      value: 'productSubCategory',
                      defaultValue: '',
                    },
                    {
                      name: `stockInwardItems.${index}.hsnCode`,
                      value: 'hsnCode',
                      defaultValue: '',
                    },
                  ]}
                  onChange={() => handleSubTotal(index)}
                  productFieldProps={{
                    fieldProps: {
                      readOnly: true,
                    },
                  }}
                >
                  <CategoryGroup
                    categoryName={`stockInwardItems.${index}.categoryId`}
                    subCategory={`stockInwardItems.${index}.subCategoryId`}
                    control={control}
                  />
                  <TableItem width={200}>
                    <InputField
                      name={`stockInwardItems.${index}.hsnCode`}
                      control={control}
                      fieldProps={{
                        placeholder: 'HSN Code',
                        InputProps: {
                          readOnly: true,
                        },
                      }}
                    />
                  </TableItem>
                </ProductGroup>

                <TableItem minWidth={100}>
                  <NumberInputField
                    name={`stockInwardItems.${index}.existingQuantity`}
                    control={control}
                    fieldProps={{
                      placeholder: 'QTY',
                      InputProps: {
                        readOnly: true,
                      },
                    }}
                    toFixed={0}
                  />
                </TableItem>
                <TableItem minWidth={100}>
                  <NumberInputField
                    name={`stockInwardItems.${index}.inwardQuantity`}
                    control={control}
                    fieldProps={{
                      placeholder: 'QTY',
                      InputProps: {
                        readOnly: true,
                      },
                    }}
                    toFixed={0}
                  />
                </TableItem>
                <TableItem minWidth={100}>
                  <NumberInputField
                    name={`stockInwardItems.${index}.addedQuantity`}
                    onChange={(value) => handleSubTotal(index, value)}
                    control={control}
                    fieldProps={{
                      placeholder: 'QTY',
                      InputProps: {
                        readOnly: true,
                      },
                    }}
                    toFixed={0}
                  />
                </TableItem>
                <TableItem minWidth={100}>
                  {/* Change name as addedStockTotalQuantity from totalQuantity */}
                  <NumberInputField
                    name={`stockInwardItems.${index}.addedStockTotalQuantity`}
                    control={control}
                    fieldProps={{
                      placeholder: 'QTY',
                      InputProps: {
                        readOnly: true,
                      },
                    }}
                    toFixed={0}
                  />
                </TableItem>
                <TableItem width={120}>
                  <AsyncSelectField
                    name={`stockInwardItems.${index}.uom`}
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
                <TableItem minWidth={60}>
                  <NumberInputField
                    name={`stockInwardItems.${index}.rate`}
                    control={control}
                    fieldProps={{
                      placeholder: 'Rate',
                    }}
                    onChange={() => handleSubTotal(index)}
                  />
                </TableItem>
                <TableItem minWidth={110}>
                  <NumberInputField
                    name={`stockInwardItems.${index}.subTotal`}
                    control={control}
                    fieldProps={{
                      placeholder: 'Sub Total',
                      InputProps: {
                        readOnly: true,
                        startAdornment: priceComponents,
                      },
                    }}
                  />
                </TableItem>
                <TableItem minWidth={80}>
                  <NumberInputField
                    name={`stockInwardItems.${index}.discount`}
                    control={control}
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
                <TableItem minWidth={80}>
                  <NumberInputField
                    name={`stockInwardItems.${index}.tax`}
                    control={control}
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
                    name={`stockInwardItems.${index}.total`}
                    control={control}
                    fieldProps={{
                      placeholder: 'Total',
                      InputProps: {
                        readOnly: true,
                        startAdornment: priceComponents,
                      },
                    }}
                  />
                </TableItem>
                <TableItem minWidth={20}>
                  <MoreVertField
                    name={'stockInwardItems'}
                    control={control}
                    menuItem={[
                      {
                        label: 'Update Quantity',
                        action: 'popup',
                        name: 'ProductQtySplit',
                      },
                    ]}
                    popupProps={[
                      {
                        name: 'ProductQtySplit',
                        defaultValue: {
                          ...watch(`stockInwardItems.${index}`),
                          quantity: watch(`stockInwardItems.${index}`).pendingInwardQuantity,
                          productQtySplit: watch(`stockInwardItems.${index}`).inwardDetails,
                          warehouseId: watch('warehouseId')?.value,
                        },
                        handleSumbit: (res) => {
                          setValue(`stockInwardItems.${index}.inwardDetails`, res?.arrayData);
                          const addedQuantity = (watch(`stockInwardItems.${index}`)?.pendingInwardQuantity ?? 0) - (res?.quantity as number);
                          const existingQuantity = res?.existingQuantity as number;
                          setValue(`stockInwardItems.${index}.addedQuantity`, addedQuantity);
                          setValue(`stockInwardItems.${index}.addedStockTotalQuantity`, existingQuantity + addedQuantity);
                          handleSubTotal(index);
                          setValue(`stockInwardItems.${index}.inwardDetails${PROJECT_CONSTANTS.DeleteKey}` as never, res?.delete_id as never);
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
export default StockInWardFormTable;
