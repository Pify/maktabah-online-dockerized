import { Book } from "../model/Book";

export interface FetchBookResponse {
    data: Book[];
    meta: {
        totalItems: number;
        totalPages: number;
    }
}