const BookingRepository = require('../repositories/BookingRepository');
const LoyaltyService = require('./loyalty/LoyaltyService');
const ContentRepository = require('../repositories/ContentRepository');

class BookingService {

    async checkAvailability(hallid, startTime, endTime) {
        const conflicts = await BookingRepository.findActiveByHallAndDate(hallid, startTime, endTime);

        return conflicts.length === 0;
    }

    // The logic of pricing and sales needs to be additionally developed
    async calculatePrice(serviceId, userId) {
        let finalPrice = 100.0;

        return finalPrice;
    }

}

module.exports = new BookingService();