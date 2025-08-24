import { Book } from "./Book";

export interface BorrowRecord {
    id: string;
    bookId: string;
    borrowerName: string;
    borrowerAge: number;
    borrowedAt: string;
    estimatedReturnAt: string;
    returnedAt: string | null;
    createdAt: string;
    updatedAt: string;
    Book: Book;
}