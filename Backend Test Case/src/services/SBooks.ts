import { MoreThan, Repository } from "typeorm";
import { Book } from "../entity/book";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CreateBookSchema, UpdateBookSchema } from "../utils/VBooks";

export default new class SBooks {
    private readonly RepoBooks: Repository<Book> = AppDataSource.getRepository(Book);

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body

            const { error } = CreateBookSchema.validate(data);
            if (error) return res.status(400).json(error.message);

            const book = this.RepoBooks.create({
                ...data,
            });

            const result = await this.RepoBooks.save(book);
            return res.status(201).json({ message: "Success", data: result });

        } catch (error) {
            return res.status(500).json({ message: "something went wrong", error: error.message });
        }
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const books = await this.RepoBooks.find({where: { stock: MoreThan(0)}});
            return res.status(200).json({ message: "Success", data: books });

        } catch (error) {
            return res.status(500).json({ message: "something went wrong", error: error.message });
        }
    }
    
    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const book = await this.RepoBooks.findOneBy({id: id});
            if (!book) return res.status(404).json({ message: `Book with ID ${id} not found` });
            return res.status(200).json({ message: "Success", data: book });

        } catch (error) {
            return res.status(500).json({ message: "something went wrong", error: error.message });
        }
    }
    
    async update(req:Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            
            const book = await this.RepoBooks.findOneBy({id: id});
            if (!book) return res.status(404).json({ message: `Book with ID ${id} not found` });
            
            const data = req.body;
            const { error } = UpdateBookSchema.validate(data);
            if (error) return res.status(400).json(error.message);

            await this.RepoBooks.update({ id: id }, {
                ...data,
            });

            const updatedBook = await this.RepoBooks.findOneBy({id: id});
            return res.status(200).json({ message: "Success", data: updatedBook });

        } catch (error) {
            return res.status(500).json({ message: "Something went wrong", error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (!id) return res.status(404).json({ message: `ID ${id} not found` });

            await this.RepoBooks.delete({ id: id });
            return res.status(200).json({ message: "Success" });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong", error: error.message });
        }
    }

    async findBook(req: Request, res: Response): Promise<Response> {
        try {
            const code = req.params.code;
            const book = await this.RepoBooks.findOne({
                where: {code: code}
            });

            if (!book) return res.status(404).json({ message: `Book with code ${code} not found` });
            return res.status(200).json({ message: "Success", data: book });
        } catch ( error ) {
            return res.status(500).json({ message: "something went wrong", error: error.message });
        }
    }
}