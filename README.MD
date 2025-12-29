# Sport Complex Booking System

An information system for automating sports service booking processes, membership management, and sports complex administration. This project was developed as part of a coursework assignment.

## Project Description

This web application provides a comprehensive solution for automating interactions between sports club clients and administration. The system allows users to view schedules, book sessions, and manage personal data, while enabling administrators to manage content, users, and financial flows.

The system architecture is built on the Client-Server principle using REST API.

## Technology Stack

The system is implemented using the following technologies and tools:

### Client-Side (Frontend)
* **React.js (Vite):** Library for building the user interface.
* **React Router DOM:** Routing for the Single Page Application (SPA).
* **Axios:** HTTP client for server interaction.
* **React Hook Form:** Form management and data validation.
* **CSS Modules:** Component styling.

### Server-Side (Backend)
* **Node.js:** JavaScript runtime environment.
* **Express.js:** Web framework for creating REST APIs.
* **Sequelize ORM:** Object-relational mapping for database operations.
* **JWT (JSON Web Token):** Protocol for authentication and authorization.
* **Multer:** Middleware for handling file uploads.
* **Node-cron:** Task scheduler for automatic notifications.

### Database
* **MySQL:** Relational database management system.

## Functional Capabilities

### Client Module
1.  **Registration and Authorization:** Account creation, system login.
2.  **Service Catalog:** View available sections, halls, and trainers with filtering options.
3.  **Booking:** Select time, trainer, and hall for a session. Real-time slot availability check.
4.  **Profile Management:** Edit personal data, upload profile photo.
5.  **Memberships:** Purchase and view membership status (Single, Monthly, Corporate).
6.  **History:** View visit history and transactions.
7.  **Notifications:** Receive system messages regarding booking status.

### Administrator Module
1.  **Content Management:** Add, edit, and delete information about halls, trainers, and services.
2.  **Schedule Management:** Configure relationships between trainers and halls.
3.  **User Management:** View client list, block access.
4.  **Booking Management:** Monitor active bookings, capability to cancel reservations.
5.  **Communication:** Create and send informational messages to users.

## Deployment and Launch Instructions

Follow these steps to launch the project on a local machine.

### 1. Prerequisites
Ensure the following software is installed:
* Node.js (version 14 or higher)
* MySQL Server

### 2. Clone Repository
Download the project code:

```bash
git clone [https://github.com/MaxAdmk/gym-booking-system.git](https://github.com/MaxAdmk/gym-booking-system.git)
cd gym-booking-system

### 3. Database Configuration

Create a new database in MySQL:
CREATE DATABASE gym_booking_db;

Navigate to the server directory and create a configuration file .env:

cd server
# Create .env file and add environment variables

Content of the .env file:

PORT=5001
DB_NAME=gym_booking_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_DIALECT=mysql
JWT_SECRET=secret_key

### 4. Launching Server-Side

In the terminal (inside the server folder), execute the commands:

# Install dependencies
npm install

# Initialize database with test data (Seed)
node seed.js

# Start server in development mode
npm run dev

### 5. Launching Client-Side
Open a new terminal, navigate to the client folder, and execute the commands:

cd client

# Install dependencies
npm install

# Start client application
npm run dev

After a successful launch, the web application will be available at the address indicated in the terminal (default: http://localhost:5173).