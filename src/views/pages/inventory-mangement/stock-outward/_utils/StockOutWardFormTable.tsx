/**
 * This file is part of AutoPack.
 *
 * Use of this file is prohibited except the Connect the two Form.
 * For Stock Inward  Form table
 */

import { useFieldArray, useFormContext } from 'react-hook-form';

import { Grid, TableRow, TableBody } from '@mui/material';

import { PROJECT_CONSTANTS } from 'helper/GlobalHelper';
import { StockOutwardTypeForm } from 'helper/types/inventory-management/StockOutwardType';

import InputField from 'views/components/form-components/InputField';
import MoreVertField from 'views/components/form-components/MoreVertField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import { TableItem, TableHeader, TableWrapper } from 'views/components/table-componet/form-table';
import ProductGroup from 'views/components/form-components/group-field/product-group/ProductGroup';

// type StockFormProps = {
// option?: EssentialDataType;
// fieldArray: UseFieldArrayReturn<StockOutwardTypeForm, 'stockOutwardItems', 'id'>;
//   isLoading: boolean;
// };

// const FieldIntialValue: StockOutwardItemType = {
//   productId: null,
//   categoryId: null,
//   subCategoryId: null,
//   hsnCode: '',
//   existingQuantity: 0,
//   withdrawQuantity: 0,
//   availableQuantity: 0,
//   uom: null,
//   rate: '0',
// };

const FIELDNAME = 'stockOutwardItems';
const Validate = { shouldValidate: true };
const StockOutWardFormTable = () => {
  const { control, setValue, watch } = useFormContext<StockOutwardTypeForm>();
  const { fields } = useFieldArray({
    name: FIELDNAME,
    control,
  });

  // const handleCreateDuplicate = useCallback(
  //   (index: number) => {
  //     const appendValue = watch(`${FIELDNAME}.${index}`);
  //     const OutwardQty = (appendValue?.outwardQuantity ?? 0) - (appendValue?.withdrawQuantity ?? 0);
  //     append({
  //       ...appendValue,
  //       _id: undefined,
  //       warehouseId: null,
  //       outwardQuantity: OutwardQty,
  //       outwardDetails: [],
  //     });
  //   },
  //   [append, watch]
  // );

  return (
    <>
      <Grid item xs={12}>
        {fields.length > 0 && (
          <TableWrapper>
            <TableHeader
              headLabel={[
                { id: 'product_id', label: 'Product Name' },
                { id: 'category_id', label: 'Category' },
                { id: 'sub_category_id', label: 'Sub Category' },
                { id: 'hsn', label: 'HSN Code' },
                { id: 'sku', label: 'SKU' },
                // { id: 'warehouse', label: 'Warehouse' },
                { id: 'qty', label: 'Existing Quantity' },
                { id: 'otqty', label: 'Outward Quantity' },
                { id: 'widtdraw', label: 'Widtdraw Quantity' },
                { id: 'available', label: 'Available Quantity' },
                { id: 'uom', label: 'UOM' },
                { id: 'rate', label: 'Rate' },
                { id: '', label: '' },
              ]}
            />
            <TableBody>
              {fields.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    padding: 0.3,
                  }}
                >
                  <ProductGroup
                    key={`${FIELDNAME}-${row.id}`}
                    productName={`${FIELDNAME}.${index}.productId`}
                    skuName={`${FIELDNAME}.${index}.sku`}
                    // setOption={[
                    //   {
                    //     name: `${FIELDNAME}.${index}.rate`,
                    //     value: 'costPrice',
                    //     defaultValue: '',
                    //   },
                    //   {
                    //     name: `${FIELDNAME}.${index}.categoryId`,
                    //     value: 'productCategory',
                    //     defaultValue: '',
                    //   },
                    //   {
                    //     name: `${FIELDNAME}.${index}.subCategoryId`,
                    //     value: 'productSubCategory',
                    //     defaultValue: '',
                    //   },
                    //   {
                    //     name: `${FIELDNAME}.${index}.hsnCode`,
                    //     value: 'hsnCode',
                    //     defaultValue: '',
                    //   },
                    // ]}
                    essentialParams={{
                      // warehouseId: watch('warehouseId')?.value,
                      // include: ['WarehouseWS-wise-product'],
                      enabled: false,
                    }}
                    productFieldProps={{
                      fieldProps: {
                        readOnly: true,
                      },
                    }}
                  >
                    <TableItem minWidth={140}>
                      <AsyncSelectField
                        name={`${FIELDNAME}.${index}.categoryId`}
                        control={control}
                        addName="Category"
                        textFieldProps={{
                          placeholder: 'Select Category',
                        }}
                        fieldProps={{
                          readOnly: true,
                        }}
                      />
                    </TableItem>
                    <TableItem minWidth={150}>
                      <AsyncSelectField
                        name={`${FIELDNAME}.${index}.subCategoryId`}
                        control={control}
                        textFieldProps={{
                          placeholder: 'Select Sub Category',
                        }}
                        searchFilters={{
                          key: 'categoryId',
                          value: watch(`${FIELDNAME}.${index}.categoryId`)?.value as string,
                        }}
                        fieldProps={{
                          readOnly: true,
                        }}
                        addName="SubCategory"
                      />
                    </TableItem>
                    <TableItem width={200}>
                      <InputField
                        name={`${FIELDNAME}.${index}.hsnCode`}
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
                  {/* <TableItem minWidth={140}>
                    <AsyncSelectField
                      name={`${FIELDNAME}.${index}.warehouseId`}
                      control={control}
                      options={row?.warehouseEssential ?? []}
                      textFieldProps={{
                        placeholder: 'Select Warehouse',
                      }}
                      addName={'WarehouseLocation'}
                      // onChange={(res) => handleProductDetails(index, res?.value as string)}
                    />
                  </TableItem> */}
                  <TableItem minWidth={60}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.existingQuantity`}
                      control={control}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                        InputProps: {
                          readOnly: true,
                        },
                      }}
                      toFixed={0}
                    />
                  </TableItem>
                  <TableItem minWidth={60}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.outwardQuantity`}
                      control={control}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                        InputProps: {
                          readOnly: true,
                        },
                      }}
                      toFixed={0}
                    />
                  </TableItem>
                  <TableItem minWidth={60}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.withdrawQuantity`}
                      control={control}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                        InputProps: {
                          readOnly: true,
                        },
                      }}
                      toFixed={0}
                    />
                  </TableItem>
                  <TableItem minWidth={60}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.availableQuantity`}
                      control={control}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                        InputProps: {
                          readOnly: true,
                        },
                      }}
                      toFixed={0}
                    />
                  </TableItem>
                  <TableItem minWidth={100}>
                    <AsyncSelectField
                      name={`${FIELDNAME}.${index}.uom`}
                      control={control}
                      addName={'Uom'}
                      fieldProps={{
                        readOnly: true,
                      }}
                    />
                  </TableItem>
                  <TableItem minWidth={60}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.rate`}
                      control={control}
                      fieldProps={{
                        placeholder: 'Enter Rate',
                        InputProps: {
                          readOnly: true,
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
                          label: 'WithDraw Quantity',
                          action: 'popup',
                          name: 'StockOutQtySplitPopoup',
                          // menuItemProps: {
                          //   disabled: !watch(`${FIELDNAME}.${index}`)?.warehouseId?.value || isPending,
                          // },
                        },
                      ]}
                      popupProps={[
                        {
                          name: 'StockOutQtySplitPopoup',
                          defaultValue: {
                            ...watch(`${FIELDNAME}.${index}`),
                            quantity: watch(`${FIELDNAME}`)?.reduce((pre, singleArray) => pre + (singleArray?.withdrawQuantity || 0), 0),
                            productQtySplit: watch(`${FIELDNAME}.${index}`).outwardDetails,
                          },
                          handleSumbit: (res) => {
                            const array = res?.arrayData || [];
                            const availableQuantity = array?.reduce((pre, singleValue) => pre + (singleValue?.availableQuantity || 0), 0);
                            const withdrawQuantity = array?.reduce((pre, singleValue) => pre + (singleValue?.warehouseIdQuantity || 0), 0);
                            setValue(`${FIELDNAME}.${index}.outwardDetails`, array);
                            setValue(`${FIELDNAME}.${index}.withdrawQuantity`, withdrawQuantity as number, Validate);
                            setValue(`${FIELDNAME}.${index}.availableQuantity`, availableQuantity, Validate);
                            setValue(`${FIELDNAME}.${index}.outwardDetails${PROJECT_CONSTANTS.DeleteKey}` as never, res?.delete_id as never);
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
        {/* <Button variant="outlined" onClick={() => append(FieldIntialValue)}>
          Add Row
        </Button> */}
      </Grid>
    </>
  );
};

export default StockOutWardFormTable;
