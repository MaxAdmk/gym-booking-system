import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            navigate('/profile');
        } catch (error) {
            alert('Login failed: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form">

                <input
                    {...register("email", { required: true })}
                    placeholder="Email"
                />
                {errors.email && <span className="error">Email is required</span>}

                <input
                    {...register("password", { required: true })}
                    placeholder="Password"
                    type="password"
                />
                {errors.password && <span className="error">Password is required</span>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
