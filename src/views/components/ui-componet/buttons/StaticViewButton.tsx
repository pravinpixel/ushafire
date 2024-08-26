import { IconButton } from '@mui/material';

import { ViewIcon } from 'theme/svg';

import { useRouter } from 'helper/CustomHooks';

type Props = {
  url: string;
  id?: string;
};

/**
 * This file is part of AutoPack.
 *
 * This is used to view the page by based dynamic route
 */
const StaticViewButton = ({ url, id }: Props) => {
  const { push } = useRouter();
  return (
    <IconButton onClick={() => push(url + '/view/' + id)}>
      <ViewIcon />
    </IconButton>
  );
};

export default StaticViewButton;
