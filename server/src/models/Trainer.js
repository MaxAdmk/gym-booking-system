const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 

// Defining Trainer model
const Trainer = sequelize.define('Trainer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
});

module.exports = Trainer;