import { useController, useFormContext } from "react-hook-form";

import { Box, ClickAwayListener, FormLabel, IconButton, InputAdornment } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

type DatePickerFieldType = {
	name: string;
	label?: string;
	fieldProps?: object;
};

import dayjs from "dayjs";
import { CalenderTask } from "../../../utils/theme/svg";
import { useState } from "react";


const DatePickerField = (props: DatePickerFieldType) => {
	const { name, fieldProps, label } = props;
	const { control } = useFormContext();
	const {
		field,
		fieldState: { error },
	} = useController({
		name,
		control,
		defaultValue: null,
	});
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(false);
	};
	const toggleDatePicker = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const checkDate = (dates?: Date | string) => {
		return dayjs(dates).isValid() && dates;
	};
	return (
		<Box
			width={"100%"}
			sx={{
				"& button": {
					background: "transparent",
					color: '#9F9F9F'
					// color: ({ palette }) => `${palette.primary.main}!important`,
				},
			}}
		>
			{/* <InputLabel required={fieldProps?.required}>{label}</InputLabel> */}
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer
					components={["DatePicker"]}
					sx={{
						paddingTop: "0px",

					}}
				>
					<ClickAwayListener onClickAway={handleClick} mouseEvent="onMouseDown">
						<Box sx={{ my: 2, display: "flex", flexDirection: "column", width: "100%" }}>
							<FormLabel sx={{ mb: 1 }}>{label}</FormLabel>
							<DatePicker
								label=""
								{...field}
								open={open}
								onOpen={() => setOpen(true)}
								onClose={() => setOpen(false)}
								className="date-field"
								format="DD/MM/YYYY"
								value={checkDate(field?.value) ? dayjs(field?.value) : null}
								minDate={dayjs().startOf('day')}
								onChange={(date) => {
									if (date) {

										field.onChange(dayjs(date).format("YYYY-MM-DD"));
									} else {
										field.onChange(null);
									}
								}}

								slotProps={{
									field: { clearable: true, onClear: () => field.onChange(null) },
									textField: {
										helperText: error?.message,
										error: !!error?.message,
										// placeholder: "Select Date",
										fullWidth: true,
										size: "small",
										...fieldProps,
										required: false,
										InputProps: {
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={toggleDatePicker}
														edge="end"
													>
														<CalenderTask />
													</IconButton>
												</InputAdornment>
											),
										},
									},
									popper: {
										placement: 'top-start',

									},
								}}
								// slots={{
								// 	openPickerIcon: CalenderTask
								// }}
								sx={{
									'& .MuiIconButton-root:hover': {
										background: "#f2dde3 !important"
									}
								}}
							// {...pickerProps}
							/>
						</Box>
					</ClickAwayListener>
				</DemoContainer>
			</LocalizationProvider>
			{/* <TextField size={'small'} variant="outlined" fullWidth error={!!error?.message} helperText={error?.message} {...field} {...fieldProps} /> */}
		</Box>
	);
};

/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
export default DatePickerField;
