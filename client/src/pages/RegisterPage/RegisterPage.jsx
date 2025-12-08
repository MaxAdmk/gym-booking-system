import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
    const { register: registerUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            alert('Registration failed: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="register-form">

                <input
                    {...register("email", { required: true })}
                    placeholder="Email"
                    type="email"
                />
                {errors.email && <span className="error">Email is required</span>}

                <input
                    {...register("password", { required: true, minLength: 6 })}
                    placeholder="Password (min 6 chars)"
                    type="password"
                />
                {errors.password && <span className="error">Password too short</span>}

                <input
                    {...register("firstName", { required: true })}
                    placeholder="First Name"
                />
                {errors.firstName && <span className="error">First Name is required</span>}

                <input
                    {...register("lastName", { required: true })}
                    placeholder="Last Name"
                />
                {errors.lastName && <span className="error">Last Name is required</span>}

                <input
                    {...register("phone")}
                    placeholder="Phone"
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
