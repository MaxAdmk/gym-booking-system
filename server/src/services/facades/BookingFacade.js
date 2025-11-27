const BookingService = require('../BookingService');
const PaymentService = require('../PaymentService');
const NotificationService = require('../NotificationService');
const LoyaltyService = require('../loyalty/LoyaltyService');
const BookingRepository = require('../../repositories/BookingRepository');

class BookingFacade {
    /*
        Main method does this:
        1. Checks the available time
        2. Calculates the price
        3. Makes payment
        4. Saves booking
        5. Calculates bonuses
        6. Sends message
    */
    async createBooking(userId, hallId, serviceId, trainerId, startTime, endTime) {
        // Checking availability
        const isAvailable = await BookingService.checkAvailability(hallId, startTime, endTime);
        if (!isAvailable) {
            throw new Error('GymHall is busy at this time');
        }

        // Calculating the price
        const price = await BookingService.calculatePrice(serviceId, userId);

        // Payment
        const isPaid = await PaymentService.processPayment(price);
        if (!isPaid) {
            throw new Error('Payment failed!');
        }

        // Saving the booking
        const booking = await BookingRepository.save({
            userId,
            hallId,
            serviceId,
            trainerId,
            startTime,
            endTime,
            totalPrice: price,
            status: 'CONFIRMED'
        });

        // Calculating bonuses

        await LoyaltyService.processBookingBonus(userId, price);

        // Notificating

        await NotificationService.notifyUser(userId, `Your booking #${booking.id} is confirmed.`);

        return booking;
    }

    async cancelBooking(bookingId) {
        await BookingRepository.cancel(bookingId);
        return true;
    }

}

module.exports = new BookingFacade();