import React from "react";

import { Box, SxProps } from "@mui/material";
import { NAV } from "../../../utils/constants";

// ----------------------------------------------------------------------

type Mainprops = {
	children?: React.ReactNode;
	sx?: SxProps;
	show: boolean;
};

/**
 * This file is part of AutoPack.
 *
 * It is Main children pass in this  auth children
 *
 */
export default function Main({ children, show }: Mainprops) {
	const p =  NAV.CHILDMARGIN * 2
	return (
		<Box sx={{
			width: "100%",
			maxWidth : `calc(100vw - ${p}px)`,
			overflowX : "hidden",
			padding : `0px 0px 0px ${show ? NAV.CHILDMARGIN : 0}px`,
		}}>
			{children}
		</Box>

	);
}
