import * as express from "express";
import CBooks from "../controllers/CBooks";

const RBooks = express.Router();

/**
 * @openapi
 * /api/v1/book:
 *   post:
 *     tags:
 *       - Book
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           examples:
 *             example1:
 *               summary: Add Harry Potter Book
 *               value:
 *                 code: "JK-45"
 *                 title: "Harry Potter"
 *                 author: "J.K Rowling"
 *                 stock: 1
 *             example2:
 *               summary: Add A Study in Scarlet
 *               value:
 *                 code: "SHR-1"
 *                 title: "A Study in Scarlet"
 *                 author: "Arthur Conan Doyle"
 *                 stock: 1
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *              example:
 *                  message: success
 *                  data:
 *                    code: "JK-45"
 *                    title: "Harry Potter"
 *                    author: "J.K Rowling"
 *                    stock: 1
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *              examples:
 *                  example1:
 *                      summary: Code Required
 *                      value:
 *                          "\"code\" is not allowed to be empty"
 *                  example2:
 *                      summary: Title Required
 *                      value:
 *                          "\"title\" is not allowed to be empty"
 *                  example3:
 *                      summary: Author Required
 *                      value:
 *                          "\"author\" is not allowed to be empty"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *              example:
 *                  message: something went wrong
 *                  error: duplicate key value violates unique constraint
 */
RBooks.post("/book", CBooks.create);

/**
 * @openapi
 * /api/v1/book:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get all books in stock
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *               example:
 *                 message: "success"
 *                 data:
 *                 - id: 1
 *                   code: "JK-45"
 *                   title: "Harry Potter"
 *                   author: "J.K Rowling"
 *                   stock: 1
 *                 - id: 2
 *                   code: "SHR-1"
 *                   title: "A Study in Scarlet"
 *                   author: "Arthur Conan Doyle"
 *                   stock: 1
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *               example:
 *                       summary: Bad request
 *                       value:
 *                           message: "Bad request"
 */
RBooks.get("/book", CBooks.findAll);

/**
 * @openapi
 * /api/v1/book/{id}:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     examples:
 *       - value: 1
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *              example:
 *                  message: "success"
 *                  data:
 *                    id: 1
 *                    code: "JK-45"
 *                    title: "Harry Potter"
 *                    author: "J.K Rowling"
 *                    stock: 1
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *              example:
 *                  message: "Book with ID {id} not found"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *                   example:
 *                       summary: Bad request
 *                       value:
 *                           message: "Bad request"
 */
RBooks.get("/book/:id", CBooks.findOne);

/**
 * @openapi
 * /api/v1/book/{id}:
 *   patch:
 *     tags:
 *       - Book
 *     summary: Update a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          example:
 *            code: "JK-45"
 *            title: "Harry Potter"
 *            author: "J.K Rowling"
 *            stock: 1
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *              example:
 *                  message: "success"
 *                  data:
 *                    id: 1
 *                    code: "JK-45"
 *                    title: "Harry Potter"
 *                    author: "J.K Rowling"
 *                    stock: 1
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *              example:
 *                  message: "Book with ID {id} not found"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *                   examples:
 *                       example1:
 *                           summary: Code Required
 *                           value:
 *                               "\"code\" is not allowed to be empty"
 *                       example2:
 *                           summary: Title Required
 *                           value:
 *                               "\"title\" is not allowed to be empty"
 *                       example3:
 *                           summary: Author Required
 *                           value:
 *                               "\"author\" is not allowed to be empty"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *              example:
 *                  message: something went wrong
 *                  error: duplicate key value violates unique constraint
 */
RBooks.patch("/book/:id", CBooks.update);

/**
 * @openapi
 * /api/v1/book/{id}:
 *   delete:
 *     tags:
 *       - Book
 *     summary: Delete a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *              example:
 *                  message: "success"
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *              example:
 *                  message: "Book with ID {id} not found"
 */
RBooks.delete("/book/:id", CBooks.delete);

/**
 * @openapi
 * /api/v1/book/code/{code}:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get a book by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *              example:
 *                  message: "success"
 *                  data:
 *                    id: 1
 *                    code: "JK-45"
 *                    title: "Harry Potter"
 *                    author: "J.K Rowling"
 *                    stock: 1
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *              example:
 *                  message: "Book with code {code} not found"
 */
RBooks.get("/book/code/:code", CBooks.findBook);

export default RBooks;
