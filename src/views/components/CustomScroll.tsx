import React, { memo, forwardRef } from "react";
import type { SimpleBarOptions } from "simplebar-core";

import Box from "@mui/material/Box";
import { Theme, SxProps } from "@mui/material";
import { StyledRootScrollbar, StyledScrollbar } from "../../utils/theme/StyleComponents";

// ----------------------------------------------------------------------
type ScrollBarProps = {
	children: React.ReactNode;
	sx?: SxProps<Theme>;
	other?: SimpleBarOptions;
};
const Scrollbar: React.ForwardRefExoticComponent<ScrollBarProps & React.RefAttributes<unknown>> = forwardRef(
	({ children, sx, other }: ScrollBarProps, ref) => {
		const userAgent = typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

		const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ;

		if (mobile) {
			return (
				<Box
					ref={ref}
					sx={{ overflow: "auto", ...sx }}
				>
					{children}
				</Box>
			);
		}

		return (
			<StyledRootScrollbar>
				<StyledScrollbar
					scrollableNodeProps={{
						ref,
					}}
					clickOnTrack={false}
					sx={sx}
					{...other}
				>
					{children}
				</StyledScrollbar>
			</StyledRootScrollbar>
		);
	}
);

export default memo(Scrollbar);
