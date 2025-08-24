import { Book } from "../model/Book";

export interface DeleteBookResponse {
    message: string;
    deletedItem: Book;
}