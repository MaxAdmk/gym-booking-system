import { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('service');

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>🛠️ Admin Dashboard</h1>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setActiveTab('service')} disabled={activeTab === 'service'}>Add Service</button>
                <button onClick={() => setActiveTab('hall')} disabled={activeTab === 'hall'}>Add Hall</button>
                <button onClick={() => setActiveTab('trainer')} disabled={activeTab === 'trainer'}>Add Trainer</button>
            </div>

            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                {activeTab === 'service' && <ServiceForm />}
                {activeTab === 'hall' && <HallForm />}
                {activeTab === 'trainer' && <TrainerForm />}
            </div>
            // Додайте це в AdminPage.jsx (наприклад, біля кнопок вкладок)
            <button onClick={async () => {
                await api.post('/admin/reminders');
                alert('Reminders sent!');
            }} style={{background: 'orange'}}>⚡ Send Reminders</button>
        </div>
    );
};

const ServiceForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        try {
            await api.post('/admin/services', data);
            alert('Service created!');
            reset();
        } catch (e) { alert('Error: ' + e.message); }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3>New Service</h3>
            <input {...register('name')} placeholder="Name (e.g. Yoga)" required />
            <input {...register('category')} placeholder="Category (e.g. Relax)" required />
            <input {...register('difficultyLevel')} placeholder="Difficulty (Easy/Hard)" required />
            <textarea {...register('description')} placeholder="Description" />
            <button type="submit">Create Service</button>
        </form>
    );
};

const HallForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        try {
            await api.post('/admin/halls', data);
            alert('Hall created!');
            reset();
        } catch (e) { alert('Error: ' + e.message); }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3>New Gym Hall</h3>
            <input {...register('name')} placeholder="Name (e.g. Main Hall)" required />
            <input {...register('capacity')} type="number" placeholder="Capacity" required />
            <input {...register('location')} placeholder="Location (e.g. Floor 2)" required />
            <button type="submit">Create Hall</button>
        </form>
    );
};

const TrainerForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        try {
            await api.post('/admin/trainers', data);
            alert('Trainer created!');
            reset();
        } catch (e) { alert('Error: ' + e.message); }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3>New Trainer</h3>
            <input {...register('firstName')} placeholder="First Name" required />
            <input {...register('lastName')} placeholder="Last Name" required />
            <textarea {...register('bio')} placeholder="Bio" />
            <button type="submit">Create Trainer</button>
        </form>
    );
};

export default AdminPage;