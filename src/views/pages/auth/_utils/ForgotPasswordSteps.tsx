import ChangePassWord from './ChangePassword';
import SendMail from './SendMail';
import VerifyOtp from './VerifyOtp';


const ForgotPasswordSteps = ({ step = 0 }: { step: number }) => {
    switch (step) {
        case 1:
            return <VerifyOtp />
        case 2:
            return <ChangePassWord />
        default:
            return <SendMail />
    }
}

export default ForgotPasswordSteps