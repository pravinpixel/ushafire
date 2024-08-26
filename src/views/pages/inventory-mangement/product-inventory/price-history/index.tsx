import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { ComponentProps } from 'helper/types/GlobalTypes';

import ViewPriceHistoryTable from '../_utils/ViewPriceHistoryTable';

const PriceHistory: React.FC<ComponentProps> = () => {
  const { id } = useParams();
  // const { push } = useRouter();
  // const handleSlideClose = () => push(permission.path);
  return (
    // <ClickAwayListener onClickAway={handleSlideClose}>
    <Box mt={7}>
      <ViewPriceHistoryTable id={id ?? ''} />
    </Box>
    // </ClickAwayListener>
  );
};

export default PriceHistory;
