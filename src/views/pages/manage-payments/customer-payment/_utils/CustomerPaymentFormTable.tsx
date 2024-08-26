import _ from 'lodash';
import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Grid, Button, TableRow, TableBody } from '@mui/material';

import { setValueConfig } from 'helper/GlobalHelper';
import { CustomerPaymentType, CustomerPaymentItemType } from 'helper/types/manage-payments/CustomerPayments';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import InputField from 'views/components/form-components/InputField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import DeleteFieldButton from 'views/components/form-components/DeleteFieldButton';
import { TableItem, TableHeader, TableWrapper } from 'views/components/table-componet/form-table';

const FieldIntialValue: CustomerPaymentItemType = {};
const FIELDNAME = 'customerPaymentItems';
const EssentialNeed: EssentialType[] = ['PaymentTerms'];
function CustomerPaymentFormTable() {
  const { control, watch, setValue } = useFormContext<CustomerPaymentType>();
  const { fields, append, remove } = useFieldArray({
    name: FIELDNAME,
    control: control,
  });
  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  const handleTotalAmount = useCallback(() => {
    const total = _.reduce(
      watch('customerPaymentItems'),
      (value, { totalAmount = 0 }) => {
        return parseFloat(`${totalAmount === ('' as never) ? 0 : totalAmount}` || '0') + value;
      },
      0
    );
    setValue('totalPaid', total, setValueConfig);
    setValue('pendingDue', (watch('totalAmount') ?? 0.0) - total, setValueConfig);
  }, [setValue, watch]);
  return (
    <>
      <Grid item xs={12}>
        {fields.length > 0 && (
          <TableWrapper>
            <TableHeader
              headLabel={[
                { id: 'payment_mode', label: 'Payment Mode' },
                { id: 'account_no', label: 'Account No' },
                { id: 'bank_name', label: 'Bank Name' },
                { id: 'branch', label: 'Branch' },
                { id: 'ifsc_code', label: 'IFSC Code' },
                { id: 'transaction_date', label: 'Transaction Date' },
                { id: 'transaction_no', label: 'Transaction No' },
                { id: 'total_amount', label: 'Total Amount' },
                { id: '', label: '' },
              ]}
            />
            <TableBody>
              {fields.map((row, index) => (
                <TableRow key={row.id}>
                  <TableItem minWidth={180}>
                    <AsyncSelectField
                      name={`${FIELDNAME}.${index}.paymentMode`}
                      control={control}
                      options={options?.PaymentTerms}
                      textFieldProps={{
                        placeholder: 'Select Payment Mode',
                      }}
                      addName="PaymentTerms"
                    />
                  </TableItem>
                  <TableItem minWidth={150}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.accountNumber`}
                      control={control}
                      toFixed={0}
                      fieldProps={{
                        placeholder: 'Enter Account Number',
                      }}
                    />
                  </TableItem>
                  <TableItem minWidth={150}>
                    <InputField
                      name={`${FIELDNAME}.${index}.bankName`}
                      control={control}
                      fieldProps={{
                        placeholder: 'Enter Bank Name',
                      }}
                    />
                  </TableItem>
                  <TableItem minWidth={150}>
                    <InputField
                      name={`${FIELDNAME}.${index}.branch`}
                      control={control}
                      fieldProps={{
                        placeholder: 'Enter Branch Name',
                      }}
                    />
                  </TableItem>
                  <TableItem minWidth={150}>
                    <InputField
                      name={`${FIELDNAME}.${index}.IFSCCode`}
                      control={control}
                      fieldProps={{
                        placeholder: 'Enter IFSC Code',
                      }}
                    />
                  </TableItem>
                  <TableItem width={200}>
                    <DatePickerField
                      name={`${FIELDNAME}.${index}.transactionDate`}
                      control={control}
                      fieldProps={{
                        placeholder: 'Select Transaction Date',
                      }}
                    />
                  </TableItem>
                  <TableItem minWidth={150}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.transactionNo`}
                      control={control}
                      toFixed={0}
                      fieldProps={{
                        placeholder: 'Enter Transaction No',
                      }}
                    />
                  </TableItem>
                  <TableItem minWidth={150}>
                    <NumberInputField
                      name={`${FIELDNAME}.${index}.totalAmount`}
                      control={control}
                      toFixed={2}
                      onChange={handleTotalAmount}
                      fieldProps={{
                        placeholder: 'Enter Total Amount',
                      }}
                    />
                  </TableItem>
                  <DeleteFieldButton name={`${FIELDNAME}`} _id={row?._id} control={control} onClick={() => remove(index)} />
                </TableRow>
              ))}
            </TableBody>
          </TableWrapper>
        )}
      </Grid>
      <Grid item xs={3}>
        <Button variant="outlined" onClick={() => append(FieldIntialValue as never)}>
          Add Row
        </Button>
      </Grid>
    </>
  );
}

export default CustomerPaymentFormTable;
