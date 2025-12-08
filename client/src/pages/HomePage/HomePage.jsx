import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    // STATE
    const [services, setServices] = useState([]);
    const [halls, setHalls] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);

    const [filterCategory, setFilterCategory] = useState('All');
    const [filterLevel, setFilterLevel] = useState('All');
    const [filterAge, setFilterAge] = useState('All');

    const { user } = useAuth();
    const navigate = useNavigate();

    const [selectedService, setSelectedService] = useState(null);
    const [bookingData, setBookingData] = useState({ hallId: '', trainerId: '', date: '' });
    const [busySlots, setBusySlots] = useState([]);

    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00"
    ];

    // LOAD DATA
    useEffect(() => {
        const loadData = async () => {
            try {
                const [s, h, t] = await Promise.all([
                    api.get('/content/services'),
                    api.get('/content/halls'),
                    api.get('/content/trainers')
                ]);
                setServices(s.data);
                setFilteredServices(s.data);
                setHalls(h.data);
                setTrainers(t.data);
            } catch (e) { console.error("Failed to load content"); }
        };
        loadData();
    }, []);

    // FILTERS
    useEffect(() => {
        let result = services;

        if (filterCategory !== 'All')
            result = result.filter(s => s.category === filterCategory);

        if (filterLevel !== 'All')
            result = result.filter(s => s.difficultyLevel === filterLevel);

        if (filterAge !== 'All')
            result = result.filter(s => s.ageCategory === filterAge);

        setFilteredServices(result);
    }, [filterCategory, filterLevel, filterAge, services]);


    const categories = ['All', ...new Set(services.map(s => s.category))];
    const levels = ['All', ...new Set(services.map(s => s.difficultyLevel))];
    const ages = ['All', ...new Set(services.map(s => s.ageCategory || 'Adults'))];

    // BUSY SLOTS
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
            date: ''
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
        <div className="home_page_container">

            <section className="halls_section">
                <h1>Our Gym Halls</h1>
                <div className="halls_grid">
                    {halls.map(hall => (
                        <div key={hall.id} className="hall_card">
                            <img
                                src={hall.photoUrl || 'https://placehold.co/400x200?text=Gym+Hall'}
                                alt={hall.name}
                                className="hall_image"
                            />
                            <div className="hall_info">
                                <h3>{hall.name}</h3>
                                <p>📍 {hall.location}</p>
                                <p>👥 Capacity: {hall.capacity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <hr className="divider" />

            <section className="filters_section">
                <h3>Find your perfect activity</h3>

                <div className="filters_container">
                    <div className="filter_group">
                        <label>Sport Type:</label>
                        <select onChange={e => setFilterCategory(e.target.value)}>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="filter_group">
                        <label>Level:</label>
                        <select onChange={e => setFilterLevel(e.target.value)}>
                            {levels.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                    </div>

                    <div className="filter_group">
                        <label>Age Group:</label>
                        <select onChange={e => setFilterAge(e.target.value)}>
                            {ages.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>
                </div>
            </section>

            <hr className="divider" />

            <h1 id='sport_section_h1'>Sport Sections</h1>

            <div className="service_section">
                {filteredServices.length > 0 ? (
                    filteredServices.map(service => (
                        <div className="service" key={service.id}>
                            <h3>{service.name}</h3>

                            <div className="service_tags">
                                <span className="tag category">{service.category}</span>
                                <span className="tag level">{service.difficultyLevel}</span>
                                <span className="tag age">{service.ageCategory || 'All Ages'}</span>
                            </div>

                            <p className="service_desc">
                                {service.description || 'No description available.'}
                            </p>

                            <button className="book_button" onClick={() => handleBookClick(service)}>
                                Book Now
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no_services_text">No services match your filters.</p>
                )}
            </div>

            {selectedService && (
                <div className="modal_backdrop">
                    <div className="modal_box">
                        <h2>Book {selectedService.name}</h2>

                        <div className="modal_inputs">
                            <label>Date:
                                <input type="date" onChange={e => setBookingData({ ...bookingData, date: e.target.value })} />
                            </label>

                            <label>Hall:
                                <select
                                    value={bookingData.hallId}
                                    onChange={e => setBookingData({ ...bookingData, hallId: e.target.value })}
                                >
                                    {halls.map(h => (
                                        <option key={h.id} value={h.id}>{h.name}</option>
                                    ))}
                                </select>
                            </label>

                            <label>Trainer:
                                <select
                                    value={bookingData.trainerId}
                                    onChange={e => setBookingData({ ...bookingData, trainerId: e.target.value })}
                                >
                                    {trainers.map(t => (
                                        <option key={t.id} value={t.id}>
                                            {t.firstName} {t.lastName}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        {bookingData.date && (
                            <div>
                                <h4>Select Time:</h4>
                                <div className="modal_times">
                                    {timeSlots.map(time => {
                                        const isBusy = busySlots.includes(time);
                                        return (
                                            <button
                                                key={time}
                                                disabled={isBusy}
                                                onClick={() => !isBusy && submitBooking(time)}
                                                className={`time_button ${isBusy ? 'busy' : 'free'}`}
                                            >
                                                {time}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <button className="cancel_button" onClick={() => setSelectedService(null)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default HomePage;
