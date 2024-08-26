import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { stockInwardFormSchema } from 'helper/ValidationSchema';
import { OptionsType, FormCompoundProps } from 'helper/types/GlobalTypes';
import { StockInwardTypeForm } from 'helper/types/inventory-management/StockInwardType';

import { useEssentialList } from 'store/hooks/EssentialHooks';
import { useStockInwardEdit, useStockInwardCreate, useStockInWarehouseProduct } from 'store/hooks/InventoryManagementHook';

import FormLayout from 'views/components/ui-componet/FormLayout';
import InputField from 'views/components/form-components/InputField';
import TextAreaField from 'views/components/form-components/TextAreaField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import UploadDocumentField from 'views/components/form-components/UploadDocumentField';

import StockInWardFormTable from './StockInWardFormTable';

type Props = FormCompoundProps<StockInwardTypeForm>;

const EssentialNeed: EssentialType[] = ['Supplier', 'WarehouseLocation'];

const StockInWardForm = ({ defaultValue, title, navigateLink }: Props) => {
  const router = useRouter();
  const form = useForm<StockInwardTypeForm>({
    defaultValues: defaultValue,
    resolver: yupResolver(stockInwardFormSchema) as unknown as Resolver<StockInwardTypeForm>,
    mode: 'onSubmit',
  });
  const { control, watch, setValue, setError, handleSubmit } = form;

  const { data: options, isLoading } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  const status = watch('status');
  const { mutateAsync: StockInwardCreate } = useStockInwardCreate();
  const { mutateAsync: StockInwardEdit } = useStockInwardEdit();
  const { mutateAsync: StockInWarehouseProduct, isPending } = useStockInWarehouseProduct();

  const handleFormSumbit: SubmitHandler<StockInwardTypeForm> = async (data) => {
    if (data._id) {
      await StockInwardEdit(
        { formData: data, id: data?._id },
        {
          onSuccess: (res) => {
            notify(res);
            router.push(navigateLink ?? '/');
          },
          onError: (error) => {
            errorSet({ error, setError });
            setValue('draft', false);
          },
        }
      );
    } else {
      await StockInwardCreate(
        { formData: data },
        {
          onSuccess: (res) => {
            notify(res);
            router.push(navigateLink ?? '/');
          },
          onError: (error) => {
            errorSet({ error, setError });
            setValue('draft', false);
          },
        }
      );
    }
  };
  const handleWareHouseProduct = async (params?: OptionsType) => {
    const Id = watch('poId');
    const WarehouseId = params?.value;
    try {
      if (Id && WarehouseId) {
        const response = await StockInWarehouseProduct({
          id: Id,
          warehouseId: WarehouseId as string,
        });
        setValue('stockInwardItems', response);
      } else setValue('stockInwardItems', []);
    } catch (error) {
      notify(error);
    }
  };
  return (
    <FormLayout
      formProps={{
        ...form,
      }}
      title={title}
      dividerRemove={false}
      onSumbit={handleSubmit(handleFormSumbit)}
      naviagteLink={navigateLink}
      addMoreButton={
        status === 'Pending'
          ? [
              {
                label: 'Save as Draft',
                variant: 'outlined',
                sx: {
                  width: 'max-content',
                },
                loading: !!watch('draft'),
                onClick: () => {
                  setValue('draft', true);
                  handleFormSumbit(watch());
                },
                type: 'button',
              },
            ]
          : []
      }
      gridProps={{
        md: 1,
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Stock Inward Details</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="stockInwardNumber"
          control={control}
          label="Stock Inward Number"
          fieldProps={{
            placeholder: 'Enter Stock Inward Number',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="stockInwardDate"
          control={control}
          label="Stock Inward Date"
          fieldProps={{
            placeholder: 'Enter Stock Outward Date',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="supplierId"
          control={control}
          label="Supplier"
          textFieldProps={{
            placeholder: 'Select Supplier',
          }}
          fieldProps={{
            readOnly: true,
          }}
          options={options?.Supplier}
          addName={'Supplier'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="modeOfTransfer"
          control={control}
          label="Mode of Transfer"
          textFieldProps={{
            placeholder: 'Enter Mode of Transfer',
          }}
          fieldProps={{
            readOnly: true,
          }}
          addName={'SKU'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="poNumber"
          control={control}
          label="PO No"
          fieldProps={{
            placeholder: 'Enter Po No',
            InputProps: {
              readOnly: true,
            },
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
          pickerProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <UploadDocumentField
          name="poAttachment"
          control={control}
          fieldProps={{
            placeholder: 'Attach Purchase Order',
            label: 'PO Attachement',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="warehouseId"
          control={control}
          label="Warehouse"
          options={options?.WarehouseLocation}
          loading={isLoading || isPending}
          textFieldProps={{
            placeholder: 'Select Warehouse',
          }}
          addName={'WarehouseLocation'}
          onChange={handleWareHouseProduct}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextAreaField
          name="purpose"
          control={control}
          label="Purpose"
          fieldProps={{
            placeholder: 'Describe the Purpose',
          }}
        />
      </Grid>

      <StockInWardFormTable />
    </FormLayout>
  );
};

export default StockInWardForm;
