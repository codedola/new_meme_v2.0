import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
// default value init

const reEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function LoginForm({ handleLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    const onSubmit = useCallback(
        (initForm) => {
            const { email, password } = initForm;
            handleLogin &&
                typeof handleLogin === "function" &&
                handleLogin({ email, password });
        },
        [handleLogin]
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
                            {...register("email", {
                                required: true,
                                pattern: reEmail,
                            })}
                        />{" "}
                        {errors?.email?.type === "required" && (
                            <span className='message'>
                                Yêu cầu nhập trường này !
                            </span>
                        )}
                        {errors?.email?.type === "pattern" && (
                            <span className='message'>
                                email không hợp lệ !
                            </span>
                        )}
                    </div>
                    <div className='ass1-login__control'>
                        <input
                            type={showPassword ? "text" : "password"}
                            className='form-control'
                            placeholder='Mật khẩu'
                            {...register("password", {
                                required: true,
                            })}
                        />
                        {errors?.password?.type === "required" && (
                            <span className='message'>
                                Yêu cầu nhập trường này !
                            </span>
                        )}

                        <FontAwesomeIcon
                            onClick={handleShowPassword}
                            icon={showPassword ? faEyeSlash : faEye}
                        />
                    </div>

                    <div className='ass1-login__send'>
                        <button
                            type='submit'
                            className='ass1-btn'
                            onClick={handleSubmit(onSubmit)}
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
