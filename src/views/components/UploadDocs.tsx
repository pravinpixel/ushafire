import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { document as documentImg } from "../../utils/helpers/assetHelper";
import { fontWeightRegular } from "../../utils/theme/typography";
import CloseIcon from "@mui/icons-material/Close";
import { MouseEvent } from "react";


type UploadDocsType = {
	document: DocumentsType,
	opacity?: number,
	onClick?: (e: unknown) => void,
}

const convertUrl = (document : DocumentsType) => {
	let name = document?.name
	const doc = document?.document?.split('/')?.slice(-1)?.[0] || ''
	name = name || doc
	return name
}

export default function UploadDocs({ document, onClick }: UploadDocsType) {

	

	const { id, document: fileUrl  } = document
	const handleRoute = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();
		if (id && fileUrl) {
			e.preventDefault();
			const a = window.document.createElement("a");
			a.setAttribute("href", fileUrl);
			a.setAttribute("target", "_blank");
			a.click();
		}
	};
	return (
		<>
			<Box
				sx={{
					border: "1px solid #939393",
					paddingInline: "8px",
					display: "inline-block",
					borderRadius: "8px",
					cursor : "pointer"
				}}
				onClick={(e) => handleRoute(e as never)}
				marginTop={1}
			>
				<Box
					sx={{
						position: "relative",
						display: "flex",
						flexWrap: "wrap",
						gap: "6px",
						alignItems: "center",
						marginBottom: "4px",
					}}
				>
					<Box sx={{ marginTop: "-5px" }}>
						<img
							src={documentImg}
							alt="Vector"
							width="16"
							height="18"

						/>
					</Box>
					{
						onClick && <IconButton
							sx={{
								position: "absolute",
								top: "-7px",
								right: "-12px",
								color: "black",
								width: "1px",
								height: "1px",
								backgroundColor: "red",
							}}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onClick && onClick(e);
							}}
						>
							<CloseIcon
								sx={{ width: "10px", height: "10px", color: "white" }}
							/>
						</IconButton>
					}



					<Typography
						color="black"
						variant="f14"
						sx={{
							marginTop: "3px",
							fontWeight: fontWeightRegular,
							maxWidth: 60,
							whiteSpace: "nowrap",
						}}
					>
						{convertUrl(document)}
					</Typography>
				</Box>
			</Box>
		</>
	);
}
