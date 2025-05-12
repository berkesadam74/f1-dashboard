
# F1 Dashboard

This project is a full-stack application designed to provide a dashboard for viewing Formula 1 data. It's built with a modern technology stack to ensure a responsive and efficient user experience.

## Demo

Here's a short demonstration of the F1 Dashboard in action:

![F1 Dashboard Demo GIF](assets/demo.gif)

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running with Docker Compose](#running-with-docker-compose)
  - [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Data Visualization:** (Results of races, Diagrams for top5 fastest laps in season, Top5 wins in the season, TOP5 podiums and TOP5 polepositions, Constructors Standings, Drivers Standings, Race Calendar, Logging/Viewing Results)
- **Responsive Design:** Accessible on various devices.
- **Modern User Interface:** (Frontend built in React - Componental architecture)
- **Robust Backend:** (Built in Java Spring)
- **Containerized:** Easy setup and deployment using Docker Compose.

## Technology Stack

- **Frontend:**
  - Vite
  - React (or Vue, depending on your actual setup)
- **Backend:**
  - Spring Boot
  - Java (Specify version, e.g., Java 21)
- **Database:**
  - MongoDB
- **Containerization:**
  - Docker
  - Docker Compose

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

- Docker
- Docker Compose
- (Optional, for local development without Docker) Node.js (specify version)
- (Optional, for local development without Docker) Java Development Kit (JDK) (specify version) and Maven

### Running with Docker Compose

The easiest way to run the entire application is using Docker Compose.

1. **Clone the repository:**

    ```bash
    git clone https://github.com/berkesadam74/f1-dashboard.git
    cd f1-dashboard
    ```

2. **Build and start the services:**

    ```bash
    docker-compose up --build
    ```

    This command will build the Docker images for your frontend and backend (if not already built) and start all services defined in your `docker-compose.yml`.

3. **Access the application:**
    - Frontend: `http://localhost:3000`
    - Backend API: `http://localhost:8080`
    - MongoDB (if needed): `mongodb://localhost:27017` (credentials are in `docker-compose.yml`)

To stop the services, press `Ctrl+C` in the terminal where `docker-compose up` is running, or open a new terminal in the project directory and run:

```bash
docker-compose down
```

To remove volumes and images when stopping, use:

```bash
docker-compose down -v
```

### Local Development

If you prefer to run the frontend and backend separately outside of Docker:

#### Frontend

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend/f1-dashboard/
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

    The frontend should be available at `http://localhost:3000`.

#### Backend

1. Navigate to the `backend` directory:

    ```bash
    cd backend/f1-app/
    ```

2. Build and run the Spring Boot application using Maven:

    ```bash
    ./mvnw spring-boot:run
    ```

    The backend API should be available at `http://localhost:8080`.

    *Note: Ensure your backend is configured to connect to your running MongoDB instance, either locally or via Docker.*

## Environment Variables

The following environment variables are used, primarily configured within `docker-compose.yml`:

- `MONGODB_INITDB_ROOT_USERNAME`: MongoDB root username.
- `MONGODB_INITDB_ROOT_PASSWORD`: MongoDB root password.
- `MONGODB_INITDB_DATABASE`: MongoDB database name.
- `SPRING_DATA_MONGODB_URI`: Connection string for the backend to connect to MongoDB.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

---
