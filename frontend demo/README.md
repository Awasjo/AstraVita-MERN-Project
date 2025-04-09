# AstraVita Frontend Demo

This is a standalone demo version of the AstraVita frontend application. It's designed to showcase the user interface and interaction patterns without requiring a backend server or database connection.

## Features

- **Standalone Mode**: Works entirely in the browser with no server connection
- **Sample Data**: Uses mock data to simulate the application experience
- **Doctor & Patient Views**: Experience both sides of the platform
- **Test Result Management**: Upload test results, view genetic information, and medication impacts

## Getting Started

1. Run the development server:
   ```bash
   npm run dev
   ```

2. For the demo login, use any of these credentials:
   - **Doctors**: 
     - Username: `dr.johnson` or `dr.chen` 
   - **Patients**: 
     - Username: `jsmith`, `edavis`, or `rwilson`
   - Any password will work in demo mode

## Sample Test Files

The `/src/assets/` directory contains sample test result JSON files that you can upload in the Patient Portal:
- `CYP2C9_001.json`
- `CYP3A5_002.json`

## Full Application Access

To experience the full application with real data persistence and server functionality:

1. Pull and run the complete application using Docker:
```bash
docker compose up
```

The full application includes:
- Frontend (accessible at http://localhost:4173)
- Backend API (runs on http://localhost:3000)
- Message Service (runs on http://localhost:3001)

## Demo vs Full Version

Feature | Demo | Full Version
--------|------|-------------
Login Authentication | Simulated | Real JWT-based auth
Data Persistence | Session only | MongoDB database
API Calls | Mocked | Real REST endpoints
Messaging | Simulated | Real-time with Socket.io
File Upload | Demo samples only | Fully functional

## Understanding the Demo

The demo version uses static data stored in the `mockData.js` file to simulate the application's functionality. Changes made in the demo (adding doctors, uploading tests, etc.) will persist only for the current browser session and will be reset when you refresh the page.
