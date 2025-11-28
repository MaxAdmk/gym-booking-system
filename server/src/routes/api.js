const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const BookingController = require('../controllers/BookingController');
const AdminController = require('../controllers/AdminController');
const ProfileController = require('../controllers/ProfileController');

// Auth routes
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// Booking routes
router.post('/bookings', BookingController.create);
router.post('/bookings/cancel/:id', BookingController.cancel);
router.get('/bookings/user/:userId', BookingController.getHistory);

// Profile routes
router.get('/profile/:userId', ProfileController.getProfile);
router.post('/profile/membership', ProfileController.buyMembership);

// Admin routes
router.post('/admin/services', AdminController.createService);
router.post('/admin/trainers', AdminController.createTrainer);
router.post('/admin/halls', AdminController.createGymHall);
router.delete('/admin/users/:id', AdminController.deleteUser);

module.exports = router;