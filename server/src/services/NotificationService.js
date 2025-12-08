const UserRepository = require('../repositories/UserRepository');
const Booking = require('../models/Booking');
const { Notification, SportService } = require('../models');
const { Op } = require('sequelize');

class NotificationService {

    async notifyUser(userId, message) {
        try {
            await Notification.create({ userId, message });
        } catch (error) {
            console.error('Failed to send notification: ', error);
        }
    }

    async sendPromoToAll(message) {
        const users = await UserRepository.findAll();

        const notifications = users.map(user => {
            return this.notifyUser(user.id, `PROMO: ${message}`)
        });

        await Promise.all(notifications);
    }

    async sendReminders() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const start = new Date(tomorrow.setHours(0,0,0,0));
        const end = new Date(tomorrow.setHours(23,59,59,999));

        // Checking for bookings for tomorrow
        const bookings = await Booking.findAll({
            where: {
                startTime: { [Op.between]: [start, end] },
                status: 'CONFIRMED'
            },
            include: [SportService]
        });

        for (const booking of bookings) {
            const time = new Date(booking.startTime).toLocaleDateString([], {hour: '2-digit', minute:'2-digit'});
            const msg = `Reminder: You have a ${booking.SportService?.name || 'training'} session tomorrow at ${time}!`;
            await this.notifyUser(booking.userId, msg);
        }

        return { count: bookings.length };
    }

}

module.exports = new NotificationService();