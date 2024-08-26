import { IconButton } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

import { useRouter } from 'helper/CustomHooks';

type Props = {
  url: string;
  id?: string;
};

const CloneButton = ({ url, id }: Props) => {
  const { push } = useRouter();
  return (
    <IconButton onClick={() => push(url + '?role-id=' + id)}>
      <ContentCopy />
    </IconButton>
  );
};

export default CloneButton;
