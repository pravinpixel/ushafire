import { useFormContext } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { CustomerPaymentType } from 'helper/types/manage-payments/CustomerPayments';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import InputField from 'views/components/form-components/InputField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import NumberInputField from 'views/components/form-components/NumberInputField';

const EssentialNeed: EssentialType[] = ['Customer'];

function CustomerPaymentDetail() {
  const { control } = useFormContext<CustomerPaymentType>();

  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Payment Update</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="salesInvoiceNo"
          control={control}
          label="Sale Invoice No"
          fieldProps={{
            placeholder: 'Enter Sale Invoice No',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="salesInvoiceDate"
          control={control}
          label="Sales Invoice Date"
          fieldProps={{
            placeholder: 'Enter Sales Invoice Date',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="customerId"
          control={control}
          label="Customer Name"
          options={options?.Customer}
          textFieldProps={{
            placeholder: 'Select Customer Name',
          }}
          addName={'Customer'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInputField
          name="totalAmount"
          control={control}
          toFixed={2}
          label="Total Amount"
          fieldProps={{
            placeholder: 'Enter Total Amount',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInputField
          name="totalProduct"
          control={control}
          label="Total Product"
          toFixed={0}
          fieldProps={{
            placeholder: 'Enter Total Product',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInputField
          name="totalPaid"
          control={control}
          label="Total Paid"
          toFixed={2}
          fieldProps={{
            placeholder: 'Enter Total Paid',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInputField
          name="pendingDue"
          toFixed={2}
          control={control}
          label="Pending Due"
          
          fieldProps={{
            placeholder: 'Enter Pending Due',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="beneficiaryName"
          control={control}
          label="Beneficiary Name"
          fieldProps={{
            placeholder: 'Enter Beneficiary Name',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="beneficiaryAccountNo"
          control={control}
          label="Beneficiary Account No"
          fieldProps={{
            placeholder: 'Enter Beneficiary Account No',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="beneficiaryBankName"
          control={control}
          label="Beneficiary Bank Name"
          fieldProps={{
            placeholder: 'Enter Beneficiary Bank Name',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="beneficiaryIFSCCode"
          control={control}
          label="Beneficiary IFSC Code"
          fieldProps={{
            placeholder: 'Enter Beneficiary IFSC Code',
          }}
        />
      </Grid>
    </>
  );
}

export default CustomerPaymentDetail;
