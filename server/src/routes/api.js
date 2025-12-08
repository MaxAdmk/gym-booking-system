const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const BookingController = require('../controllers/BookingController');
const AdminController = require('../controllers/AdminController');
const ProfileController = require('../controllers/ProfileController');
const ContentController = require('../controllers/ContentController');

// Auth routes
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// Booking routes
router.post('/bookings', BookingController.create);
router.post('/bookings/cancel/:id', BookingController.cancel);
router.get('/bookings/user/:userId', BookingController.getHistory);
router.get('/bookings/schedule', BookingController.getBusySlots);

// Profile routes
router.get('/profile/:userId', ProfileController.getProfile);
router.post('/profile/membership', ProfileController.buyMembership);
router.put('/profile/:userId', ProfileController.updateProfile);
router.get('/notifications/:userId', ProfileController.getNotifications);

// Admin routes
router.post('/admin/services', AdminController.createService);
router.post('/admin/trainers', AdminController.createTrainer);
router.post('/admin/halls', AdminController.createGymHall);
router.delete('/admin/users/:id', AdminController.deleteUser);
router.post('/admin/reminders', AdminController.triggerReminders);

// Content Routes 
router.get('/content/services', ContentController.getAllServices);
router.get('/content/trainers', ContentController.getAllTrainers);
router.get('/content/halls', ContentController.getAllHalls);

module.exports = router;