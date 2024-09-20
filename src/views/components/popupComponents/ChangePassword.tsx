import { FormProvider, useForm } from "react-hook-form";
import ChangePasswordForm from "../completedTask/ChangePasswordForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordValidation } from "../../../utils/helpers/validation";


const ChangePassword = (props: { handleClose: () => void}) => {
    const {handleClose}=props;
    const form = useForm({
        resolver: yupResolver(ChangePasswordValidation),
        mode: "onSubmit",
      })
  return (
    <div>
      <FormProvider {...form}>

<ChangePasswordForm handleClose={handleClose}/>
      </FormProvider>
    </div>
  )
}

export default ChangePassword
