import { Request, Response } from "express";
import SMembers from "../services/SMembers";

export default new class CMembers {
    create(req: Request, res: Response) {
        return SMembers.create(req, res);
    }

    findAll(req: Request, res: Response) {
        return SMembers.findAll(req, res);
    }

    findOne(req: Request, res: Response) {
        return SMembers.findOne(req, res);
    }

    update(req: Request, res: Response) {
        return SMembers.update(req, res);
    }

    delete(req: Request, res: Response) {
        return SMembers.delete(req, res);
    }
}