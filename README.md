# EVENT MANAGEMENT SYSTEM API DOCUMENTATION

BASE URL: http://localhost:3000/api-docs

## USER ENDPOINTS

POST /users/register

- Register new user with name, email, password
- Returns JWT token

POST /users/login

- Login with email and password
- Returns JWT token

GET /users/:id

- Get user profile details

PUT /users/:id

- Update user information

## EVENT ENDPOINTS

POST /events

- Create new event
- Requires authentication
- Fields: name, description, date, location, capacity

GET /events

- List all events

GET /events/:id

- Get single event details

PUT /events/:id

- Update event details
- Requires authentication
- Only event organizer can update

DELETE /events/:id

- Delete event
- Requires authentication
- Only event organizer can delete

## REGISTRATION ENDPOINTS

POST /events/:id/register

- Register for an event
- Requires authentication
- Checks capacity limits

DELETE /events/:id/register

- Cancel event registration
- Requires authentication

GET /events/:id/attendees

- Get list of event attendees

## ANALYTICS ENDPOINTS

GET /analytics/events/popular

- Get most popular events

GET /analytics/users/active

- Get most active users

GET /analytics/events/:id/stats

- Get statistics for specific event

## ADMIN ENDPOINTS

GET /admin/users

- Get all users (paginated)
- Requires admin authentication

GET /admin/events

- Get all events with registrations
- Requires admin authentication

DELETE /admin/users/:id

- Delete user
- Requires admin authentication

## NOTIFICATION ENDPOINTS

POST /notifications/send

- Send email to event attendees
- Fields: event_id, message

## AUTHENTICATION

Protected routes require JWT token:
Authorization: Bearer <token>

## ERROR CODES

200 - Success
201 - Created
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
500 - Server Error

## DATA MODELS

User:

- id
- name
- email
- password
- isDeleted

Event:

- id
- name
- description
- date
- location
- capacity
- organizer
- attendees

## TECHNOLOGIES

- Node.js
- Express
- TypeScript
- MongoDB
- JWT
- Nodemailer
- Swagger/OpenAPI
