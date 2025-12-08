import { useState, useEffect } from 'react';
import api from '../services/api';
import './NotificationBell.css';

const NotificationBell = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        try {
            const res = await api.get(`/notifications/${userId}`);
            setNotifications(res.data);
            // Рахуємо тільки непрочитані (якщо у вас є така логіка, або просто всі)
            setUnreadCount(res.data.length); 
        } catch (e) { console.error("Notif error", e); }
    };

    // 1. Завантажуємо при старті і кожні 30 сек
    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, [userId]);

    // 2. 🔥 ВАЖЛИВО: Завантажуємо свіжі дані, коли відкриваємо вікно
    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
            setUnreadCount(0); // Скидаємо лічильник при відкритті
        }
    }, [isOpen]);

    return (
        <div className="notification-container">
            <div className="bell-icon" onClick={() => setIsOpen(!isOpen)}>
                🔔
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </div>

            {isOpen && (
                <div className="notification-dropdown">
                    <div className="dropdown-header">
                        <h4>Notifications</h4>
                        {/* 3. ❌ ДОДАЄМО ХРЕСТИК */}
                        <span className="close-btn" onClick={() => setIsOpen(false)}>✖</span>
                    </div>
                    
                    {notifications.length === 0 ? (
                        <p className="empty-msg">No notifications</p>
                    ) : (
                        <ul className="notif-list">
                            {notifications.map(n => (
                                <li key={n.id}>
                                    <p>{n.message}</p>
                                    <small>{new Date(n.createdAt).toLocaleString()}</small>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;