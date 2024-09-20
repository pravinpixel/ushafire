import { LoadingButton, LoadingButtonProps } from "@mui/lab"

interface CustomButtonType extends LoadingButtonProps {
  label?: string;
}

function CustomButton(props: CustomButtonType) {
  const {
    label,
    loading = false
  } = props
  return (
    <LoadingButton {...props} loading={loading}>{label}</LoadingButton>
  )
}

export default CustomButton