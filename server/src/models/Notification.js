const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 

// Defining Notification model
const Notification = sequelize.define('Notification',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});

module.exports = Notification;