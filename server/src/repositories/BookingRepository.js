const {  Trainer, GymHall, Booking, Op } = require('../models');

class BookingRepository {

    async save(bookingData) {
        return await Booking.create(bookingData);
    }

    async findById(id) {
        return await Booking.findByPk(id);
    }

    async findAll() {
        return await Booking.findAll({
            order: [['createdAt', 'DESC']] 
        });
    }

    async findByUser(userId) {
        return await Booking.findAll({
            where: { userId },
            include: [GymHall, Trainer], 
            order: [['createdAt', 'DESC']]
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

    async findActiveByTrainerAndDate(trainerId, startTime, endTime) {
        const { Op } = require("sequelize");
        return await Booking.findAll({
            where: {
                trainerId: trainerId,
                status: 'CONFIRMED',
                [Op.and]: [
                    { startTime: { [Op.lt]: endTime } },
                    { endTime: { [Op.gt]: startTime } }
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