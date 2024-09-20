import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import Ratings from "./sidebar/Ratings";
import InputField from "./form-fields/InputField";
import CustomButton from "./Button";
import { fontWeightRegular } from "../../utils/theme/typography";
import { useStatusUpdate } from "../../store/hooks/taskHooks";
import { notify } from "../../utils/helpers/globalHelper";

const CompletePopupForm = (props: { handleClose: () => void, id: string }) => {
	const { handleClose, id } = props
	const {
		handleSubmit,
		formState : {isSubmitting}
	} = useFormContext<TaskFormType>();
	const { mutateAsync } = useStatusUpdate(id);
	const handleFormSubmit = async (values : TaskFormType) => {
		try {
			const data = {
				...values,
				status: 'completed' as never
			}
			const res = await mutateAsync(data)
			notify(res)
			handleClose()
		} catch (error) {
			notify(error)
		}
	}

	return (
		<Box
			component={"form"}
			onSubmit={handleSubmit(handleFormSubmit)}
		>
			<Box mt={3} >
				<Typography  variant="f16" color={'#88344C'} sx={{ fontWeight: fontWeightRegular }}>Rating</Typography>
			</Box>
			<Box mt={1}>
			<Ratings name="task_rating" />
			</Box>
			<Box mt={2}>
				<Typography variant="f16" color={'#88344C'} sx={{ fontWeight: fontWeightRegular }}>Remarks</Typography>
			</Box>
			<Box >
			<InputField name="rating_remark" placeholder="Write your remarks here..." multiline rows={5} />
			</Box>
			<Stack mt={3} direction={'row'} justifyContent={'space-between'}>
				<CustomButton variant="outlined" label="Cancel" onClick={handleClose} sx={{ padding: '5px 12px' }} />
				<CustomButton loading={isSubmitting} type="submit" label="Completed" sx={{ padding: '5px 12px' }} />
			</Stack>
		</Box>
	)
}

export default CompletePopupForm
