import * as express from "express";
import CMembers from "../controllers/CMembers";

const RMembers = express.Router();
/**
 * @openapi
 * /api/v1/member:
 *   post:
 *      tags:
 *         - Member
 *      summary: Add new Member with auto generate member code
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Angga"
 *                      required:
 *                          - name
 *                  examples:
 *                      example1:
 *                          summary: Add Member 1
 *                          value:
 *                              name: "Angga"
 *                      example2:
 *                          summary: Add Member 2
 *                          value:
 *                              name: "Ferry"
 *      responses:
 *          201:
 *              description: Success
 *              content:
 *                  application/json:
 *                      example:
 *                          message: success
 *                          data:
 *                              id: 1
 *                              code: "M001"
 *                              name: "Angga"
 *                              penalized_at: null
 *          400:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      example:
 *                            "\"name\" is not allowed to be empty"
 */
RMembers.post("/member", CMembers.create);

/**
 * @openapi
 * /api/v1/member:
 *   get:
 *     tags:
 *       - Member
 *     summary: Get all member with list of borrowed book and borrow count
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *               example:
 *                 message: "success"
 *                 data:
 *                 - id: 1
 *                   code: "M001"
 *                   name: "Angga"
 *                   penalized_at: null
 *                   borrowedBooks:
 *                      - id: 1
 *                        code: "JK-45"
 *                        title: "Harry Potter"
 *                        author: "J.K Rowling"
 *                        stock: 1
 *                      - id: 2
 *                        code: "SHR-1"
 *                        title: "A Study in Scarlet"
 *                        author: "Arthur Conan Doyle"
 *                        stock: 1
 *                   borrowedCount: 2
 *                 - id: 2
 *                   code: "M002"
 *                   name: "Ferry"
 *                   penalized_at: null
 *                   borrowedBooks: []
 *                   borrowedCount: 0
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *               examples:
 *                   example1:
 *                       summary: Bad request
 *                       value:
 *                           message: "Bad request"
 */
RMembers.get("/member", CMembers.findAll);

/**
 * @openapi
 * /api/v1/member/{id}:
 *   get:
 *     tags:
 *       - Member
 *     summary: Get a member by ID with borrowed book
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the member
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *               example:
 *                 message: "success"
 *                 data:
 *                   id: 1
 *                   code: "M001"
 *                   name: "Angga"
 *                   penalized_at: null
 *                   borrowedBooks: []
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *               examples:
 *                   example1:
 *                       summary: Bad request
 *                       value:
 *                           message: "Bad request"
 */
RMembers.get("/member/:id", CMembers.findOne);

/**
 * @openapi
 * /api/v1/member/{id}:
 *   patch:
 *     tags:
 *       - Member
 *     summary: Update a member
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: "Ferry"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: "success"
 *               data:
 *                 id: 1
 *                 code: "M001"
 *                 name: "Ferry"
 *                 penalized_at: null
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Member with ID ${id} not found"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *                 example1:
 *                     summary: Bad request
 *                     value:
 *                         "\"name\" is not allowed to be empty"
 */
RMembers.patch("/member/:id", CMembers.update);

/**
 * @openapi
 * /api/v1/member/{id}:
 *   delete:
 *     tags:
 *       - Member
 *     summary: Delete a member
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the member
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: "success"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Member with ID ${id} not found"
 */
RMembers.delete("/member/:id", CMembers.delete);

export default RMembers;
