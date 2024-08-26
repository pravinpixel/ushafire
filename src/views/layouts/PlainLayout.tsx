/**
 * This file is part of AutoPack.
 *
 * Its is used to auth layout for login
 *
 * Reset password ,forgot password
 */
import { Grid, Link, Paper, Stack, useTheme, Typography } from '@mui/material';

import { loginImage, copyRightImage } from 'helper/AssetHelper';

import { paper } from '../../theme/css';

// ----------------------------------------------------------------------

export default function PlainLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        sx={{
          backgroundImage: `url(${loginImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPositionX: '75%',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={7}
        component={Paper}
        elevation={6}
        square
        sx={{
          ...paper({ theme: theme, bgcolor: theme.palette.grey[200] }),
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
        <Link href="#" variant="body2" display={'block'} textAlign={'center'}>
          Have issues signing in?
        </Link>
        <Typography textAlign={'center'}>Kindly contact your system administrator</Typography>
        <Stack alignItems={'center'} mt={'10vh'}>
          <img src={copyRightImage} style={{ width: 'max-content' }} />
        </Stack>
      </Grid>
    </Grid>
  );
}
