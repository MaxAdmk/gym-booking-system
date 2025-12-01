import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const { register: registerUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async(data) => {
        try {
            await registerUser(data);
            alert('Registration successfull! Please login.');
            navigate('/login');
        } catch (error) {
            alert('Registration failed: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <input
                    {...register("email", { required: true })}
                    placeholder = "Email"
                    type="email"
                />
                {errors.password && <span style={{color: 'red'}}>Email is required</span>}

                <input
                    {...register("password", {required: true, minlength: 6})}
                    placeholder="Password (min 6 chars)"
                    type="password"
                />
                {errors.password && <span style={{color: 'red'}}>Password too short</span>}

                <input {...register("firstName", {required: true})} placeholder='First Name'/>
                <input {...register("lastName", {required: true})} placeholder='Last Name'/>
                <input {...register("phone")} placeholder='Phone'/>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;