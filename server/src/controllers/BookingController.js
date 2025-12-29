const BookingFacade = require('../services/facades/BookingFacade');
const BookingRepository = require('../repositories/BookingRepository');

class BookingController {

    async create(req, res) {
        try {
            let { userId, hallId, serviceId, trainerId, startTime, endTime } = req.body;
            
            if (!trainerId || trainerId === '') {
                trainerId = null;
            }

            const booking = await BookingFacade.createBooking(
                userId, hallId, serviceId, trainerId, new Date(startTime), new Date(endTime)
            );
            
            res.status(201).json(booking);
        } catch (error) {
            console.error(error); 
            res.status(400).json({ error: error.message });
        }
    }

    async cancel(req, res) {
        try {
            const {id} = req.params;
            await BookingFacade.cancelBooking(id);
            res.json({ message: 'Booking cancelled successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getHistory(req, res) {
        try {
            const {userId} = req.params;
            const bookings = await BookingRepository.findByUser(userId);
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getBusySlots(req, res) {
        try {
            const { hallId, date } = req.query;
            
            const startOfDay = new Date(`${date}T00:00:00`);
            const endOfDay = new Date(`${date}T23:59:59`);

            const bookings = await BookingRepository.findActiveByHallAndDate(hallId, startOfDay, endOfDay);

            const busyTimes = bookings.map(b => {
                const dateObj = new Date(b.startTime);
                return dateObj.toTimeString().slice(0, 5); 
            });

            res.json(busyTimes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new BookingController();