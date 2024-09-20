import {Stack } from "@mui/material";

function Header({ show }: { show: boolean }) {
	return (
		<Stack
			sx={{
				display: show ? "none" : "flex",
			}}
		>
			{/* <Paper variant="elevation">You have 4 task to complete</Paper> */}
		</Stack>
	);
}

export default Header;
