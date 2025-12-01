const { Booking, Op } = require('../models');

class BookingRepository {

    async save(bookingData) {
        return await Booking.create(bookingData);
    }

    async findById(id) {
        return await Booking.findByPk(id);
    }

    async findByUser(userId) {
        return await Booking.findAll({
            where: {userId}
        });
    }

    async findActiveByHallAndDate(hallId, startTime, endTime) {
        const { Op } = require("sequelize");
        
        return await Booking.findAll({
            where: {
                hallId: hallId,
                status: 'CONFIRMED',
                [Op.and]: [
                    {
                        startTime: {
                            [Op.lt]: endTime
                        }
                    },
                    {
                        endTime: {
                            [Op.gt]: startTime
                        }
                    }
                ]
            }
        });
    }

    async cancel(id) {
        return await Booking.update(
            { status: 'CANCELLED' },
            { where: {id} }
        )
    }
}

module.exports = new BookingRepository();