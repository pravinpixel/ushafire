import { IconButton } from '@mui/material';

import { ViewIcon } from 'theme/svg';

import { useRouter } from 'helper/CustomHooks';

type Props = {
  url?: string;
  id?: string;
};
const ViewButton = ({ url, id }: Props) => {
  const { pushById } = useRouter();
  return (
    <IconButton
      onClick={() =>
        pushById({
          path: url,
          id: id,
        })
      }
    >
      <ViewIcon />
    </IconButton>
  );
};

export default ViewButton;
