import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FileUpload from '../../components/FileUpload';
import api from '../../services/api';
import './AdminPage.css';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('service');

    return (
        <div className="admin-container">
            <h1>🛠️ Admin Dashboard</h1>

            <div className="admin-tabs">
                <button onClick={() => setActiveTab('service')} disabled={activeTab === 'service'}>Services</button>
                <button onClick={() => setActiveTab('hall')} disabled={activeTab === 'hall'}>Halls</button>
                <button onClick={() => setActiveTab('trainer')} disabled={activeTab === 'trainer'}>Trainers</button>
                <button onClick={() => setActiveTab('users')} disabled={activeTab === 'users'} className="btn-blue">Users</button>
                <button onClick={() => setActiveTab('booking')} disabled={activeTab === 'booking'} className="btn-purple">Bookings</button>
            </div>

            <div className="admin-content-box">
                {activeTab === 'service' && <ResourceManager type="service" />}
                {activeTab === 'hall' && <ResourceManager type="hall" />}
                {activeTab === 'trainer' && <ResourceManager type="trainer" />}
                {activeTab === 'users' && <UserManager />}
                {activeTab === 'booking' && <BookingManager />}
            </div>

            <div className="reminder-box">
                <button
                    onClick={async () => {
                        try {
                            await api.post('/admin/reminders');
                            alert('✅ Reminders sent successfully!');
                        } catch (e) {
                            alert('❌ Error sending reminders');
                        }
                    }}
                    className="btn-orange"
                >
                    ⚡ Send Daily Reminders
                </button>
            </div>
        </div>
    );
};


const ResourceManager = ({ type }) => {
    const [items, setItems] = useState([]);
    
    const [allServices, setAllServices] = useState([]);
    const [allTrainers, setAllTrainers] = useState([]);

    const { register, handleSubmit, reset, setValue } = useForm();

    const fetchItems = async () => {
        try {
            const res = await api.get(`/content/${type}s`);
            setItems(res.data);
        } catch (e) { console.error(e); }
    };

    useEffect(() => { fetchItems(); }, [type]);

    useEffect(() => {
        if (type === 'hall') {
            const loadAuxData = async () => {
                try {
                    const [s, t] = await Promise.all([
                        api.get('/content/services'),
                        api.get('/content/trainers')
                    ]);
                    setAllServices(s.data);
                    setAllTrainers(t.data);
                } catch (e) { console.error("Failed to load aux data for hall", e); }
            };
            loadAuxData();
        }
    }, [type]);

    const onSubmit = async (data) => {
        try {
            await api.post(`/admin/${type}s`, data);
            alert(`${type} created successfully!`);
            reset();
            fetchItems();
        } catch (e) { alert('Error: ' + (e.response?.data?.error || e.message)); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            await api.delete(`/admin/${type}s/${id}`);
            setItems(items.filter(i => i.id !== id));
        } catch (e) { alert('Error deleting: ' + e.message); }
    };

    return (
        <div>
            <h3>Manage {type.charAt(0).toUpperCase() + type.slice(1)}s</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="form-box">
                {type === 'service' && (
                    <>
                        <input {...register('name')} placeholder="Service Name" required />
                        <input {...register('category')} placeholder="Category (e.g. Cardio)" required />
                        <input {...register('difficultyLevel')} placeholder="Difficulty (Easy/Medium/Hard)" required />
                        <input {...register('price')} placeholder="Price (UAH)" type="number" required />
                        <input {...register('ageCategory')} placeholder="Age Category (Adults/Kids)" />
                        <textarea {...register('description')} placeholder="Short description..." />
                    </>
                )}

                {type === 'hall' && (
                    <>
                        <input {...register('name')} placeholder="Hall Name" required />
                        <input {...register('capacity')} placeholder="Capacity" type="number" required />
                        <input {...register('location')} placeholder="Location (e.g. Floor 2)" required />
                        <FileUpload 
                            label="Hall Photo" 
                            onUpload={(url) => setValue('photoUrl', url)} 
                        />
                        <input type="hidden" {...register('photoUrl')} />

                        <div className="checkbox-group">
                            <strong>Allowed Services:</strong>
                            <div className="checkbox-grid">
                                {allServices.map(s => (
                                    <label key={s.id}>
                                        <input type="checkbox" value={s.id} {...register('serviceIds')} />
                                        {s.name}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="checkbox-group">
                            <strong>Assigned Trainers:</strong>
                            <div className="checkbox-grid">
                                {allTrainers.map(t => (
                                    <label key={t.id}>
                                        <input type="checkbox" value={t.id} {...register('trainerIds')} />
                                        {t.firstName} {t.lastName}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {type === 'trainer' && (
                    <>
                        <input {...register('firstName')} placeholder="First Name" required />
                        <input {...register('lastName')} placeholder="Last Name" required />
                        <textarea {...register('bio')} placeholder="Bio" />
                        <FileUpload 
                            label="Trainer Photo" 
                            onUpload={(url) => setValue('photoUrl', url)} 
                        />
                        <input type="hidden" {...register('photoUrl')} />
                    </>
                )}

                <button type="submit" className="btn-green">
                    Create New {type}
                </button>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Details</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name || `${item.firstName} ${item.lastName}`}</td>
                            <td>
                                {type === 'service' && `${item.price} UAH | ${item.category}`}
                                {type === 'hall' && `Cap: ${item.capacity} | ${item.location}`}
                                {type === 'trainer' && 'Trainer'}
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item.id)} className="btn-red">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const UserManager = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            setUsers(res.data);
        } catch (e) { console.error(e); }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
        try {
            await api.delete(`/admin/users/${id}`);
            setUsers(users.filter(u => u.id !== id));
            alert('User deleted');
        } catch (e) { alert('Error: ' + e.message); }
    };

    return (
        <div>
            <h3>👥 User Management</h3>
            <button onClick={fetchUsers} className="btn-refresh">Refresh List</button>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>#{u.id}</td>
                            <td>{u.firstName} {u.lastName}</td>
                            <td>{u.email}</td>
                            <td>
                                <span className={u.role === 'ADMIN' ? 'badge-admin' : 'badge-client'}>
                                    {u.role}
                                </span>
                            </td>
                            <td>
                                {u.role !== 'ADMIN' && (
                                    <button onClick={() => handleDelete(u.id)} className="btn-red">
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const BookingManager = () => {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const res = await api.get('/admin/bookings');
            setBookings(res.data);
        } catch (e) { console.error(e); }
    };

    useEffect(() => { fetchBookings(); }, []);

    const handleCancel = async (id) => {
        if (!confirm('Cancel this booking?')) return;
        try {
            await api.post(`/bookings/cancel/${id}`);
            alert('Booking cancelled');
            fetchBookings();
        } catch (e) { alert('Error: ' + e.message); }
    };

    return (
        <div>
            <h3>Manage All Bookings</h3>
            <button onClick={fetchBookings} className="btn-refresh">
                Refresh
            </button>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(b => (
                        <tr key={b.id}>
                            <td>{b.id}</td>
                            <td>#{b.userId}</td>
                            <td>{new Date(b.startTime).toLocaleString()}</td>
                            <td className={b.status === 'CONFIRMED' ? "status-green" : "status-red"}>
                                {b.status}
                            </td>
                            <td>
                                {b.status === 'CONFIRMED' && (
                                    <button onClick={() => handleCancel(b.id)} className="btn-orange-small">
                                        Cancel
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;