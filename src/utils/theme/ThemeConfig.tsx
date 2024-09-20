import { useMemo } from "react";

import { Theme, Shadows, useTheme, createTheme, ThemeProvider as MUIThemeProvider, ThemeOptions } from "@mui/material/styles";

import { palette } from "./palette";
import { shadows } from "./shadows";
import { overrides } from "./overrides";
import { typography } from "./typography";
import { customShadows } from "./custom-shadows";

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
	const theme = useTheme();
	const memoizedValue = useMemo(
		() => ({
			palette: palette(),
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
		[theme]
	);
	const overRideTheme: Theme = createTheme(memoizedValue as ThemeOptions);
	overRideTheme.components = overrides(overRideTheme) as never
	return (
		<MUIThemeProvider theme={overRideTheme}>
			{children}
		</MUIThemeProvider>
	);
}
