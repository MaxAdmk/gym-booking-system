import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const [services, setServices] = useState([]);
    const [halls, setHalls] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    const [selectedService, setSelectedService] = useState(null);
    const [bookingData, setBookingData] = useState({ hallId: '', trainerId: '', date: '' });
    const [busySlots, setBusySlots] = useState([]);

    const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

    useEffect(() => {
        const loadData = async () => {
            try {
                const [s, h, t] = await Promise.all([
                    api.get('/content/services'),
                    api.get('/content/halls'),
                    api.get('/content/trainers')
                ]);
                setServices(s.data);
                setHalls(h.data);
                setTrainers(t.data);
            } catch (e) { console.error("Failed to load content"); }
        };
        loadData();
    }, []);

    useEffect(() => {
        if (bookingData.date && bookingData.hallId) {
            const fetchBusySlots = async () => {
                try {
                    const res = await api.get(`/bookings/schedule?hallId=${bookingData.hallId}&date=${bookingData.date}`);
                    setBusySlots(res.data);
                } catch (e) { console.error(e); }
            };
            fetchBusySlots();
        } else {
            setBusySlots([]);
        }
    }, [bookingData.date, bookingData.hallId]);

    const handleBookClick = (service) => {
        if (!user) return navigate('/login');
        setSelectedService(service);
        setBookingData({
            hallId: halls[0]?.id || '',
            trainerId: trainers[0]?.id || '',
            date: '', 
        });
    };

    const submitBooking = async (time) => {
        if (!confirm(`Book for ${time}?`)) return;
        
        const startTime = new Date(`${bookingData.date}T${time}`);
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

        try {
            await api.post('/bookings', {
                userId: user.id,
                serviceId: selectedService.id,
                hallId: bookingData.hallId,
                trainerId: bookingData.trainerId,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString()
            });
            alert("Booking Successful!");
            setSelectedService(null);
        } catch (error) {
            alert("Failed: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className='home_page_container'>
            <h1>🏋️ Our Services</h1>
            <div className='service_section'>
                {services.map(service => (
                    <div className='service' key={service.id}>
                        <h3>{service.name}</h3>
                        <p>{service.category}</p>
                        <button className='book_button' onClick={() => handleBookClick(service)}>
                            Book Now
                        </button>
                    </div>
                ))}
            </div>

            {selectedService && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: 'white', padding: '30px', borderRadius: '10px', width: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2>Book {selectedService.name}</h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                            <label>Date: <input type="date" onChange={e => setBookingData({...bookingData, date: e.target.value})} /></label>
                            
                            <label>Hall: 
                                <select value={bookingData.hallId} onChange={e => setBookingData({...bookingData, hallId: e.target.value})}>
                                    {halls.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                                </select>
                            </label>

                            <label>Trainer: 
                                <select value={bookingData.trainerId} onChange={e => setBookingData({...bookingData, trainerId: e.target.value})}>
                                    {trainers.map(t => <option key={t.id} value={t.id}>{t.firstName} {t.lastName}</option>)}
                                </select>
                            </label>
                        </div>

                        {bookingData.date && (
                            <div>
                                <h4>Select Time:</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                                    {timeSlots.map(time => {
                                        const isBusy = busySlots.includes(time);
                                        return (
                                            <button 
                                                key={time} 
                                                onClick={() => !isBusy && submitBooking(time)}
                                                disabled={isBusy}
                                                style={{ 
                                                    padding: '10px', 
                                                    background: isBusy ? '#ccc' : '#28a745', 
                                                    color: 'white', 
                                                    border: 'none', 
                                                    cursor: isBusy ? 'not-allowed' : 'pointer'
                                                }}
                                            >
                                                {time}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <button onClick={() => setSelectedService(null)} style={{ marginTop: '20px', width: '100%', padding: '10px' }}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;