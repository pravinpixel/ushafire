import { Typography, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom"
import FormProvider from "../../../components/form-fields/FormProvider";
import userStore from "../../../../zustand/UserZustand"
import InputField from "../../../components/form-fields/InputField"
import { useTheme } from "@mui/material";
import { fontWeightBold } from "../../../../utils/theme/typography";

const ResetPassWord = () => {
  const navigate = useNavigate()
  const setToken = userStore().setToken
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Typography variant={isXs ? "f20" : "f32"} sx={{ fontWeight: fontWeightBold }} color='#88344C' mb={3} >Create new password</Typography>
      <FormProvider label='Submit' formSubmit={(vales) => {
        setToken(vales?.email)
        navigate('/task')
      }} sx={{
        display: 'flex',
        flexDirection: "column",
        gap: 1,
        minWidth: { xs: '100%', lg: '75%' },
        mb: { md: 5, xs: 3 },
      }}>
        <InputField name="password" label="New password" placeholder="Enter your new password " />
        <InputField name="confirm-password" label='Confirm password' placeholder="Enter your confirm password" />
      </FormProvider>
    </>
  )
}

export default ResetPassWord 
