import * as express from "express";
import CBorrowedBooks from "../controllers/CBorrowedBooks";

const RBorrowedBooks = express.Router();

/**
 * @openapi
 * /api/v1/borrow/{id}:
 *   get:
 *     tags:
 *       - Borrow and Return
 *     summary: Find borrowed book by member ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the member
 *         required: true
 *     responses:
 *        200:
 *         description: Success
 *         content:
 *           application/json:
 *               examples:
 *                 example1:
 *                  summary: Member has no borrowings
 *                  value:
 *                      message: "Member has no borrowings"
 *                 example2:
 *                  summary: Member has borrowings
 *                  value:
 *                      message: "success"
 *                      books:
 *                       - code: "JK-45"
 *                         title: "Harry Potter"
 *                         author: "J.K Rowling"
 *                         stock: 0
 *                       - code: "SHR-1"
 *                         title: "A Study in Scarlet"
 *                         author: "Arthur Conan Doyle"
 *                         stock: 0
 *        404:
 *          description: Member not found
 *          content:
 *              application/json:
 *                      example:
 *                        message: "Member not found"
 *
 */
RBorrowedBooks.get("/borrow/:id", CBorrowedBooks.findOne);

/**
 * @openapi
 * /api/v1/borrow/{id}:
 *   post:
 *     tags:
 *       - Borrow and Return
 *     summary: Borrow a book
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           examples:
 *             example1:
 *              summary: Borrow Harry Potter Book
 *              value:
 *                code: "JK-45"
 *
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            example:
 *                message: "success"
 *                book:
 *                  code: "JK-45"
 *                  title: "Harry Potter"
 *                  author: "J.K Rowling"
 *      404:
 *        description: Book not found
 *        content:
 *          application/json:
 *            example:
 *                message: "Book is not available at the moment"
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *                message: "Bad request"
 */
RBorrowedBooks.post("/borrow/:id", CBorrowedBooks.borrow);

/**
 * @openapi
 * /api/v1/return/{id}:
 *   put:
 *     tags:
 *       - Borrow and Return
 *     summary: Return a book
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           examples:
 *             example1:
 *              summary: Return Harry Potter Book
 *              value:
 *                code: "JK-45"
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            example:
 *                message: "success"
 *                book:
 *                  code: "JK-45"
 *                  title: "Harry Potter"
 *                  author: "J.K Rowling"
 *      404:
 *        description: Book not found
 *        content:
 *          application/json:
 *            example:
 *                message: "Book not found"
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *                message: "The returned book is not a book that the member has borrowed"
 */
RBorrowedBooks.put("/return/:id", CBorrowedBooks.return);

export default RBorrowedBooks;
