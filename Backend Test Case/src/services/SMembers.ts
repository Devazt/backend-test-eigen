import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Member } from "../entity/member";
import { CreateMemberSchema, UpdateMemberSchema } from "../utils/VMember";

export default new class SMembers {
    private readonly RepoMember: Repository<Member> = AppDataSource.getRepository(Member);

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            
            const { error } = CreateMemberSchema.validate(data);
            if (error) return res.status(400).json(error.message);

            // Get the latest member
            const latestMember = await this.RepoMember.createQueryBuilder("member")
                .orderBy("member.id", "DESC")
                .getOne();

            const latestNumber = latestMember ? parseInt(latestMember.code.slice(1)) : 0;

            // Generate the new member code
            const generate = (latestNumber + 1).toString().padStart(3, '0');
            const newCode = `M${generate}`;
            const member = this.RepoMember.create({

                ...data,
                code: newCode
            });

            const result = await this.RepoMember.save(member);
            return res.status(201).json({ message: "Success", data: result });

        } catch ( error ) {
            return res.status(500).json({ message: "something went wrong", error: error.message });
        }
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const members = await this.RepoMember
                .createQueryBuilder("member")
                .leftJoinAndSelect("member.borrowedBooks", "borrowedBooks")
                .leftJoinAndSelect("borrowedBooks.book", "book")
                .loadRelationCountAndMap("member.borrowedCount", "member.borrowedBooks")
                .getMany();

            return res.status(200).json({ message: "Success", data: members });
        } catch ( error ) {
            return res.status(500).json({ message: "something went wrong", error: error.message });
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            const member = await this.RepoMember.findOne({
                where: { id: id},
                relations: {
                    borrowedBooks: {
                        book: true,
                        member: true
                    }
                }
            });

            if (!member) return res.status(404).json({ message: `Member with ID ${id} not found` });

            return res.status(200).json({ message: "Success", data: member });
        } catch ( error ) {
            return res.status(500).json({ message: "something went wrong", error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const member = await this.RepoMember.findOneBy({ id: id });
            if (!member) return res.status(404).json({ message: `Member with ID ${id} not found` });

            const data = req.body;
            const { error } = UpdateMemberSchema.validate(data);
            if (error) return res.status(400).json(error.message);

            await this.RepoMember.update({ id: id}, {
                ...data,
            });

            const updatedMember = await this.RepoMember.findOneBy({ id: id });
            return res.status(200).json({ message: "Success", data: updatedMember });

        } catch ( error ) {
            return res.status(500).json({ message: "something went wrong", error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            const member = await this.RepoMember.findOneBy({ id: id });
            if (!member) return res.status(404).json({ message: `Member with ID ${id} not found` });

            await this.RepoMember.delete({ id: id });
            return res.status(200).json({ message: "Success" });
        } catch ( error ) {
            return res.status(500).json({ message: "Something went wrong", error: error.message });
        }
    }
}