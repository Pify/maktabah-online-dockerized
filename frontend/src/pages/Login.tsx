import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import apiClient from "../api/ApiClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LoadingButton from "../components/LoadingButton";
import { useAuthStore } from "../auth/AuthStore";
import { LoginRequest } from "../types";

function Login() {
    const navigate = useNavigate();
    const [message, setMessage] = useState<String>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<LoginRequest>({
        mode: 'all'
    });

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    const onSubmit: SubmitHandler<LoginRequest> = async (data: LoginRequest) => {
        const isValid = await trigger();

        if (isValid) {
            setLoading(true);
            try {
                const res = await apiClient.post('/auth/login', {
                    email: data.email,
                    password: data.password
                });
                
                const { user, token } = res.data;
                useAuthStore.getState().login(user, token);

                setMessage('Login successful!');
                navigate('/dashboard');
            } catch (err) {
                setMessage('Login failed. Check your credentials.');
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

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className='mb-3 text-start'>
                    <label className='form-label'>Email</label>
                    <input
                        type='email'
                        className='form-control'
                        placeholder="user@example.com"
                        {...register('email', {
                            required: 'Email is required', pattern: {
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
                            })}
                        />
                        <FontAwesomeIcon
                            className="position-absolute top-50 end-0 translate-middle-y me-3"
                            icon={showPassword ? faEyeSlash : faEye}
                            onClick={togglePasswordVisibility}
                            style={{ cursor: 'pointer' }} />
                    </div>
                    {errors.password && (
                        <p className='text-danger'>{errors.password.message as String}</p>
                    )}
                </div>

                <LoadingButton type="submit" loading={loading} >
                    Sign in
                </LoadingButton>
                <br />
                <label>
                    Dont have account?
                    <a
                        className="link-primary"
                        onClick={() => navigate('/register')}> Register here</a>
                </label>
            </form>
        </div>
    );
}

export default Login;