import * as express from "express";
import RBooks from "./RBooks";
import RMembers from "./RMembers";
import RBorrowedBooks from "./RBorrowedBooks";

const router = express.Router();

router.use(RBooks)
router.use(RMembers)
router.use(RBorrowedBooks)

export default router