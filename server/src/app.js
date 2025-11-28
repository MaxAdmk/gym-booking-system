const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const db = require('./models');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes); 

app.get('/', (req, res) => {
    res.send('Gym Booking API is running...');
});

const PORT = process.env.PORT || 5001;

const startServer = async () => {
    await connectDB();
    
    await db.sequelize.sync({ force: false }); 
    console.log('Database synced.');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();