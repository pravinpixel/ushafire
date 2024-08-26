import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { Theme, Shadows, useTheme, createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { palette } from 'theme/palette';
import { shadows } from 'theme/shadows';
import { overrides } from 'theme/overrides';
import { typography } from 'theme/typography';
import { customShadows } from 'theme/custom-shadows';

// ----------------------------------------------------------------------

export interface ThemeProps extends Theme {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: any;
}

export default function ThemeProvider({ children, customTheme }: { children: React.ReactNode; customTheme: object | null }) {
  const theme = useTheme();
  const memoizedValue = useMemo(
    () => ({
      palette: palette(customTheme),
      typography,
      shadows: shadows(theme) as Shadows,
      customShadows: customShadows(theme),
      shape: { borderRadius: 8 },
      transitions: {
        duration: {
          shortest: 150,
          shorter: 200,
          short: 250,
          standard: 300,
          complex: 375,
          enteringScreen: 400,
          leavingScreen: 400,
        },
      },
    }),
    [customTheme, theme]
  );

  const overRideTheme: ThemeProps = createTheme(memoizedValue);
  overRideTheme.components = overrides(overRideTheme);
  return (
    <MUIThemeProvider theme={overRideTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
