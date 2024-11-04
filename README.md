# OneDrug Web Platform Development

## Project Overview

This project is aimed at developing a secure and user-friendly web-based platform for **OneDrug Inc.**, a medical technology startup specializing in smart point-of-care technologies and genetic profiling. The platform has two main goals:  
1. **Redesign of OneDrug’s company website** to align with modern web design standards.
2. **Development of a new web platform** to serve as an interface for OneDrug’s proprietary pharmacogenomic test device, **ProbeiT**, facilitating secure data sharing between patients and healthcare providers.

The platform will include distinct portals for doctors and patients, enabling secure access to test results, and real-time communication.

We aim to have this design: https://www.figma.com/design/4vemLcSSp0SGcgimAWkvb1/OneDrug-Prototype?node-id=0-1&t=li30mrU6GftXNT7a-1

## Key Features

1. **User Registration and Authentication**: Implementing secure login with role-specific access for patients, and doctors.
2. **Patient Portal**: Patients can view ProbeiT test results and share data with selected doctors.
3. **Doctor Portal**: Doctors can access patient-approved test results, upload new results, and search for genetic markers.
4. **Secure Data Handling**: Adherence to modern security standards for protecting sensitive medical data and ensuring regulatory compliance.
5. **Live Chat and Messaging**: Real-time communication between patients and doctors, along with notifications for test result updates.
6. **Mock Data Integration**: Using simulated test results for development and demonstration purposes.

## Project Structure

### User Roles
- **Guest**: Can learn about OneDrug, its mission, products, and contact the company.
- **Patient**: Can register and log in to view test results, share data with doctors, and communicate with healthcare providers.
- **Doctor**: Can access patient-shared test results, upload new results, and search genetic markers.

### Architecture
The project includes the following components:
- **Frontend**: Built using modern web technologies for an intuitive user experience.
- **Backend**: Handles secure data storage and processing, considering MongoDB for data storage.
- **Authentication Middleware**: Evaluating Passport.js for secure login.
- **Mock Data System**: Simulates ProbeiT test results for demonstration.

## Project Roadmap

### Milestones
The project includes the following components:
1. **Website Redesign**: Built using modern web technologies for an intuitive user experience.
2. **User Authentication**: Handles secure data storage and processing, considering MongoDB for data storage.
3. **Patient Portal Development**: Evaluating Passport.js or Auth0 for secure login.
4. **Doctor Portal Development**: Simulates ProbeiT test results for demonstration.
5. **Messaging and Notification System**: Evaluating Passport.js or Auth0 for secure login.


