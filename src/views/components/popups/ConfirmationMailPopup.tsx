/**
 * This file is part of AutoPack.
 *
 * Its is send a mail
 * move the PO - Approval
 *
 */
import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Dialog, Typography } from '@mui/material';

import { notify } from 'helper/GlobalHelper';
import { useRouter, useModuleFinder } from 'helper/CustomHooks';

import { usePurchaseOrderSentMail } from 'store/hooks/SalesCrmSystemHook';

const ConfirmationMailPopup = ({
  handleClose,
  open,
  id,
  // loading = false,
}: {
  handleClose: () => void;
  open: boolean;
  // loading?: boolean;
  id: string;
}) => {
  const router = useRouter();
  const { find } = useModuleFinder();
  const path = find('stock-inward')?.path || '/';
  const { mutateAsync, isPending } = usePurchaseOrderSentMail();

  const handleSendMail = async (id: string) => {
    await mutateAsync(id, {
      onSuccess: (res) => {
        notify(res);
        router.push(path);
      },
      onError: (error) => {
        notify(error);
      },
    });
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <Stack
        sx={{ padding: 5, minHeight: '13.5rem', minWidth: '21.875rem', maxWidth: '30rem' }}
        textAlign={'center'}
        direction={'column'}
        justifyContent={'center'}
      >
        <Typography variant="subtitle2" fontWeight={500}>
          After the purchase order is raised, the information will be sent via email. Negotiations will take place offline, and the product will be
          received through stock inward procedures.
        </Typography>
        <Stack direction={'row'} mt={3} justifyContent={'center'}>
          <LoadingButton
            loading={isPending}
            variant="contained"
            onClick={() => {
              handleSendMail(id);
            }}
          >
            Continue
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ConfirmationMailPopup;
