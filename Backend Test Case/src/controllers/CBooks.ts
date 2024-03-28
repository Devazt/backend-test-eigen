import { Request, Response } from "express";
import SBooks from "../services/SBooks";

export default new class CBooks {
    create(req: Request, res: Response) {
        return SBooks.create(req, res);
    }

    findAll(req: Request, res: Response) {
        return SBooks.findAll(req, res);
    }

    findOne(req: Request, res: Response) {
        return SBooks.findOne(req, res);
    }

    update(req: Request, res: Response) {
        return SBooks.update(req, res);
    }

    delete(req: Request, res: Response) {
        return SBooks.delete(req, res);
    }

    findBook(req: Request, res: Response) {
        return SBooks.findBook(req, res);
    }
}