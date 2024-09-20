import { Box, CircularProgress, Typography } from "@mui/material";
import { notify } from "../../../../utils/helpers/globalHelper";
import { useSendMailApi } from "../../../../store/hooks/authHooks";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";

export default function ResendOtp() {
	const { mutateAsync: reSendMail } = useSendMailApi();

	const [timer, setTimer] = useState(60); // Start with a 60-second timer
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const {
		watch,
		formState: { isSubmitting },
	} = useFormContext<ForgotPassword>();

	const handleSendMail = async () => {
		try {
			const res = await reSendMail(watch());
			// setValue("step", 1);
			notify(res);
		} catch (error) {
			notify(error);
		}
	};

	useEffect(() => {
		if (timer > 0) {
			const countdown = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);

			// Clear the interval when the component unmounts or when the timer reaches 0
			return () => clearInterval(countdown);
		} else {
			setIsButtonDisabled(false);
		}
	}, [timer]);

	return (
		<Box
			display="flex"
			justifyContent="flex-end"
			width={{ xs: "100%", md: "75%" }}
			mt={2}
		>
			<Typography
				variant="f16"
				color="#88344C"
				mb={1}
				textAlign="end"
				sx={{ cursor: "pointer" }}
				onClick={() => handleSendMail()}
			>
				{isButtonDisabled ? timer + "s" : isSubmitting ? <CircularProgress size={5} /> : "Resend"}
			</Typography>
		</Box>
	);
}
