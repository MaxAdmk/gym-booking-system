const AdminService = require('../services/AdminService');
const NotificationService = require('../services/NotificationService');
const BookingRepository = require('../repositories/BookingRepository');

class AdminController {

    async getAllUsers(req, res) {
        try {
            const users = await AdminService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            await AdminService.blockUser(req.params.id);
            res.json({ message: 'User deleted/blocked' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createService(req, res) {
        try {
            const service = await AdminService.createService(req.body);
            res.status(201).json(service);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteService(req, res) {
        try {
            await AdminService.deleteService(req.params.id);
            res.json({ message: 'Service deleted' });
        } catch (error) { res.status(500).json({ error: error.message }); }
    }

    async createTrainer(req, res) {
        try {
            const trainer = await AdminService.createTrainer(req.body);
            res.status(201).json(trainer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteTrainer(req, res) {
        try {
            await AdminService.deleteTrainer(req.params.id);
            res.json({ message: 'Trainer deleted' });
        } catch (error) { res.status(500).json({ error: error.message }); }
    }

    async createGymHall(req, res) {
        try {
            const gymHall = await AdminService.createGym(req.body);
            res.status(201).json(gymHall);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteGymHall(req, res) {
        try {
            await AdminService.deleteGym(req.params.id);
            res.json({ message: 'Hall deleted' });
        } catch (error) { res.status(500).json({ error: error.message }); }
    }

    async getAllBookings(req, res) {
        try {
            const bookings = await AdminService.getAllBookings();
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async triggerReminders(req, res) {
        try {
            const result = await NotificationService.sendReminders();
            res.json({ message: `Reminders sent for ${result.count} bookings.` });
        } catch (error) { 
            console.error(error);
            res.status(500).json({ error: error.message }); 
        }
    }

}

module.exports = new AdminController(); 