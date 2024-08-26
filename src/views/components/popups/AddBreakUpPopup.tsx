import _ from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, useFieldArray } from 'react-hook-form';

import { Paper, Dialog, TableRow, TableBody, Typography, FormHelperText } from '@mui/material';

import { formPaper } from 'theme/css';

import { PopupNames } from 'helper/types/GlobalTypes';
import { breakUpFormSchema } from 'helper/ValidationSchema';
import { BreakUpItems } from 'helper/types/sales-crm-system/BlanketOrderTypes';

import FormFooter from '../ui-componet/FormFooter';
import DummyField from '../form-components/DummyField';
import NumberInputField from '../form-components/NumberInputField';
import { TableItem, TableHeader, TableWrapper } from '../table-componet/form-table';

type Props = {
  name?: PopupNames;
  handleClose: () => void;
  open: boolean;
  modelName?: PopupNames;
  defaultValues?: FormSplit;
  handleDataSumbit: (res: FormSplit) => void;
};

type FormSplit = {
  quantity: number;
  maximumQuantity: number;
  breakUps: BreakUpItems[];
};
const FIELDNAME = 'breakUps';
function AddBreakUpPopup({ handleClose, open, name, modelName, defaultValues, handleDataSumbit }: Props) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormSplit>({
    defaultValues: defaultValues,
    mode: 'all',
    resolver: yupResolver(breakUpFormSchema) as unknown as Resolver<FormSplit>,
  });
  const { fields } = useFieldArray({
    name: FIELDNAME,
    control,
  });
  const totalQty = _.reduce(watch().breakUps, (total, value) => parseFloat(`${value?.quantity || 0}`) + total, 0);
  return (
    <Dialog onClose={handleClose} fullWidth maxWidth="xs" aria-labelledby="customized-dialog-title" open={name ? name === modelName && open : open}>
      <Paper
        sx={{
          ...formPaper,
        }}
      >
        <TableWrapper
          scrollSx={{
            overflow: 'auto',
            minHeight: '20rem',
            maxHeight: 'calc(80vh - 220px)',
          }}
          stickyHeader
        >
          <TableHeader
            headLabel={[
              { id: 'available_qty', label: 'Month' },
              { id: 'with_draw_qty', label: 'Quantity - ' + watch('maximumQuantity') },
            ]}
          />
          <TableBody>
            {_.map(fields, (row, index) => (
              <TableRow key={row.id}>
                <TableItem minWidth={100}>
                  <Typography>
                    {row.month?.label} {row.month?.year}
                  </Typography>
                </TableItem>
                <TableItem width={80}>
                  <NumberInputField
                    name={`${FIELDNAME}.${index}.quantity` as never}
                    control={control}
                    toFixed={0}
                    // max={defaultValues?.productQtySplit?.[index]?.maximumQuantity}
                    fieldProps={{
                      placeholder: 'QTY',
                    }}
                    // onChange={(e) => handleWithDrawQty(index, e as number)}
                  />
                </TableItem>
              </TableRow>
            ))}
            <TableRow>
              <TableItem minWidth={100}>
                <Typography>Total</Typography>
              </TableItem>
              <TableItem width={80}>
                <DummyField value={totalQty} />
              </TableItem>
            </TableRow>
          </TableBody>
        </TableWrapper>

        <FormHelperText error={true}>* Total Must Equal to {watch('maximumQuantity')} Quantity</FormHelperText>
        <FormFooter
          dividerRemove={false}
          type="button"
          gridProps={{
            mb: 0,
            md: 3,
          }}
          disabled={!isValid}
          addMoreButton={[
            {
              label: 'Cancel',
              type: 'button',
              variant: 'outlined',
              onClick: () => handleClose(),
            },
          ]}
          onClick={handleSubmit(handleDataSumbit)}
        />
      </Paper>
    </Dialog>
  );
}

export default AddBreakUpPopup;
