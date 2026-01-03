# GlobeTrotter Backend API Documentation

Use this guide to connect your Frontend (React/Vue/Mobile) to the GlobeTrotter Backend.

**Base URL**: `http://localhost:3000/api`

## 1. Authentication

### Signup
- **Endpoint**: `POST /auth/signup`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: `201 Created`
  ```json
  { "message": "User created successfully" }
  ```

### Login
- **Endpoint**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "token": "eyJhbGciOiJI...",
    "user": { "id": "...", "name": "John Doe", "email": "..." }
  }
  ```
- **Important**: Save the `token` in LocalStorage. You must send it in the Header for all other requests.

---

## 2. Trips (Protected Routes)

**Headers Required**: `Authorization: Bearer <YOUR_TOKEN>`

### Get All Trips
- **Endpoint**: `GET /trips`
- **Response**: Array of trip objects.

### Get Single Trip (Itinerary)
- **Endpoint**: `GET /trips/:id`
- **Example**: `GET /trips/uuid-1234-5678`
- **Response**: Trip object including `stops` and `activities`.

### Create New Trip
- **Endpoint**: `POST /trips`
- **Body**:
  ```json
  {
    "title": "Summer in Paris",
    "description": "A week long vacation", 
    "startDate": "2025-06-01", // ISO String
    "endDate": "2025-06-07",   // ISO String
    "budget": 5000,
    "coverPhoto": "https://example.com/photo.jpg" // Optional
  }
  ```

### Delete Trip
- **Endpoint**: `DELETE /trips/:id`

---

## 3. Server Setup for Frontend Devs
1. Ensure the backend is running: `npm run dev` (in `server/` folder).
2. The server is configured to allow CORS from `http://localhost:5173` by default. If your friend's frontend runs on a different port (e.g., 3001), update `server/src/index.js`.
