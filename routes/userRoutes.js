const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: enter your username
 *           example: test123
 *         first_name:
 *           type: string
 *           description: enter your first name
 *           example: John
 *         last_name:
 *           type: string
 *           description: enter your last name
 *           example: Smith
 *         email:
 *           type: string
 *           description: enter your email
 *           example: test@test.com
 *         password:
 *           type: string
 *           description: enter your password
 *           example: password3456
 */

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *      - Users
 *    summary: Retrieve a list of users
 *    description: Retrieve a list of task froma users table
 *    responses:
 *      200:
 *        description: A list of users.
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                description:
 *                  type: string
 *                  example: Successfully fetched all data!
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Users'
 * 
 */

router.get("/", userController.getAllUsers);




/**
 * @swagger
 * /users/{userId}:
 *    get:
 *      tags:
 *        - Users
 *      summary: Retrieve users data by id
 *      description: Retrieve users by id from users table
 *      parameters:
 *        - name: userId
 *          in: path
 *          required: true
 *          description: user id
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        200:
 *          description: single user data.
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully fetched users data by id!
 *                  data:
 *                    type: object
 *                    properties:
 *                      user_id:
 *                        type: integer
 *                        description: enter your id
 *                        example: 123
 *                      username:
 *                        type: string
 *                        description: enter your username
 *                        example: test123
 *                      password:
 *                        type: string
 *                        description: enter your password
 *                        example: $2b$10$8MZFgNHuozh.jWLmJ25rquPDw3hj0jX3oTYcwRBHPAjsRg.AUj79q
 *                      email:
 *                        type: string
 *                        description: enter your email
 *                        example: test@gmail.com
 * 
 */
router.get("/:userId", userController.getUserById);


/**
 * @swagger
 * /users/register:
 *    post:
 *      tags:
 *        - Users
 *      description: Create users API
 *      summary: Create users data
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: enter your username
 *                  example: test123
 *                first_name:
 *                  type: string
 *                  description: enter your first name
 *                  example: John
 *                last_name:
 *                  type: string
 *                  description: enter your last name
 *                  example: Smith                
 *                email:
 *                  type: string
 *                  description: enter your email
 *                  example: andi@gmail.com
 *                password:
 *                  type: string
 *                  description: enter your password
 *                  example: adminpassword12 
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data! 
 *                
 */

router.post("/register", userController.createUser);


/**
 * @swagger
 * /users/{userId}:
 *    put:
 *      tags:
 *        - Users
 *      summary: Update users data
 *      description: update users data API
 *      parameters:
 *        - name: userId
 *          in: path
 *          required: true
 *          description: Users id
 *          schema:
 *            type: integer
 *            format: int64
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: enter your username
 *                  example: test123
 *                first_name:
 *                  type: string
 *                  description: enter your first name
 *                  example: John
 *                last_name:
 *                  type: string
 *                  description: enter your last name
 *                  example: Smith
 *                email:
 *                  type: string
 *                  description: enter your email
 *                  example: test@test.com
 *                password:
 *                  type: string
 *                  description: enter your password
 *                  example: adminpassword12
 *      responses:
 *        200:
 *          description: Successfully updated data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully updated data! 
 * 
 *      
 */
router.put("/:userId", userController.updateUser);



/**
 * @swagger
 * /users/{userId}:
 *    delete:
 *      tags:
 *        - Users
 *      summary: Remove Users data by id
 *      description: Remove users API  
 *      parameters:
 *        - name: userId
 *          in: path
 *          required: true
 *          description: Users id
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        200:
 *          description: Successfully deleted data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully removed user!     
 * 
 * 
 */
router.delete("/:userId", userController.deleteUser);

module.exports = router;
