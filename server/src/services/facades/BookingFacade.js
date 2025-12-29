const BookingService = require('../BookingService');
const PaymentService = require('../PaymentService');
const NotificationService = require('../NotificationService');
const LoyaltyService = require('../loyalty/LoyaltyService');
const BookingRepository = require('../../repositories/BookingRepository');

class BookingFacade {

    async createBooking(userId, hallId, serviceId, trainerId, startTime, endTime) {
        // Checking availability
        const check = await BookingService.checkAvailability(hallId, trainerId, startTime, endTime);
        if (!check.available) {
            throw new Error(check.reason);
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
        const booking = await BookingRepository.findById(bookingId);
        
        if (!booking) {
            throw new Error('Booking not found');
        }

        await BookingRepository.cancel(bookingId);

        const dateStr = new Date(booking.startTime).toLocaleString();
        const message = `Your booking #${bookingId} for ${dateStr} has been CANCELLED.`;
        await NotificationService.notifyUser(booking.userId, message);
        
        return true;
    }

}

module.exports = new BookingFacade();