type ForgotPassword = {
    step?: number,
    email?: string,
    token?: string,
    password?: string;
    new_password?: string;
    phone_number?:string
}

type ChangePassword={
    old_password:string;
    new_password:string;
    confirm_password:string;
}