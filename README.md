# Decoupled Full-Stack Music Search Application

## Project Overview

This project is a decoupled full-stack portfolio application for music search and discovery. The application separates the backend API from the frontend client so that each layer can be developed, tested, and deployed independently.

The backend is built with Node.js, Express, Sequelize, and SQLite. It is responsible for server configuration, database connectivity, request handling, and integration with external music data services. The frontend is built with React and Vite, providing a responsive user interface for searching and displaying music-related results.

The project demonstrates core full-stack development practices, including environment-based configuration, REST-oriented server design, client-side rendering, database abstraction with Sequelize, and separation of concerns between application layers.

## Backend Setup

The backend runs from the project root and uses Express as the HTTP server framework. Sequelize provides database access, with SQLite configured through the `DATABASE_URL` environment variable.

### Prerequisites

- Node.js
- npm
- SQLite-compatible Sequelize configuration

### Installation

Install backend dependencies from the project root:

```bash
npm install
```

### Running the Backend

Start the Express server:

```bash
node server.js
```

By default, the server listens on port `3001` unless another value is provided through the `PORT` environment variable.

The backend initializes the Sequelize connection and synchronizes the database before starting the server. The root endpoint can be used as a basic health check:

```text
GET /
```

Expected response:

```text
Server is running
```

## Frontend Setup

The frontend is located in the `frontend` directory and is built with React and Vite. It is maintained as a separate client application from the backend API.

### Installation

Move into the frontend directory:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

### Running the Frontend

Start the Vite development server:

```bash
npm run dev
```

Vite will provide a local development URL in the terminal. The frontend can then be used to interact with the music search interface while the backend server runs separately.

### Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Environment Variables Configuration

Create a `.env` file in the project root for backend configuration. This file should not be committed to version control because it may contain private API credentials.

Example configuration:

```env
PORT=3001
DATABASE_URL=sqlite:database.sqlite
DB_DIALECT=sqlite
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

### Variable Reference

| Variable | Purpose |
| --- | --- |
| `PORT` | Defines the port used by the Express backend server. |
| `DATABASE_URL` | Defines the database connection string used by Sequelize. For local SQLite development, use `sqlite:database.sqlite`. |
| `DB_DIALECT` | Defines the Sequelize database dialect. Use `sqlite` for the local SQLite database. |
| `SPOTIFY_CLIENT_ID` | Stores the Spotify application client ID used for external music API access. |
| `SPOTIFY_CLIENT_SECRET` | Stores the Spotify application client secret used for external music API authentication. |

If the frontend needs to call the backend through a configurable URL, place frontend-specific variables in a separate `frontend/.env` file and prefix them with `VITE_`, as required by Vite.

Example:

```env
VITE_API_BASE_URL=http://localhost:3001
```

## Recommended Development Workflow

Run the backend and frontend in separate terminal sessions:

```bash
# Terminal 1: backend
node server.js
```

```bash
# Terminal 2: frontend
cd frontend
npm run dev
```

This workflow preserves the decoupled architecture of the application while allowing both layers to communicate during local development.
