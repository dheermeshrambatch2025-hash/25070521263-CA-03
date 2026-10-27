# Saffron & Slate — Restaurant Management System

A full-stack restaurant operations app built with React, Vite, Tailwind CSS, Node.js, Express and MongoDB.

## Architecture
- `client/`: React single-page app with customer, admin, service/POS and kitchen workspaces.
- `server/`: Express REST API, Mongoose models, session authentication, role checks and business rules.
- MongoDB is the source of truth. All permissions are enforced in the API; client-side route guards are only UX.

## Requirements
- Node.js 20+ and npm
- Local MongoDB Community Server running on `mongodb://127.0.0.1:27017`

## Setup (Windows PowerShell)
1. Extract the ZIP and open PowerShell in the project root.
2. `Copy-Item server/.env.example server/.env`
3. Edit `server/.env`. Generate a secret with:
   `$bytes = New-Object byte[] 48; [Security.Cryptography.RandomNumberGenerator]::Fill($bytes); [Convert]::ToBase64String($bytes)`
   Paste the result into `SESSION_SECRET`. Set a strong `BOOTSTRAP_ADMIN_PASSWORD`.
4. Install dependencies: `npm install` then `npm run install:all`.
5. Create the first administrator: `npm run seed:admin --prefix server`.
6. Start both apps: `npm run dev`.
7. Open `http://localhost:5173`.

Default local API: `http://127.0.0.1:5000/api/v1`. The Vite development proxy forwards `/api` to Express. Keep the frontend and API on the configured same-site origin for cookie sessions.

## Roles
- **Customer**: register/login, browse menu, place orders and create reservations; can view only their own orders/reservations.
- **Service Staff**: POS order creation, order visibility and table service status.
- **Kitchen Staff**: view kitchen queue and advance permitted preparation states.
- **Administrator**: dashboard, menu, tables, users, inventory and all orders.

Public registration always creates `customer`. Elevated accounts are created by the seed command or administrator endpoint. Passwords use bcrypt hashes; sessions are stored in MongoDB; cookies are HttpOnly. State-changing requests require a CSRF token obtained from `GET /api/v1/auth/csrf` and sent in `X-CSRF-Token`.

## API highlights
- `POST /api/v1/auth/register`, `/login`, `/logout`; `GET /api/v1/auth/me`, `/csrf`
- `GET /api/v1/menu`
- `GET/POST /api/v1/orders`; `PATCH /api/v1/orders/:id/status`
- `GET/POST /api/v1/reservations`
- Admin: `GET /api/v1/admin/summary`, `GET/POST /api/v1/admin/menu`, `GET/POST /api/v1/admin/users`, `PATCH /api/v1/admin/users/:id`, `GET/POST /api/v1/admin/tables`, `GET/POST /api/v1/admin/inventory`

## Tests
Run `npm test --prefix server`. The current suite uses Node's built-in test runner for password hashing and authorization-middleware unit tests; it does not require MongoDB. Full HTTP integration tests against an isolated test database are not yet implemented, so the suite is not proof that every workflow or security acceptance criterion passes.

## Security and limitations
This is an academic/local-first starter, not a production-certified POS. Use HTTPS, secure cookie settings, secret rotation, backups, monitoring, stronger audit retention, payment-provider integration, concurrency-safe inventory transactions, and a reviewed deployment configuration before real commercial use. Payments are recorded as order payment states; no card data is collected or processed. Reservation conflict checking is basic and should be hardened for concurrent bookings. Do not expose the local MongoDB port publicly.
