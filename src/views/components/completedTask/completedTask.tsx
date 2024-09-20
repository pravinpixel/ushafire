import { yupResolver } from "@hookform/resolvers/yup";
import CompletePopupForm from "../CompletePopupForm"
import { FormProvider, useForm } from "react-hook-form"
import { CompletTaskPopupValidation } from "../../../utils/helpers/validation";

const CompletedTask = (props: { handleClose: () => void, id: string | null}) => {
  const { handleClose, id } = props;
  
  const form = useForm({
    resolver: yupResolver(CompletTaskPopupValidation),
    mode: "onSubmit",
  });

  return (
    <div>
      <FormProvider {...form}>
        <CompletePopupForm handleClose={handleClose} id={id as never} />
      </FormProvider>
    </div>
  )
}

export default CompletedTask
