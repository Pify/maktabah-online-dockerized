import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LoadingButton from "../components/LoadingButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../api/ApiClient";
import { useNavigate } from "react-router-dom";
import { RegisterRequest } from "../types";

function Register() {
    const navigate = useNavigate();
    const [message, setMessage] = useState<String>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: { errors },
    } = useForm<RegisterRequest>({ mode: 'all' });

    const password = watch('password');

    const registerNewAccount: SubmitHandler<RegisterRequest> = async (data: RegisterRequest) => {
        const isValid = await trigger();

        if (isValid) {
            setLoading(true);
            try {
                await apiClient.post('/auth/register', {
                    email: data.email,
                    password: data.password,
                });
                setMessage('Success registering account!');
                navigate('/login');
            } catch (err) {
                setMessage('Register failed. Please check your data');
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="container d-flex flex-column p-2 border border-gray p-5 rounded">
            <img src="src/assets/catto.jpg" alt="he cooks" style={{ width: '400px', height: '200px' }} />
            {message && (
                <div className='alert alert-info container d-flex justify-content-between align-items-center'>
                    <div className="flex-grow-1 text-center">{message}</div>
                    <button type='button' className='btn-close ms-2' onClick={() => setMessage('')}></button>
                </div>
            )}

            <form onSubmit={handleSubmit(registerNewAccount)}>
                {/* Email */}
                <div className='mb-3 text-start'>
                    <label className='form-label'>Email</label>
                    <input
                        type='email'
                        className='form-control'
                        placeholder="user@example.com"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className='text-danger'>{errors.email.message as String}</p>
                    )}
                </div>

                {/* Password */}
                <div className='mb-3 text-start '>
                    <label className='form-label'>Password</label>
                    <div className="position-relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className='form-control pe-5'
                            {...register('password', {
                                required: 'Password is required',
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                                    message:
                                        'Min 8 chars including an uppercase letter, a lowercase letter,\n a number & a special char (!@#$%^&*)',
                                },
                            })}
                        />
                        <FontAwesomeIcon
                            className="position-absolute top-50 end-0 translate-middle-y me-3"
                            icon={showPassword ? faEyeSlash : faEye}
                            onClick={togglePasswordVisibility}
                            style={{ cursor: 'pointer' }} />
                    </div>
                    {errors.password && (
                        <p className='text-danger' style={{maxWidth: "400px"}}>{errors.password.message as String}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className='mb-3 text-start '>
                    <label className='form-label'>Confirm Password</label>
                    <input
                        type='password'
                        className='form-control'
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) =>
                                value === password || 'Password do not match',
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className='text-danger'>{errors.confirmPassword.message as String}</p>
                    )}
                </div>

                <LoadingButton type="submit" loading={loading} >
                    Register
                </LoadingButton>
            </form>
        </div>
    );
}

export default Register;