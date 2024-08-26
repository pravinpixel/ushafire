/**
 * This file is part of AutoPack.
 *
 * This is used to view specific page in new tab
 */
import { generatePath } from 'react-router-dom';

import { Box, IconButton } from '@mui/material';

import { ViewIcon } from 'theme/svg';

type Props = {
  url?: string;
  id?: string;
};

const ViewNewPageButton = ({ url, id }: Props) => {
  return (
    <Box component={'a'} target="_blank" href={generatePath(url ?? '/', { id: id ?? '' })}>
      <IconButton>
        <ViewIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default ViewNewPageButton;
