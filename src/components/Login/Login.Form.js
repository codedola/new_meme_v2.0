import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const initValue = {
    email: "",
    password: "",
};
export default function LoginForm({ handleLogin }) {
    const [initForm, setInitForm] = useState(initValue);
    const [showPassword, setShowPassword] = useState(false);

    const handleOnChangeData = useCallback(
        (keyFiled) => (e) => {
            setInitForm({
                ...initForm,
                [keyFiled]: e.target.value,
            });
        },
        [initForm]
    );

    const handleShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const { email, password } = initForm;
            handleLogin &&
                typeof handleLogin === "function" &&
                handleLogin({ email, password });
        },
        [initForm, handleLogin]
    );
    return (
        <div className='ass1-login__content'>
            <p>Đăng nhập</p>
            <div className='ass1-login__form'>
                <form>
                    <div className='ass1-login__control'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Email'
                            onChange={handleOnChangeData("email")}
                            value={initForm.email}
                            required
                        />
                        <span className='message'></span>
                    </div>
                    <div className='ass1-login__control'>
                        <input
                            type={showPassword ? "text" : "password"}
                            onChange={handleOnChangeData("password")}
                            value={initForm.password}
                            className='form-control'
                            placeholder='Mật khẩu'
                            required
                            autoComplete='off'
                        />
                        <span className='message'></span>
                        <FontAwesomeIcon
                            onClick={handleShowPassword}
                            icon={showPassword ? faEyeSlash : faEye}
                        />
                    </div>

                    <div className='ass1-login__send'>
                        <button
                            type='submit'
                            className='ass1-btn'
                            onClick={handleSubmit}
                        >
                            Đăng nhập
                        </button>
                        <Link to={PATHS.REGISTER}>Đăng ký một tài khoản</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
