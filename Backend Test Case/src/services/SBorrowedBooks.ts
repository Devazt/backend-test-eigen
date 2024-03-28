import { IsNull, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { BorrowedBook } from "../entity/borrowed-book";
import { Book } from "../entity/book";
import { Member } from "../entity/member";

export default new class SBorrowBooks {
    private readonly RepoBorrowBook: Repository<BorrowedBook> = AppDataSource.getRepository(BorrowedBook);
    private readonly RepoBook: Repository<Book> = AppDataSource.getRepository(Book);
    private readonly RepoMember: Repository<Member> = AppDataSource.getRepository(Member);
    
    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const member = await this.RepoMember.findOne({
                where: { id: id },
                relations: {
                    borrowedBooks: {
                        book: true
                    }
                }
            });
            if (!member) return res.status(404).json({ message: `Member with ID ${id} not found` });

            if (member.borrowedBooks.length === 0) {
                return res.status(200).json({ message: "Member has no borrowings" });
            }
            const books = member.borrowedBooks.map((borrowed) => {
                console.log(borrowed)
                if (borrowed.book) {
                    return {
                        code: borrowed.book.code,
                        title: borrowed.book.title,
                        author: borrowed.book.author,
                        stock: borrowed.book.stock
                    }
                }
            })

            return res.status(201).json({ message: "success", books: books });

        } catch ( error ) {
            return res.status(500).json({ message: "something went wrong", error: error.message });
        }
    }

    async borrow(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const code = req.body.code

            const member = await this.RepoMember.findOne({
                where: { id: id },
                relations: { borrowedBooks: true }
            });

            const book = await this.RepoBook.findOne({
                where: { code: code },
                relations: { borrowedBooks: true }
            });

            // check book stock
            if ( book.stock <= 0) {
                return res.status(404).json({ message: "Book is not available at the moment" });
            };

            // check member is penalized
            if (member.penalized_at) {
                const endPenalty = new Date(
                    member.penalized_at.getTime() + 3 * 24 * 60 * 60 * 1000
                );

                if ( endPenalty.getTime() > member.penalized_at.getTime()) {
                    return res.status(400).json({ message: "Member is penalized for 3 days" });
                };
                member.penalized_at = null;
                await this.RepoMember.save(member);
            };

            if (member.borrowedBooks.length >= 2) {
                return res.status(400).json({ message: "Member may not borrow more than 2 books" });
            }
            
            if (member.borrowedBooks.some(
                (borrowedBook) => borrowedBook.book && borrowedBook.book.code === book.code
            )) {
                return res.status(400).json({ message: "Member is already borrowing this book" });
            };

            const borrowedBook = new BorrowedBook();
            borrowedBook.member = member;
            borrowedBook.book = book;

            const result = await this.RepoBorrowBook.save(borrowedBook);
            console.log(member.borrowedBooks);
            console.log(book);
            member.borrowedBooks.push(result);
            book.borrowedBooks.push(result);
            book.stock -= 1;

            await this.RepoMember.save(member)
            await this.RepoBook.save(book)

            return res.status(200).json({
                message: "success",
                book: {
                    code: book.code,
                    title: book.title,
                    author: book.author,
                }
            });

        } catch ( error ) {
            return res.status(500).json({ message: "something went wrong", error: error.message });
        }
    }

    async return(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id)
            const code = req.body.code

            const memberCheck = await this.RepoMember.findOne({
                where: { id: id },
                relations: { borrowedBooks: true }
            });
            if (!memberCheck) {
                return res.status(404).json({ message: "Member not found" });
            }

            const bookCheck = await this.RepoBook.findOne({
                where: { code: code },
                relations: { borrowedBooks: true }
            });
            if (!bookCheck) {
                return res.status(404).json({ message: "Book not found" });
            }

            const borrowedBook = await this.RepoBorrowBook.findOne({
                where: {
                    return_date: IsNull(),
                    book: { code: code }
                },
                relations : {
                    member: {
                        borrowedBooks: true,
                    },
                    book: {
                        borrowedBooks: true,
                    }
                }
            });

            if(borrowedBook.member.id !== id) {
                return res.status(400).json({ message: "The returned book is not a book that the member has borrowed"})
            };

            const member = borrowedBook.member;
            const book = borrowedBook.book;

            const returnDate = new Date();
            const dueDate = borrowedBook.borrow_date;
            const daysLate = Math.floor(
                (returnDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            if ( daysLate >= 7 ) {
                member.penalized_at = new Date();
                await this.RepoMember.save(member);
            }

            // set return date
            borrowedBook.return_date = returnDate;
            book.stock += 1;

            // remove from member
            const memberIndex = member.borrowedBooks.findIndex(
                (memberBorrow) => memberBorrow.id === borrowedBook.id
            );
            if (memberIndex !== -1) {
                member.borrowedBooks.splice(memberIndex, 1);
                await this.RepoMember.save(member);
            }

            // remove from book
            const bookIndex = book.borrowedBooks.findIndex(
                (bookBorrow) => bookBorrow.id === borrowedBook.id
            );
            if(bookIndex !== -1) {
                book.borrowedBooks.splice(bookIndex, 1);
                await this.RepoBook.save(book);
            }

            await this.RepoBorrowBook.save(borrowedBook);
            return res.status(200).json({
                message: "Success",
                book: {
                    code: book.code,
                    title: book.title,
                    author: book.author,
                }
            });

        } catch ( error ) {
            return res.status(500).json({ message: "something went wrong", error: error.message });
        }
    }
}