# AssetFlow - Enterprise Asset & Resource Management System

## Overview
AssetFlow is a comprehensive full-stack application for managing organizational assets, bookings, maintenance, and audits.

## Tech Stack
- **Backend**: FastAPI, SQLAlchemy (async), PostgreSQL, JWT
- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

## Getting Started

### Prerequisites
- Docker and Docker Compose installed on your system
- (Windows: Docker Desktop recommended)

### Quick Start

1. **Clone/Navigate to project directory**
   ```bash
   cd "asset flow"
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Wait for services to start** (first build takes a few minutes)
   - Frontend will be available at: http://localhost:5173
   - Backend API at: http://localhost:8000
   - API docs at: http://localhost:8000/docs

4. **Seed the database** (in a new terminal)
   ```bash
   docker-compose exec backend python seed.py
   ```

## Test Credentials
After seeding, use these accounts to log in:
- **Admin**: admin@assetflow.com / password123
- **Asset Manager**: manager@assetflow.com / password123
- **Department Head**: head@assetflow.com / password123
- **Employee**: employee@assetflow.com / password123

## Development

### Backend Development
Backend code is in `backend/src/` with structure:
- `src/controllers/`: Business logic
- `src/routes/`: API endpoints
- `src/middlewares/`: Auth, validation
- `src/db/`: Models, schemas
- `src/utils/`: Helpers, security

### Frontend Development
Frontend code in `frontend/src/`:
- `src/pages/`: Page components
- `src/components/`: Reusable components
- `src/contexts/`: React context
- `src/services/`: API services

### Stopping Services
```bash
docker-compose down
```

### Stopping and deleting volumes (reset DB)
```bash
docker-compose down -v
```

## Features
- Role-based authentication & authorization
- Asset management & tracking
- Department management
- Category management
- Booking system
- Maintenance management (WIP)
- Audit management (WIP)

## License
MIT
