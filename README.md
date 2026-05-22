# WhoIsOnline

WhoIsOnline is a simple full-stack app for authentication and live online-user status.

## Backend

### Technologies

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- JWT authentication
- bcrypt password hashing
- Zod request validation
- Server-Sent Events for live online-user updates

### Running the Backend

The backend runs on `http://localhost:8000`.

1. Go to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Make sure `backend/.env` exists:

   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET_KEY="your-secret-key"
   ```

   `JWT_SECRET_KEY` is optional in the current code because a default value is used, but setting it is recommended.

4. Generate the Prisma client and run migrations:

   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

Useful backend scripts:

- `npm run dev` - start the backend in development mode.
- `npm run build` - compile TypeScript.
- `npm run start` - build and run the compiled backend.
- `npm run prisma:studio` - open Prisma Studio.

### API Endpoints

Base URL: `http://localhost:8000`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/` | No | Health check. Returns a server-running message. |
| `POST` | `/api/auth/register` | No | Register a user. |
| `POST` | `/api/auth/login` | No | Login and receive a JWT token. |
| `GET` | `/api/user/users` | Yes | Get all registered users without passwords. |
| `GET` | `/api/event/online-users` | Yes | Open an SSE connection for live online-user updates. |

Register request body:

```json
{
  "username": "john",
  "password": "password123"
}
```

Login request body:

```json
{
  "username": "john",
  "password": "password123"
}
```

Login success response includes:

```json
{
  "message": "User logged in successfully!",
  "data": {
    "token": "jwt-token"
  }
}
```

Protected endpoints require:

```http
Authorization: Bearer jwt-token
```

`GET /api/user/users` returns users like:

```json
[
  {
    "id": "user-id",
    "username": "john",
    "createdAt": "2026-05-22T00:00:00.000Z",
    "lastOnline": null
  }
]
```

`GET /api/event/online-users` streams online status events like:

```json
[
  {
    "id": "user-id",
    "isOnline": true,
    "lastSeenAt": null
  }
]
```

## Frontend

### Technologies

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- Zustand
- Tailwind CSS
- react-hot-toast
- dayjs
- `@microsoft/fetch-event-source` for authenticated SSE connections

### Running the Frontend

The frontend expects the backend at `http://localhost:8000`.

1. Go to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the URL shown by Vite in the terminal.

Useful frontend scripts:

- `npm run dev` - start the Vite development server.
- `npm run build` - type-check and build the frontend.
- `npm run lint` - run ESLint.
- `npm run preview` - preview the production build.

### Pages

| Path | Page | Access | Description |
| --- | --- | --- | --- |
| `/login` | Login | Public only | Login form. Stores the JWT token in local storage after success. |
| `/register` | Register | Public only | Registration form. Redirects to login after success. |
| `/` | Home | Protected | Simple authenticated home page. |
| `/dashboard` | Dashboard | Protected | Shows registered users, live online status, and last seen time. |

The app uses route guards:

- Unauthenticated users are redirected to `/login` when visiting protected pages.
- Authenticated users are redirected away from `/login` and `/register`.
- The last visited private path is saved in session storage and used after auth redirects.
