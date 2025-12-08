import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { useForm } from 'react-hook-form'; 
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [notifications, setNotifications] = useState([]); 
    const [loading, setLoading] = useState(true);
    
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit } = useForm(); 

    const fetchData = async () => {
        if (!user) return;
        try {
            const [profRes, histRes, notifRes] = await Promise.all([
                api.get(`/profile/${user.id}`),
                api.get(`/bookings/user/${user.id}`),
                api.get(`/notifications/${user.id}`)
            ]);

            setProfileData(profRes.data);
            setBookings(histRes.data);
            setNotifications(notifRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [user]);

    const onEditSubmit = async (data) => {
        try {
            await api.put(`/profile/${user.id}`, data);
            alert('Profile updated successfully!');
            setIsEditing(false);
            window.location.reload(); 
        } catch (e) { 
            alert('Error updating profile: ' + (e.response?.data?.error || e.message)); 
        }
    };

    const handleBuyMembership = async (type) => {
        if (!confirm(`Buy ${type} membership?`)) return;
        try {
            await api.post('/profile/membership', { userId: user.id, type });
            alert('Membership purchased!');
            fetchData();
        } catch (error) {
            alert('Error: ' + error.response?.data?.error);
        }
    };

    if (!user) {
        return <div className="container">Please log in to view profile.</div>;
    }

    if (loading) return <div>Loading...</div>;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className='container'>
            <header className='profile_header'>
                <h1>👤 {user?.firstName}'s Profile</h1>
                <button onClick={handleLogout} className='logout_button'>Logout</button>
            </header>

            <section className='profile_info_section'>
                <div className="section_header">
                    <h3>Personal Info</h3>
                    <button className="edit_button" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                {isEditing ? (
                    <form onSubmit={handleSubmit(onEditSubmit)} className="edit_form">
                        <div className="form_group">
                            <label>First Name:</label>
                            <input {...register('firstName')} defaultValue={user.firstName} required />
                        </div>
                        <div className="form_group">
                            <label>Last Name:</label>
                            <input {...register('lastName')} defaultValue={user.lastName} required />
                        </div>
                        <div className="form_group">
                            <label>Phone:</label>
                            <input {...register('phone')} defaultValue={user.phone} placeholder="+380..." />
                        </div>
                        <button type="submit" className="save_button">Save Changes</button>
                    </form>
                ) : (
                    <div className="info_display">
                        <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone || 'Not set'}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </div>
                )}
            </section>

            <section className='notifications_section'>
                <h3>🔔 Notifications</h3>
                {notifications.length === 0 ? (
                    <p className="no_data">No new notifications.</p>
                ) : (
                    <ul className="notifications_list">
                        {notifications.map(n => (
                            <li key={n.id} className={n.isRead ? 'read' : 'unread'}>
                                <span className="notif_message">{n.message}</span>
                                <span className="notif_date">{new Date(n.createdAt).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <div className='features_information'>
                <section className='feature loyalty'>
                    <h3>💎 Loyalty Card</h3>
                    {profileData?.card ? (
                        <>
                            <p>Level: <strong>{profileData.card.level}</strong></p>
                            <p>Points: <strong>{profileData.card.pointBalance}</strong></p>
                        </>
                    ) : (
                        <p>No card found (Contact Admin)</p>
                    )}
                </section>

                <section className='feature membership'>
                    <h3>🎫 Membership</h3>
                    {profileData?.membership ? (
                        <>
                            <p>Type: <strong>{profileData.membership.type}</strong></p>
                            <p>Expires: {profileData.membership.endDate}</p>
                            <p style={{color: 'green', fontWeight: 'bold'}}>ACTIVE</p>
                        </>
                    ) : (
                        <div>
                            <p>No active membership.</p>
                            <div className='membership_buttons'>
                                <button onClick={() => handleBuyMembership('SINGLE')}>Buy Single</button>
                                <button onClick={() => handleBuyMembership('MONTHLY')}>Buy Monthly</button>
                                <button onClick={() => handleBuyMembership('CORPORATE')} className="corporate_btn">Buy Corporate</button>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            <section className='history_section' style={{ marginTop: '30px' }}>
                <h3>📅 Booking History</h3>
                {bookings.length === 0 ? <p className="no_data">No bookings yet.</p> : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr className='table_topline'><th>ID</th><th>Date</th><th>Status</th><th>Price</th></tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr className='table' key={b.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{padding:'8px'}}>#{b.id}</td>
                                    <td style={{padding:'8px'}}>{new Date(b.startTime).toLocaleString()}</td>
                                    <td style={{padding:'8px'}}>
                                        <span className={`status ${b.status.toLowerCase()}`}>{b.status}</span>
                                    </td>
                                    <td style={{padding:'8px'}}>{b.totalPrice} UAH</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
};

export default ProfilePage;