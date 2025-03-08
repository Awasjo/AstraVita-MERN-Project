# Docker Setup for Multi-Service Application

## Overview
This project consists of three services that work together:
- **Frontend** (Vite application) – Accessible at [http://localhost:4173](http://localhost:4173)
- **Backend** (Node.js/Express API) – Runs on [http://localhost:3000](http://localhost:3000)
- **Message Service** (Handles messaging functionality) – Runs on [http://localhost:3001](http://localhost:3001)

The application allows users to register as either **patients** or **doctors**, with different roles and permissions. Users can also upload and download files, which are stored in an `sample-files` folder at the root level.

---

## Running the Application with Docker Compose
To start all services, ensure you have [Docker](https://www.docker.com/) installed, then run:

```sh
docker compose up --build
```

This command will:
- Build the images for the frontend, backend, and message service.
- Start all three services together.

To stop the services, press `Ctrl + C` or run:

```sh
docker compose down
```

---

## API Endpoints & Functionality
### Authentication
- Users can register as a **patient** or a **doctor**.
- Authentication is handled via the backend service.

### File Upload & Download
- Users can upload sample genetic test files.
- Sample files are available to be uploaded in the `sample-files` folder.

### Doctor-Patient Messaging
- Doctors are able to communicate with their patients.
- Patients are able to communicate with their doctors.

---

## Services and Ports
| Service          | Description                          | URL                       |
|-----------------|----------------------------------|---------------------------|
| **Frontend**    | Vite frontend app                 | [http://localhost:4173](http://localhost:4173) |
| **Backend**     | Express API                        | [http://localhost:3000](http://localhost:3000) |
| **Message Service** | Handles messaging logic           | [http://localhost:3001](http://localhost:3001) |

---

## Lessons Learned
### Database Selection
Initially, MongoDB was chosen based on the professor's recommendation. However, given the **one-to-many relationships** between doctors and patients, a **relational database like MySQL** would have been a better fit.

### Dockerizing a Multi-Service App
- Organizing all services under one **docker-compose** setup makes it easier to manage dependencies and environments.
- Using `.env` files per service simplifies configuration management.
- Exposing correct ports ensures smooth communication between services.

### Frontend & Backend Communication
- Ensure CORS policies are set up correctly for smooth frontend-backend interaction.
- Instead of using local MongoDB, a free tier cluster is used for this project.

---

## Future Improvements
- **Migrate to SQL (MySQL/PostgreSQL) for better data integrity**.
- **Implement a reverse proxy (like Nginx) to streamline service routing**.

---

## Troubleshooting
- If a service fails to start, check the logs:
  ```sh
  docker compose logs <service-name>
  ```
  Replace `<service-name>` with `frontend`, `backend`, or `message-service`.

- If ports are already in use, ensure no conflicting applications are running.
- If changes aren’t reflecting, try rebuilding:
  ```sh
  docker compose up --build
  ```

