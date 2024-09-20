import * as yup from "yup";


export const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z^\s]{2,})+$/;
export const mobileRegExp = /^(\d{3}-\d{3}-\d{4}|\d{10})$/;
const LoginValidation = yup.object().shape({
	phone_number: yup
		.string()
		.required("Phone number is required")
		.matches(mobileRegExp, {message: "Please enter valid number.", excludeEmptyString: false}),
	password: yup.string().required("Password is required").min(6,"Password must be at least 6 characters"),
});
const whenStepIs = (expectedStep: number, schema: yup.StringSchema) => {
	return yup
		.string()
		.when("step", ([step]: number[]) => (step === expectedStep ? schema : yup.string().notRequired()));
};

const ForgotPasswordValidation = yup.object().shape({
	step: yup.number(),
	// email: whenStepIs(0, yup.string().email("Email must be a valid email").required("Email is required")),
	phone_number: whenStepIs(0, yup.string().required("Phone number is required").matches(mobileRegExp, {message: "Please enter valid number.", excludeEmptyString: false})),
	token: whenStepIs(1, yup.string().required("OTP is required")),
	password: whenStepIs(2, yup.string().required("Password is required").min(6,"Password must be at least 6 characters")),

	confirm_password: whenStepIs(
		2,
		yup
			.string()
			.required("Confirm Password is required")
			.oneOf([yup.ref("password")], "Passwords must match")
	),
});
const ChangePasswordValidation = yup.object().shape({
	old_password:yup.string().required("Old password is required"),
	new_password:yup.string().required("New password is required").min(6,"New password must be at least 6 characters"),
	confirm_password: yup.string().required("Confirm password is required").oneOf([yup.ref("new_password")], "Passwords must match")
})
const CreateTaskValidation = yup.object().shape({
	name: yup.string().required("Name is required"),
	description: yup.string().required("Description is required"),
	priority_id: yup.string().required("Select a priority"),
	assigned_to: yup.string().required("Select a Assigned To"),
	task_category_id: yup.string().required("Select a Task type"),
	// followers: yup.mixed().required("Select a Followers"),
	is_recurrence: yup.boolean(),
	documents: yup.mixed().required("Documents is required"),
	// date: yup.string().when(["is_recurrence"], ([is_recurrence], schema) => {
	// 	if (is_recurrence) {
	// 		return schema.notRequired();
	// 	} else {
	// 		return schema.required("Date is required");
	// 	}
	// }),
	additional_followers: yup.string().nullable().trim().test("additional_followers", "Please enter valid email", (value) => {
		if (!value) {
			return true;
		} else {
			const valueArray = String(value)?.split(",");
			const unValidError = valueArray?.filter((value) => !emailRegExp.test(String(value).trim().toLowerCase()));
			return unValidError?.length === 0;
		}
	}),
	deadline: yup.string().when(["is_recurrence"], ([is_recurrence], schema) => {
		if (is_recurrence) {
			return schema.notRequired();
		} else {
			return schema.required("Task due date is required");
		}
	}),
});

const CompletTaskPopupValidation = yup.object().shape({
	rating_remark: yup.string().required("Rating Remark is required"),
	task_rating: yup.number()
    .required('Rating is required')
    .min(1, 'Rating is required'),
});

export { LoginValidation, ForgotPasswordValidation, CreateTaskValidation, CompletTaskPopupValidation,ChangePasswordValidation };
