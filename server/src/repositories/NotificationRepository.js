const { Notification } = require('../models');

class NotificationRepository {

    async findByUserId(userId) {
        return await Notification.findAll({ 
            where: { userId }, 
            order: [['createdAt', 'DESC']]
        });
    }

}
module.exports = new NotificationRepository();