import { styled } from '@mui/system';
import LinearProgress from '@mui/material/LinearProgress';
// styles

const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%',
});

const PageLoader = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

export default PageLoader;
