/* eslint-disable max-lines */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, useFieldArray, SubmitHandler } from 'react-hook-form';

import { Grid, Button, TableRow, TableBody, Typography } from '@mui/material';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { warehousewiseFormSchema } from 'helper/ValidationSchema';
import { OptionsType, FormCompoundProps } from 'helper/types/GlobalTypes';
import { WarehouseWSItemType, WareHouseWiseFormType } from 'helper/types/inventory-management/WareHouseWise';

import { useEssentialList } from 'store/hooks/EssentialHooks';
import { useWareHouseWiseEdit, useWareHouseWiseCreate } from 'store/hooks/InventoryManagementHook';

import FormLayout from 'views/components/ui-componet/FormLayout';
import InputField from 'views/components/form-components/InputField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import DeleteFieldButton from 'views/components/form-components/DeleteFieldButton';
import DragAndDropImportField from 'views/components/form-components/DragAndDropImportField';
import { BSRBRow, BSRBGroup } from 'views/components/form-components/group-field/bsrb-group';
import { TableItem, TableHeader, TableWrapper } from 'views/components/table-componet/form-table';
import ProductGroup from 'views/components/form-components/group-field/product-group/ProductGroup';

type Props = FormCompoundProps<WareHouseWiseFormType>;

const EssentialNeed: EssentialType[] = ['WarehouseLocation', 'Product'];

const FieldIntialValue: WarehouseWSItemType = {
  productId: null,
  categoryId: null,
  subCategoryId: null,
  sku: '',
  bayId: null,
  rackId: null,
  shelvesId: null,
  binId: null,
  quantity: 0,
};
const WareHouseWiseForm = ({ defaultValue, title, navigateLink }: Props) => {
  const router = useRouter();
  const form = useForm<WareHouseWiseFormType>({
    defaultValues: defaultValue,
    resolver: yupResolver(warehousewiseFormSchema) as unknown as Resolver<WareHouseWiseFormType>,
    mode: 'onSubmit',
  });
  const {
    control,
    setValue,
    watch,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const { fields, append, remove } = useFieldArray({
    name: 'warehouseWSItems',
    control: control,
  });
  const { data: options, isLoading } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  const { mutateAsync: WareHouseCreate } = useWareHouseWiseCreate();
  const { mutateAsync: WareHouseEdit } = useWareHouseWiseEdit();

  const handleFormSumbit: SubmitHandler<WareHouseWiseFormType> = async (data) => {
    if (data._id && data?.warehouseWSItems?.[0]?._id) {
      await WareHouseEdit(
        { formData: data, id: data?.warehouseWSItems?.[0]?._id },
        {
          onSuccess: (res) => {
            notify(res);
            // router.push(permission?.path ?? '/');
            router.push(navigateLink ?? '/');
          },
          onError: (error) => {
            errorSet({ error, setError });
          },
        }
      );
    } else {
      await WareHouseCreate(
        { formData: data },
        {
          onSuccess: (res) => {
            notify(res);
            // router.push(permission?.path ?? '/');
            router.push(navigateLink ?? '/');
          },
          onError: (error) => {
            errorSet({ error, setError });
          },
        }
      );
    }
  };
  const handleWareHouse = (res: OptionsType) => {
    setValue('warehouseName', res?.name ?? '');
    setValue('warehouseCode', res?.code ?? '');
    setValue('warehouseAddress', res?.address ?? '');
  };
  const WareHouseEditView = !watch(`warehouseWSItems`)?.[0]?._id;
  return (
    <FormLayout
      formProps={{
        ...form,
      }}
      title={title}
      // buttonLabel={title}
      dividerRemove={false}
      onSumbit={handleSubmit(handleFormSumbit)}
      loading={isSubmitting}
      naviagteLink={navigateLink}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Warehouse Details</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="warehouseId"
          control={control}
          label="WareHouse Location"
          textFieldProps={{
            placeholder: 'Select WareHouse',
          }}
          options={options?.WarehouseLocation}
          addName="WarehouseLocation"
          loading={isLoading}
          onChange={handleWareHouse}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="warehouseName"
          control={control}
          label="WareHouse Name"
          fieldProps={{
            placeholder: 'Enter WareHouse Name',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="warehouseCode"
          control={control}
          label="Unique Code"
          fieldProps={{
            placeholder: 'Enter Unique Code',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="warehouseAddress"
          control={control}
          label="Address"
          fieldProps={{
            placeholder: 'Enter Address',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      {WareHouseEditView && (
        <Grid item xs={12} md={12}>
          <DragAndDropImportField
            name="import_data"
            control={control}
            label="Import"
            url={'/warehouse-wise-stock'}
            sampleDownloadUrl={'/warehouse-wise-stock'}
            defaultImportValue={watch('warehouseWSItems')}
            onChange={(data) => {
              setValue('warehouseWSItems', data?.data as unknown as WarehouseWSItemType[]);
              // prepend(data?.data as WarehouseWSItemType);
              errorSet({ error: data.error, setError });
            }}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        {fields.length > 0 && (
          <TableWrapper>
            <TableHeader
              headLabel={[
                { id: 'product_id', label: 'Product Name' },
                {
                  id: 'category_id',
                  label: 'Category',
                },
                { id: 'sub_category_id', label: 'Sub Category' },
                { id: 'sku', label: 'SKU' },
                ...BSRBRow,
                { id: 'qty', label: 'Quantity' },
                { id: '', label: '' },
              ]}
            />
            <TableBody>
              {fields.map((row, index) => (
                <TableRow key={row.id}>
                  <ProductGroup
                    key={`warehouseWSItems-${row.id}`}
                    productName={`warehouseWSItems.${index}.productId`}
                    skuName={`warehouseWSItems.${index}.sku`}
                    setOption={[
                      {
                        name: `warehouseWSItems.${index}.categoryId`,
                        value: 'productCategory',
                        defaultValue: '',
                      },
                      {
                        name: `warehouseWSItems.${index}.subCategoryId`,
                        value: 'productSubCategory',
                        defaultValue: '',
                      },
                    ]}
                    disableOption={false}
                  >
                    <TableItem minWidth={140}>
                      <AsyncSelectField
                        name={`warehouseWSItems.${index}.categoryId`}
                        control={control}
                        // options={options?.Category}
                        addName="Category"
                        textFieldProps={{
                          placeholder: 'Select Category',
                        }}
                        fieldProps={{
                          readOnly: true,
                        }}
                        loading={isLoading}
                      />
                    </TableItem>
                    <TableItem minWidth={150}>
                      <AsyncSelectField
                        name={`warehouseWSItems.${index}.subCategoryId`}
                        control={control}
                        // options={options?.SubCategory.filter((option) => option.parentId === watch(`warehouseWSItems.${index}.categoryId`)?.value)}
                        textFieldProps={{
                          placeholder: 'Select Sub Category',
                        }}
                        searchFilters={{
                          key: 'categoryId',
                          value: watch(`warehouseWSItems.${index}.categoryId`)?.value as string,
                        }}
                        fieldProps={{
                          readOnly: true,
                        }}
                        addName="SubCategory"
                        loading={isLoading}
                      />
                    </TableItem>
                  </ProductGroup>
                  <BSRBGroup
                    key={`warehouseWSItems-${index}`}
                    watch={watch}
                    control={control}
                    setValue={setValue}
                    bayName={`warehouseWSItems.${index}.bayId`}
                    binName={`warehouseWSItems.${index}.binId`}
                    rackName={`warehouseWSItems.${index}.rackId`}
                    shelveName={`warehouseWSItems.${index}.shelvesId`}
                    // emptyBin={{
                    //   showEmptyBin: true,
                    //   wareHouseId: watch('warehouseId')?.value,
                    // }}
                  />
                  <TableItem minWidth={60}>
                    <NumberInputField
                      name={`warehouseWSItems.${index}.quantity`}
                      control={control}
                      fieldProps={{
                        placeholder: 'Enter QTY',
                      }}
                    />
                  </TableItem>
                  {!row?._id && <DeleteFieldButton name={`warehouseWSItems`} _id={row?._id} control={control} onClick={() => remove(index)} />}
                </TableRow>
              ))}
            </TableBody>
          </TableWrapper>
        )}
      </Grid>
      {WareHouseEditView && (
        <Grid item xs={3}>
          <Button variant="outlined" onClick={() => append(FieldIntialValue)}>
            Add Row
          </Button>
        </Grid>
      )}
    </FormLayout>
  );
};

export default WareHouseWiseForm;
