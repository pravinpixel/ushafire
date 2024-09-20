import { Box, FormHelperText, FormLabel, IconButton, Stack, Typography } from "@mui/material";
import { useRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import UploadDocs from "../UploadDocs";
import { uploadAccecpt, uploadValidationFile } from "../../../utils/helpers/globalHelper";
import { UploadDocuments } from "../../../utils/theme/svg";

type uploadDocType = {
	label: string;
	placeholder: string;
	name: string;
};

const UploadFile = (props: uploadDocType) => {
	const { label,
		placeholder, name } = props;


	const {
		control,
	} = useFormContext();


	const { field, fieldState: { error } } = useController({
		control,
		name,
		defaultValue: [],
	});

	const { field: deleteFile } = useController({
		control,
		name: name + '_deleted',
		defaultValue: [],
	});

	const files = field?.value as DocumentsType[]
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const eventFile = Array.from(event?.target?.files || []) as unknown as DocumentsType[]
		const allfiles = uploadValidationFile([...files, ...eventFile] as DocumentsType[])
		if (allfiles?.length > 0) {
			const newFiles = Array.from(allfiles).slice(-5);
			field.onChange(newFiles);
		} else {
			field.onChange([]);
		}
	};

	const handleCancelClick = (fileToRemove: DocumentsType) => {
		if (fileToRemove?.id) {
			deleteFile.onChange([...deleteFile.value, fileToRemove?.id])
		}
		const updatedFiles = files.filter((file) => file !== fileToRemove);
		field.onChange(updatedFiles);
	};

	const ref = useRef<HTMLInputElement>(null);

	const handleTrigger = () => {
		files?.length < 5 && ref.current?.click();
	};



	return (
		<>
			<Box sx={{
				'& .MuiIconButton-root:hover': {
					background: "#f2dde3 !important"
				}
			}}>
				<FormLabel>{label}</FormLabel>

				{
					<Stack
						onClick={handleTrigger}
						direction={"row"}
						justifyContent={"space-between"}
						mt={1}
						sx={{
							padding: "9px",
							outline: ({ palette }) => `1px solid ${palette.primary.main}`,
							borderRadius: '7px',
							// minHeight:'42px'
						}}
					>
						<Typography
							sx={{
								padding: '5px 13px',
								color: files?.length > 0 ? 'rgba(5, 5, 5)' : 'rgba(5, 5, 5, 1)',
								opacity: '50%',
								fontSize: '16px',
								fontWeight: '400'
							}}
						>
							{files?.length > 0 ? files?.length + " Files uploaded" : placeholder || "Upload document"}
						</Typography>
						{files?.length < 5 && (
							<IconButton
								// onClick={handleTrigger}
								component="label"
								sx={{ background: "none", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 1.2, margin: 0.25 }}
							>
								{/* <img
									src={uploadIcon}
									width={20}
									height={20}
									 alt="upload"
								/> */}
								<UploadDocuments sx={{ width: 20, height: 20 }} />
							</IconButton>
						)}
					</Stack>
				}
				<input
					type="file"
					multiple
					hidden
					ref={ref}
					accept={uploadAccecpt}
					onChange={handleFileChange}
				/>
				{
					error && <FormHelperText error={!!error?.message}>{error?.message}</FormHelperText>
				}


				{files?.length > 0 && (
					<Stack
						sx={{
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							gap: 2,
							maxWidth: 600,
						}}
					// marginInline={2}
					>
						{files.map((file) => (
							<UploadDocs
								document={file}
								key={String(file)}
								onClick={() => handleCancelClick(file)}
							/>
						))}
					</Stack>
				)}
			</Box>
		</>
	);
};

export default UploadFile;
