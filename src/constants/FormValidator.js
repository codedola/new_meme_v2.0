const FULLNAME_VALIDATOR = {
    messRequired: "Yêu cầu nhập trường này !",
};

const EMAIL_VALIDATOR = {
    pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    messRequired: "Yêu cầu nhập trường này !",
    messInvalid: "Email không hợp lệ !",
};

const PASSWORD_VALIDATOR = {
    minLength: 6,
    messRequired: " Yêu cầu nhập trường này !",
    messMinLength: "Mật khẩu ít nhất 6 ký tự !",
};

export { FULLNAME_VALIDATOR, EMAIL_VALIDATOR, PASSWORD_VALIDATOR };
