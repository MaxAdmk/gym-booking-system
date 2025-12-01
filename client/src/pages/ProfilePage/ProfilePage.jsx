import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        if (!user) return;
        try {
            const profileRes = await api.get(`/profile/${user.id}`);
            setProfileData(profileRes.data);
            const historyRes = await api.get(`/bookings/user/${user.id}`);
            setBookings(historyRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [user]);

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

    if (loading) return <div>Loading...</div>;

    return (
        <div className='container'>
            <header className='profile_header'>
                <h1>👤 {user?.firstName}'s Profile</h1>
                <button onClick={logout} className='logout_button'>Logout</button>
            </header>

            <div className='features_information'>
                <section className='feature'>
                    <h3>💎 Loyalty Card</h3>
                    {profileData?.card ? (
                        <>
                            <p>Level: <strong>{profileData.card.level}</strong></p>
                            <p>Points: <strong>{profileData.card.pointsBalance}</strong></p>
                        </>
                    ) : (
                        <p>No card found (Register new account to get one)</p>
                    )}
                </section>

                <section className='feature'>
                    <h3>🎫 Membership</h3>
                    {profileData?.membership ? (
                        <>
                            <p>Type: <strong>{profileData.membership.type}</strong></p>
                            <p>Expires: {profileData.membership.endDate}</p>
                            <p style={{color: 'green'}}>ACTIVE</p>
                        </>
                    ) : (
                        <div>
                            <p>No active membership.</p>
                            <div className='not_active_membership_feature' style={{display:'flex', gap:'10px', marginTop:'10px', justifyContent: 'space-around'}}>
                                <button onClick={() => handleBuyMembership('SINGLE')}>Buy Single (1 Day)</button>
                                <button onClick={() => handleBuyMembership('MONTHLY')}>Buy Monthly (30 Days)</button>
                            </div>
                        </div>
                    )}
                </section>
            </div>
            
            <section style={{ marginTop: '30px' }}>
                <h3>📅 Booking History</h3>
                {bookings.length === 0 ? <p>No bookings yet.</p> : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr className='table_topline'><th>ID</th><th>Date</th><th>Status</th><th>Price</th></tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr key={b.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{padding:'8px'}}>#{b.id}</td>
                                    <td style={{padding:'8px'}}>{new Date(b.startTime).toLocaleString()}</td>
                                    <td style={{padding:'8px'}}>{b.status}</td>
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