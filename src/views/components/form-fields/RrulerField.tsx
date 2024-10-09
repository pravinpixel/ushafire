import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { useController, useFormContext } from "react-hook-form";
import { ReactRRuleWidget } from "react-rrule-widget";

const StyledBox = styled(Box)(() => ({
	zIndex: 2,
	"& button": {
		"&:hover": {
			background: "unset",
			color: "black",
		},
	},
	"& .aspect-square": {
		border: "1px solid #88344C",
		color: "#88344C",
		"&:hover": {
			border: "1px solid #88344C",
			color: "#88344C",
		},
	},
}));



const CalenderComponent = (props: { readOnly: boolean }) => {
	const { ...allProps } = props
	allProps.readOnly = false
	return (
		<input className="custom-date-input"   {...allProps} type="date" />
	)

}

const RrulerField = (props: { name: string }) => {
	const { name } = props;
	const { control } = useFormContext();
	const { field } = useController({
		name,
		defaultValue: "",
		control,
	});
	const ruleValue = field?.value || "";
	return (
		<StyledBox>
			<ReactRRuleWidget
				{...field}
                value={ruleValue}
				config={{
					hideStart: false,
					count: 20,
					frequency: ["Weekly", "Monthly", "Yearly"],
					endOptions: ['after-executions', 'never', 'on-date']
				}}
				calendarComponent={CalenderComponent as unknown as React.ReactElement}
			/>
		</StyledBox>
	);
};

export default RrulerField;
