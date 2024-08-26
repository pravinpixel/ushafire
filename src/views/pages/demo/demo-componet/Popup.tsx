import { Dialog } from '@mui/material';

type Props = {
  name?: string;
  handleClose?: () => void;
  open: boolean;
};

const Popup = ({ handleClose, open }: Props) => {
  return <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}></Dialog>;
};

export default Popup;
