# ExpressJS TypeScript CRUD Backend

A robust backend server built with ExpressJS, TypeScript, and PostgreSQL using TypeORM for database operations.

## Features

- **Full CRUD Operations**: Create, Read, Update, Delete operations for users
- **TypeScript**: Full type safety and modern JavaScript features
- **PostgreSQL**: Robust relational database with TypeORM
- **RESTful API**: Clean and intuitive API endpoints
- **Input Validation**: Request validation and error handling
- **Security**: Helmet.js for security headers, CORS support
- **Logging**: Morgan for HTTP request logging

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose (for database)
- PostgreSQL (if not using Docker)

## Quick Start

### 1. Clone and Install Dependencies

```bash
cd problem5
npm install
```

### 2. Set Up Environment Variables

Copy the environment file and configure your settings:

```bash
cp env.example .env
```

Edit `.env` file with your database configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=crud_backend
DB_SYNCHRONIZE=true
DB_LOGGING=true

# Security
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=http://localhost:3000
```

### 3. Start PostgreSQL Database

#### Option A: Using Docker (Recommended)

```bash
docker-compose up -d
```

#### Option B: Local PostgreSQL

1. Install PostgreSQL on your system
2. Create a database named `crud_backend`
3. Update the `.env` file with your local credentials

### 4. Run the Application

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Users API

| Method   | Endpoint         | Description                           |
| -------- | ---------------- | ------------------------------------- |
| `POST`   | `/api/users`     | Create a new user                     |
| `GET`    | `/api/users`     | Get all users (with optional filters) |
| `GET`    | `/api/users/:id` | Get user by ID                        |
| `PUT`    | `/api/users/:id` | Update user                           |
| `DELETE` | `/api/users/:id` | Delete user                           |

### Health Check

| Method | Endpoint  | Description          |
| ------ | --------- | -------------------- |
| `GET`  | `/health` | Server health status |

### Root

| Method | Endpoint | Description                             |
| ------ | -------- | --------------------------------------- |
| `GET`  | `/`      | API information and available endpoints |

## API Usage Examples

### Create a User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }'
```

### Get All Users

```bash
curl http://localhost:3000/api/users
```

### Get Users with Filters

```bash
# Filter by name
curl "http://localhost:3000/api/users?name=John"

# Filter by email
curl "http://localhost:3000/api/users?email=john@example.com"

# Filter by age
curl "http://localhost:3000/api/users?age=30"
```

### Get User by ID

```bash
curl http://localhost:3000/api/users/{user-id}
```

### Update User

```bash
curl -X PUT http://localhost:3000/api/users/{user-id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "age": 31
  }'
```

### Delete User

```bash
curl -X DELETE http://localhost:3000/api/users/{user-id}
```

## Database Schema

### Users Table

| Column       | Type         | Constraints      | Description             |
| ------------ | ------------ | ---------------- | ----------------------- |
| `id`         | UUID         | Primary Key      | Unique identifier       |
| `name`       | VARCHAR(255) | NOT NULL         | User's full name        |
| `email`      | VARCHAR(255) | NOT NULL, UNIQUE | User's email address    |
| `age`        | INTEGER      | NULLABLE         | User's age              |
| `created_at` | TIMESTAMP    | NOT NULL         | Record creation time    |
| `updated_at` | TIMESTAMP    | NOT NULL         | Record last update time |

## Project Structure

```
src/
├── config/
│   └── ormconfig.ts      # TypeORM configuration
├── controllers/
│   └── UserController.ts # User CRUD operations
├── models/
│   └── User.ts          # User entity definition
├── routes/
│   └── userRoutes.ts    # User API routes
├── services/
│   └── UserService.ts   # Business logic layer
└── index.ts             # Main application file
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm test` - Run tests

## Environment Variables

| Variable         | Default      | Description               |
| ---------------- | ------------ | ------------------------- |
| `PORT`           | 3000         | Server port               |
| `NODE_ENV`       | development  | Environment mode          |
| `DB_HOST`        | localhost    | Database host             |
| `DB_PORT`        | 5432         | Database port             |
| `DB_USERNAME`    | postgres     | Database username         |
| `DB_PASSWORD`    | password     | Database password         |
| `DB_DATABASE`    | crud_backend | Database name             |
| `DB_SYNCHRONIZE` | true         | Auto-sync database schema |
| `DB_LOGGING`     | true         | Enable SQL query logging  |

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error
