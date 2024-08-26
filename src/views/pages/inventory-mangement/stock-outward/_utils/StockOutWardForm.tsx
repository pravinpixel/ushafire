/**
 * This file is part of AutoPack.
 *
 * Stock Outward Form to extrect the stock from the ware house
 */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { stockOutwardFormSchema } from 'helper/ValidationSchema';
import { StockOutwardTypeForm } from 'helper/types/inventory-management/StockOutwardType';

import { useStockOutwardEdit, useStockOutwardCreate } from 'store/hooks/InventoryManagementHook';

import FormLayout from 'views/components/ui-componet/FormLayout';
import InputField from 'views/components/form-components/InputField';
import TextAreaField from 'views/components/form-components/TextAreaField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';

import StockOutWardFormTable from './StockOutWardFormTable';

type Props = FormCompoundProps<StockOutwardTypeForm>;

// const EssentialNeed: EssentialType[] = ['Customer', 'PaymentTerms'];

const StockOutWardForm = ({ defaultValue, title, navigateLink }: Props) => {
  const router = useRouter();
  const form = useForm<StockOutwardTypeForm>({
    defaultValues: defaultValue,
    resolver: yupResolver(stockOutwardFormSchema) as unknown as Resolver<StockOutwardTypeForm>,
    mode: 'onSubmit',
  });
  const { control, setError, watch, handleSubmit } = form;
  // const { data: options, isLoading } = useEssentialList({
  //   params: {
  //     include: EssentialNeed,
  //   },
  // });
  const { mutateAsync: StockOutwardCreate } = useStockOutwardCreate();
  const { mutateAsync: StockOutwardEdit } = useStockOutwardEdit();

  const handleFormSumbit: SubmitHandler<StockOutwardTypeForm> = async (data) => {
    if (data._id) {
      await StockOutwardEdit(
        { formData: data, id: data._id },
        {
          onSuccess: (res) => {
            notify(res);
            router.push(navigateLink ?? '/');
          },
          onError: (error) => {
            errorSet({ error, setError });
          },
        }
      );
    } else {
      await StockOutwardCreate(
        { formData: data },
        {
          onSuccess: (res) => {
            notify(res);
            router.push(navigateLink ?? '/');
          },
          onError: (error) => {
            errorSet({ error, setError });
          },
        }
      );
    }
  };

  return (
    <FormLayout
      formProps={{
        ...form,
      }}
      title={title}
      dividerRemove={false}
      onSumbit={handleSubmit(async (data, event) => {
        await handleFormSumbit({ ...data, draft: false }, event);
      })}
      naviagteLink={navigateLink}
      addMoreButton={[
        {
          label: 'Save as Draft',
          variant: 'outlined',
          sx: {
            width: 'max-content',
          },
          loading: !!watch('draft'),
          onClick: () => {
            handleFormSumbit({ ...watch(), draft: true });
          },
          type: 'button',
        },
      ]}
      gridProps={{
        md: 1,
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Stock Outward Details</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="stockOutwardNumber"
          control={control}
          label="Stock Outward Number"
          fieldProps={{
            placeholder: 'Select Stock Outward Number',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="stockOutwardDate"
          control={control}
          label="Stock Outward Date"
          fieldProps={{
            placeholder: 'Enter Stock Outward Date',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="customerId"
          control={control}
          label="Customer"
          textFieldProps={{
            placeholder: 'Select Customer',
          }}
          fieldProps={{
            readOnly: true,
          }}
          addName={'Customer'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="modeOfTransfer"
          control={control}
          label="Mode of Transfer"
          addName="PaymentTerms"
          textFieldProps={{
            placeholder: 'Enter Mode of Transfer',
          }}
          fieldProps={{
            readOnly: true,
          }}
        />
      </Grid>
      {/* <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="warehouseId"
          control={control}
          label="Warehouse"
          options={options?.WarehouseLocation}
          textFieldProps={{
            placeholder: 'Select Warehouse',
          }}
          addName={'WarehouseLocation'}
          loading={isLoading}
          onChange={() => fieldArray.remove()}
        />
      </Grid> */}
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
      <StockOutWardFormTable />
    </FormLayout>
  );
};

export default StockOutWardForm;
