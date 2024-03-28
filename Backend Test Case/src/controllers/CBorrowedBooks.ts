import { Request, Response } from "express";
import SBorrowedBooks from "../services/SBorrowedBooks";

export default new class CBorrowedBooks {
    findOne(req: Request, res: Response) {
        return SBorrowedBooks.findOne(req, res);
    }

    borrow(req: Request, res: Response) {
        return SBorrowedBooks.borrow(req, res);
    }

    return(req: Request, res: Response) {
        return SBorrowedBooks.return(req, res);
    }
}