import { Backdrop, CircularProgress } from '@mui/material';

import PageLoader from './PageLoader';

const ContentLoader = ({ loading = true }: { loading?: boolean }) => (
  <>
    <PageLoader />
    <Backdrop sx={{ opacity: 0.5, color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
      <CircularProgress size={35} color="primary" />
    </Backdrop>
  </>
);

export default ContentLoader;
