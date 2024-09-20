import { FieldValues, FormProvider, useForm } from "react-hook-form";
import CustomButton from "../Button";
import { Box, SxProps } from "@mui/material";

interface FormLayoutTypes extends ReactComponentType {
	formSubmit: (values?: FieldValues) => void;
	sx?: SxProps;
	label?: string;
}

const FormLayout = ({ children, formSubmit, sx, label }: FormLayoutTypes) => {
	const form = useForm();
	const {
		handleSubmit,
		formState: { isSubmitting },
	} = form;
	return (
		<FormProvider {...form}>
			<Box
				component={"form"}
				onSubmit={handleSubmit(formSubmit)}
				sx={sx}
			>
				{children}
				<Box
					display="flex"
					justifyContent="center"
					sx={{ width: { xs: "100%", sm: "auto" } }}
				>
					<CustomButton
						sx={{ mt: 3, width: { xs: "100%", sm: "auto" } }}
						label={label}
						loading={isSubmitting}
						type="submit"
					/>
				</Box>
			</Box>
		</FormProvider>
	);
};

export default FormLayout;
