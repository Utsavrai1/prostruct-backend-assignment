import express from "express";
import {
  deleteUser,
  getAllEvents,
  getAllUsers,
} from "../controllers/adminController";
import { authenticateAdmin } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/users", authenticateAdmin, getAllUsers);

router.get("/events", authenticateAdmin, getAllEvents);

router.delete("/users/:id", authenticateAdmin, deleteUser);

export default router;

/**  openapi: 3.0.0
* info:
*   title: Admin API
*   version: 1.0.0
*   description: API documentation for admin functionalities
* servers:
*   - url: http://localhost:3000/api
* paths:
*   /admin/users:
*     get:
*       summary: Retrieve a list of all users
*       description: Returns a paginated list of all users in the system.
*       operationId: getAllUsers
*       parameters:
*         - name: page
*           in: query
*           description: Page number to retrieve
*           required: false
*           schema:
*             type: integer
*             example: 1
*         - name: limit
*           in: query
*           description: Number of users to retrieve per page
*           required: false
*           schema:
*             type: integer
*             example: 10
*       responses:
*         '200':
*           description: A successful response containing user data
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   page:
*                     type: integer
*                   limit:
*                     type: integer
*                   totalUsers:
*                     type: integer
*                   users:
*                     type: array
*                     items:
*                       $ref: '#/components/schemas/User'
*         '500':
*           description: Server error

*   /admin/events:
*     get:
*       summary: Retrieve a list of all events
*       description: Returns a list of all events with their registrations.
*       operationId: getAllEvents
*       responses:
*         '200':
*           description: A successful response containing event data
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   $ref: '#/components/schemas/Event'
*         '500':
*           description: Server error

*   /admin/users/{id}:
*     delete:
*       summary: Delete a user by ID
*       description: Marks a user as deleted.
*       operationId: deleteUser
*       parameters:
*         - name: id
*           in: path
*           required: true
*           description: ID of the user to delete
*           schema:
*             type: string
*       responses:
*         '200':
*           description: User successfully deleted
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   message:
*                     type: string
*         '500':
*           description: Server error

* components:
*   schemas:
*     User:
*       type: object
*       properties:
*         id:
*           type: string
*         name:
*           type: string
*         email:
*           type: string
*         isDeleted:
*           type: boolean
*       required:
*         - id
*         - name
*         - email

*     Event:
*       type: object
*       properties:
*         id:
*           type: string
*         title:
*           type: string
*         date:
*           type: string
*           format: date-time
*         registrations:
*           type: array
*           items:
*             $ref: '#/components/schemas/User'
*       required:
*         - id
*         - title
*         - date
*/
