# Architecture & Security Notes

## Request flow

React (Vite) -> same-origin `/api` proxy -> Express -> validation -> session/role checks -> Mongoose -> local MongoDB.

## Main collections
- `users`: normalized email, bcrypt password hash, role and active flag.
- `menuitems`: category, price and availability.
- `orders`: immutable line-item price/name snapshots, totals, order state and payment state.
- `reservations`: customer ownership, party size, date/time and status.
- `tables`: capacity and service status.
- `inventories`: quantity and low-stock threshold.
- `auditevents`: actor, action, entity and timestamp (details are excluded from ordinary queries).

## Authorization rules
- Public registration hardcodes `customer`; it ignores client-supplied role fields.
- Admin management endpoints require a live server-side session whose current role is `admin`.
- Customers can read only their own orders and reservations; order creation binds ownership to the session, not a submitted user ID.
- Kitchen accounts may only move orders through preparation states; service accounts may manage service/payment status.
- Inactive accounts are checked against MongoDB on each API request and their sessions are invalidated.
- The last active administrator cannot be deactivated or demoted.

## Session and CSRF
Express sessions are stored in MongoDB. The cookie is HttpOnly, SameSite=Lax, and Secure in production. The session ID is regenerated after successful login/registration. A session-bound random CSRF token is retrieved from `GET /api/v1/auth/csrf` and sent in `X-CSRF-Token` for state-changing requests. CORS is restricted to `CLIENT_ORIGIN`; CORS is not treated as a CSRF defense.

## Known limitations
- No integrated payment gateway or real card handling. `paid` is an operational status only.
- Reservation conflict checks and inventory deductions are not transactionally enforced.
- No live Socket.IO updates yet; refresh the kitchen dashboard to sync orders.
- Automated coverage currently consists of unit tests; full API/database integration tests, end-to-end UI tests, and concurrency tests remain required before real deployment.
- This is an academic project starter, not a production-certified restaurant POS.
