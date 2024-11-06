import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/material"
import { useFormContext } from "react-hook-form";
import { fontWeightMedium } from "../../../utils/theme/typography";
import InputField from "../form-fields/InputField";
import CustomButton from "../Button";
import { useChangePasswordApi } from "../../../store/hooks/authHooks";
import { notify } from "../../../utils/helpers/globalHelper";


const ChangePasswordForm = (props: { handleClose: () => void }) => {
    const { handleClose } = props;
    const {
		handleSubmit,
		formState : {isSubmitting}
	} = useFormContext<ChangePasswordType>();
    const {mutateAsync}=useChangePasswordApi()
    const handleFormSubmit = async (values:ChangePasswordType) => {
		try {
			const res = await mutateAsync(values)
			notify(res)
			handleClose()
		} catch (error) {
			notify(error)
		}
	}
  return (
    <Box component={"form"}
    onSubmit={handleSubmit(handleFormSubmit)}>
        <Box mt={2} >
				<Typography  variant="f16" color={'rgba(5, 5, 5, 1)'} sx={{ fontWeight: fontWeightMedium }}>Old password</Typography>
			</Box>
                <InputField name="old_password" placeholder="Enter your old password " mb={1} type="password"/>
                <Box mt={2} >
				<Typography  variant="f16" color={'rgba(5, 5, 5, 1)'} sx={{ fontWeight: fontWeightMedium }}>New password</Typography>
			</Box>
            <InputField name="new_password" placeholder="Enter your new password " mb={1} type="password" />
            <Box mt={2} >
				<Typography  variant="f16" color={'rgba(5, 5, 5, 1)'} sx={{ fontWeight: fontWeightMedium}}>Confirm password</Typography>
			</Box>
            <InputField name="confirm_password" placeholder="Enter your confirm password " mb={1} type="password"/>
            <Stack mt={3.5} direction={'row'} justifyContent={'space-between'}>
				<CustomButton variant="outlined" label="Cancel" onClick={handleClose} sx={{ padding: '5px 12px' }} />
				<CustomButton loading={isSubmitting} type="submit" label="Submit" sx={{ padding: '5px 12px' }} />
			</Stack>
    </Box>
  )
}

export default ChangePasswordForm
