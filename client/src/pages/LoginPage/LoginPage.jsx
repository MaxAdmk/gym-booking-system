import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto'}}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>

                <input
                    {...register("email", { required: true })}
                    placeholder="Email"
                />
                {errors.email && <span style={{color: 'red'}}>Email is required</span>}

                <input
                    {...register("password", { required: true })}
                    placeholder="Password"
                    type="password"
                />
                {errors.password && <span style={{color: 'red'}}>Password is required</span>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;