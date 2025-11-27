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

    async findActiveByHallAndDate(hallid, startTime, endTime) {

        const { Op, where } = require('sequelize');

        return await Booking.findAll({
            where: {
                hallId: hallid,
                status: 'CONFIRMED',
                [Op.or]: [
                    {
                        startTime: { [Op.between]: [startTime, endTime] }
                    },
                    {
                        endTime: { [Op.between]: [startTime, endTime] }
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