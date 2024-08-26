import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useRouter } from 'helper/CustomHooks';
import { unAuthroised } from 'helper/AssetHelper';

// ----------------------------------------------------------------------

export default function UnAuthorised() {
  const { back } = useRouter();
  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: 'fixed',
        p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
      }}
    ></Box>
  );

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            You don't have a access for this page!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>Kindly contact Admin</Typography>

          <Box
            component="img"
            src={unAuthroised}
            sx={{
              mx: 'auto',
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button onClick={() => back()} size="large" variant="contained">
            Go to Back
          </Button>
        </Box>
      </Container>
    </>
  );
}
