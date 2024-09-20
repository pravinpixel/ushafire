import { FormProvider, useForm } from "react-hook-form";
import ForgotPasswordSteps from "../_utils/ForgotPasswordSteps";
import { yupResolver } from "@hookform/resolvers/yup";
import {  ForgotPasswordValidation } from "../../../../utils/helpers/validation";

const ForgotPassword = () => {
	const form = useForm<ForgotPassword>({
		defaultValues: {
			step: 0
		},
		resolver:yupResolver( ForgotPasswordValidation),
		mode:"onSubmit",
	});
	const { watch,} = form
	const step = watch('step') || 0
	return (
		<FormProvider {...form}>
			<ForgotPasswordSteps step={step} />
		</FormProvider>
	)
}

export default ForgotPassword