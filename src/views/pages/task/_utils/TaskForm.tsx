import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useEssentailApi } from "../../../../store/hooks/essentailHooks";
import { useTaskCreate, useTaskUpdate } from "../../../../store/hooks/taskHooks";
import { notify } from "../../../../utils/helpers/globalHelper";
import { CreateTaskValidation } from "../../../../utils/helpers/validation";
import CustomButton from "../../../components/Button";
import CustomCheckbox from "../../../components/form-fields/Checkbox";
import DatePickerField from "../../../components/form-fields/DatePickerField";
import InputField from "../../../components/form-fields/InputField";
import RrulerField from "../../../components/form-fields/RrulerField";
import SelectField from "../../../components/form-fields/SelectField";
import UploadFile from "../../../components/form-fields/UploadFile";
import { useEffect } from "react";
import { RRule } from "rrule";
import AutoCompleteField from "../../../components/form-fields/AutoComplete";
import MultiAutoCompleteField from "../../../components/form-fields/MultipleAutoComplete";
import MentionField from "../../../components/form-fields/MentionField";


const TaskForm = ({
	handleClose = () => { },
	defaultValues,
}: {
	handleClose: () => void;
	defaultValues?: TaskFormType;
}) => {
	const form = useForm<TaskFormType>({
		resolver: yupResolver(CreateTaskValidation) as never,
		mode: "onSubmit",
		defaultValues,
	});

	const {
		handleSubmit,
		watch,
		reset,
		formState: { isSubmitting },
	} = form;
	const { mutateAsync } = useTaskCreate();
	const { mutateAsync: update } = useTaskUpdate();

	const rRuleEnable = watch("is_recurrence") || 0;

	const assignedTo = watch('assigned_to') || null

	const followers = watch('followers') || ""


	const disabledArray = assignedTo ? [String(assignedTo)] : []
	const disabledAssignedArray = followers ? followers?.split(',') : []

	const { data } = useEssentailApi({
		keys: ["employee", "priority", "task-category"],
	});

	const handleTask = async (value: TaskFormType) => {
		const formData = {
			...value,
			is_recurrence: value?.is_recurrence ? 1 : 0 as 0 | 1
		}
		try {
			if (value?.is_recurrence) {
				const rule = RRule.fromString(value?.recurrence || '');
				const startDate = rule.options.dtstart;
				const untilDate = rule.options.until;
				const frequency = rule.options.freq;

				const today = new Date();
				today.setHours(0, 0, 0, 0);

				// if (startDate < today) {
				// 	throw new Error("start date must be today or in the future");
				// }
				const isEditing = !!defaultValues?.id;
                const originalStartDate = defaultValues?.recurrence
                ? RRule.fromString(defaultValues?.recurrence).options.dtstart
				: null;
                if ((!isEditing || startDate.getTime() !== originalStartDate?.getTime()) && startDate < today) {
					throw new Error("Start date must be today or in the future");
				}
				if (startDate && untilDate && startDate.getTime() === untilDate.getTime()) {
					throw new Error("Start date and end date cannot be the same");
				}

				let minEndDate: Date | undefined;

				if (frequency === RRule.WEEKLY) {
					minEndDate = new Date(startDate);
					minEndDate.setDate(startDate.getDate() + 7);
				} else if (frequency === RRule.MONTHLY) {
					minEndDate = new Date(startDate);
					minEndDate.setMonth(startDate.getMonth() + 1);
				} else if (frequency === RRule.YEARLY) {
					minEndDate = new Date(startDate);
					minEndDate.setFullYear(startDate.getFullYear() + 1);
				}

				if (minEndDate && untilDate && untilDate < minEndDate) {
					let freqString = '';
					let requiredPeriod = '';
					switch (frequency) {
						case RRule.WEEKLY:
							freqString = 'weekly';
							requiredPeriod = "7 days";
							break;
						case RRule.MONTHLY:
							freqString = 'monthly';
							requiredPeriod = "1 month";
							break;
						case RRule.YEARLY:
							freqString = 'yearly';
							requiredPeriod = "1 year";
							break;
						default:
							freqString = 'none';
					}
					throw new Error(`For ${freqString}, end date must be at least ${requiredPeriod} after the start date`);
				}
			}

			if (!defaultValues?.id) {
				const res = await mutateAsync(formData);
				notify(res);
			} else {
				const res = await update(formData);
				notify(res);
			}
			handleClose();


		}
		catch (error) {
			notify(error);
		}
	};

	useEffect(() => {
		if (defaultValues) {
			reset(defaultValues);
		}
	}, [defaultValues, reset]);

	return (
		<Stack
			spacing={5}
			// p={2}
			className="reccurence"
		>
			<FormProvider {...form}>
				<Stack
					component={"form"}
					onSubmit={handleSubmit(handleTask)}
				>
					<Box mt={3}>
						<InputField
							name="name"
							label="Task subject"
							placeholder="Enter task name"
							size="small"
							mb={1}
						/>
					</Box>
					<Box mt={2}>
						{/* <InputField
							name="description"
							label="Task description"
							placeholder="Enter task description"
							multiline
							rows={5}
							mb={1}
						/> */}
							<MentionField options={data?.data?.employee} row={3} name="description" label="Task description" placeholder="Enter task description"/>
					</Box>
					<Box mt={2}>
						<SelectField
							name="task_category_id"
							label="Task type"
							options={data?.data?.["task-category"]}
						/>
					</Box>
					<Box mt={2}>
						<SelectField
							name="priority_id"
							label="Task priority"
							options={data?.data?.priority}
						/>
					</Box>
					<Box mt={2}>
						<UploadFile
							name="documents"
							label="Task documents"
							placeholder="Upload documents"
						/>
					</Box>

					<Box mt={2}>
						{/* <SelectField
							name="assigned_to"
							label="Task assigned to"
							options={data?.data?.employee}
							disabledArray={disabledAssignedArray}
						/> */}
						<AutoCompleteField 
						   name="assigned_to"
							label="Task assigned to"
							options={data?.data?.employee}
							disabledArray={disabledAssignedArray}
							/>
					</Box>
					<Box mt={2}>
						{/* <MultiSelectField
							name="followers"
							label="Followers"
							options={data?.data?.employee}
							disabledArray={disabledArray}
						/> */}
						<MultiAutoCompleteField 
						name="followers"
						label="Followers"
						options={data?.data?.employee}
						disabledArray={disabledArray}
						 />
					</Box>
					<Box mt={2}>
						<InputField
							name="additional_followers"
							label="Additional followers"
							placeholder="Please enter the followers' email addresses, separated by commas "
							mb={1}
						/>
					</Box>
					<Box mt={2}>
						<CustomCheckbox
							label="Recurrence"
							name="is_recurrence"
						/>
						{rRuleEnable ? (
							<>
								<RrulerField name="recurrence" />
								{/* <Box mt={2}>
									<DatePickerField
										name="deadline"
										label="Task Deadline"
									/>
								</Box> */}
							</>
						) : (
							<>
								{/* <Box mt={2}>
								<DatePickerField
									name="date"
									label="Task Date"
								/>
							</Box> */}
								<Box mt={2}>
									<DatePickerField
										name="deadline"
										label="Task due date"
									/>
								</Box>
							</>
						)}
					</Box>

					<Box
						sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}

					>
						<CustomButton
							label={`${defaultValues?.id ? "Update" : "Create"} Task`}
							sx={{ width: { xs: "100%", sm: "20%" }, mt: 5, whiteSpace: "nowrap" }}
							type="submit"
							loading={isSubmitting}
						/>
					</Box>
				</Stack>
			</FormProvider>
		</Stack>
	);
};

export default TaskForm;
