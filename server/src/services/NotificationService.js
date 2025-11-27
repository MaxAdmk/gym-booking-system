const UserRepository = require('../repositories/UserRepository');
const { Notification } = require('../models');

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

}

module.exports = new NotificationService();