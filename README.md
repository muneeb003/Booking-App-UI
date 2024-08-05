# Booking App

Welcome to the Booking App repository! This application is designed to facilitate the booking of hotels, providing a user-friendly interface for browsing, reserving, and managing hotel stays.


## Features

- User Authentication (Login and Registration)
- Search and Browse Hotels
- View Hotel and Room Details
- Make and Manage Bookings
- Process Payments
- Leave Reviews and Ratings
- Receive Notifications

## Architecture

The Booking App is built using a microservices architecture. Below is an overview of the main components:

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for making requests to the backend services.

### Backend

- **Node.js**: JavaScript runtime for the backend.
- **Express**: A web application framework for Node.js.
- **Mongoose**: ODM for MongoDB, providing a straightforward, schema-based solution to model application data.
- **Cloudinary**: For managing and storing images and other media.

### Microservices

1. **API Gateway**: Routes requests to the appropriate backend services.
2. **Authentication Service**: Manages user login and registration.
3. **User Service**: Handles user data and profiles.
4. **Hotel Service**: Manages hotel information and listings.
5. **Room Service**: Handles room availability and details.
6. **Booking Service**: Manages reservations and bookings.
7. **Blob Store**: Manages storage of images and other media.

### Database

- **MongoDB**: A NoSQL database for storing application data.


## API Endpoints

- **Authentication**
  - `POST /api/auth/register`: Register a new user
  - `POST /api/auth/login`: Login a user

- **Hotels**
  - `GET /api/hotels`: Get a list of hotels
  - `GET /api/hotels/:id`: Get details of a specific hotel

- **Rooms**
  - `GET /api/rooms/:id`: Get details of a specific room
  - `POST /api/rooms/:id/book`: Book a room

- **Bookings**
  - `GET /api/bookings`: Get a list of user bookings
  - `POST /api/bookings`: Create a new booking

Happy coding! If you have any questions or need further assistance, please open an issue in this repository.
https://github.com/user-attachments/assets/ed657827-baa2-4fb3-9a7e-9e7237e17584




