import { IconButton } from '@mui/material';

import { EditIcon } from 'theme/svg';

import { useRouter } from 'helper/CustomHooks';

type Props = {
  url: string;
  id?: string;
};

const EditButton = ({ url, id }: Props) => {
  const { push } = useRouter();
  return (
    <IconButton onClick={() => push(url + '/edit/' + id)}>
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;
